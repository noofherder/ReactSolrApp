import React, { Component, PropTypes } from 'react';
import { makeSetFilterAction, makeClearFiltersAction } from "../actions";

const COLLAPSED_LENGTH = 5;

/*
 * A component implementing a simple facet list.
 *
 * props should be like:
 *    onSetFilter: callback function for setting a filter,
 *    multiselect: true|false (defaults to false),
 *    facets: [ { label, filter, selected }, ...],
 *    fieldname: the Solr fieldname for this facet,
 *    handleActions: handle one or more actions
 */

class FacetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true   // hide more than COLLAPSED_LENGTH?
    }
  }

  render() {
    if (this.props.facets == undefined ||
        this.props.facets.length == 0)
    {
      // no facets, so return an empty list
      return <ul className="app_ul"></ul>;
    }

    const multiselect = this.props.multiselect;
    const collapsible = this.props.facets.length > COLLAPSED_LENGTH;
    let facitems = null;

    // collapse long facet list by default
    const facets = (collapsible && this.state.collapsed) ?
      this.props.facets.slice(0, COLLAPSED_LENGTH) : this.props.facets;

    /*
     * the <li> elements are different depending on whether we have multiselect
     * facets. If so, we use checkboxes to make this obvious. Otherwise, we
     * use links.
     */

    if (multiselect) {
      facitems = facets.map((x) => {
        const key = "facet_" + x.filter;
        const handler = (event) => {
          event.preventDefault();
          this.setFilter(event.target.value, event.target.checked);
        };
        return <li key={key}>
          <input id={key} type="checkbox" onChange={handler}
           value={x.filter} checked={x.selected}/>{" "}
          <label for={key}>{x.label} ({x.count})</label>
        </li>;
      });
    } else {
      facitems = facets.map((x) => {
        const key = "facet_" + x.filter;
        if (x.selected) {
          return <li key={key}><label className="app_bold">
            {x.label + " (" + x.count + ")"}</label>
          </li>;
        } else {
          const handler = (event) => {
            event.preventDefault();
            this.setFilter(x.filter, true);
          };
          return <li key={key}>
            <a href="#" onClick={handler}><label>{x.label}</label></a>
            { " (" + x.count + ")"}
          </li>;
        }
      });
    }

    /*
     * display a collapse toggle?
     */
    const collapseLink = collapsible ?
      <li><a href="#" onClick={this.toggleShowAll.bind(this)}>
        <em>{this.state.collapsed ? "show more" : "show fewer"}</em>
        </a></li> : "";

    /*
     * the "any" link should only be active when a facet is selected
     */
    const any = facets.find(x => x.selected) === undefined ?
      <em>any</em> :
      <a href="#" onClick={this.unsetAll.bind(this)}><em>any</em></a>;

    return <ul className="app_ul">
      {facitems}
      {collapseLink}
      <li>{any}</li>
    </ul>;
  }

  // set/unset a single filter
  setFilter(filter, apply) {
    if (apply && ! this.props.multiselect) {
      this.props.handleActions([
        makeClearFiltersAction(this.props.fieldname),
        makeSetFilterAction(filter, apply)
      ]);
    } else {
      this.props.handleActions([
        makeSetFilterAction(filter, apply)
      ]);
    }
  }

  // unset all selected filters
  unsetAll(event) {
    event.preventDefault();
    this.props.handleActions([makeClearFiltersAction(this.props.fieldname)]);
  }

  toggleShowAll(event) {
    event.preventDefault();
    this.setState({ collapsed: !this.state.collapsed });
  }
}

FacetList.propTypes = {
  multiselect: PropTypes.bool,
  facets: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    filter: PropTypes.string,
    selected: PropTypes.bool
  })),
  fieldname: PropTypes.string,
  handleActions: PropTypes.func
};

export default FacetList;
