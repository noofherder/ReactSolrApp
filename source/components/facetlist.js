import React, { Component, PropTypes } from 'react';

/*
 * A component implementing a simple facet list.
 *
 * props should be like:
 *    onSetFilter = callback function for setting a filter
 *    multiselect = true|false (defaults to false)
 *    facets = [
 *        { label, filter, selected }
 *    ]
 *
 * filter should be unique for each facet
 */

class FacetList extends Component {
  render() {
    const facets = this.props.facets;
    const multiselect = this.props.multiselect;
    let facitems = null;
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
          <label for={key}>{x.label}</label>
        </li>;
      });
    } else {
      facitems = facets.map((x) => {
        const key = "facet_" + x.filter;
        if (x.selected) {
          return <li key={key}><label className="app_bold">{x.label}</label></li>;
        } else {
          const handler = (event) => {
            event.preventDefault();
            this.setFilter(x.filter, true);
          };
          return <li key={key}>
            <a href="#" onClick={handler}><label>{x.label}</label></a>
          </li>;
        }
      });
    }

    /*
     * the "any" link should only be active when a facet is selected
     */
    const any = facets.find(x => x.selected) === undefined ?
      <em>any</em> :
      <a href="#"><em>any</em></a>;

    return <ul className="app_ul">
      {facitems}
      <li>{any}</li>
    </ul>;
  }

  setFilter(filter, apply) {
    if (this.props.onSetFilter) {
      this.props.onSetFilter(filter, apply);
    }
  }
}

FacetList.propTypes = {
  multiselect: PropTypes.bool,
  facets: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    filter: PropTypes.string,
    selected: PropTypes.bool
  })),
  onSetFilter: PropTypes.func
};

export default FacetList;
