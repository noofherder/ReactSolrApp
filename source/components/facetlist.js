import React, { PropTypes } from 'react';

/*
 * props should be like: {
 *    multiselect = true|false (defaults to false)
 *    facets = [
 *        { label, filter, selected }
 *    ]
 *
 * filter should be unique for each facet
 */

const FacetList = (props) => {
  let facets = null;
  /*
   * the <li> elements are different depending on whether we have multiselect
   * facets. If so, we use checkboxes to make this obvious. Otherwise, we
   * use links.
   */
  if (props.multiselect) {
    facets = props.facets.map((x) => {
      const key = "facet_" + x.filter;
      return <li key={key}>
        <input id={key} type="checkbox" value={x.filter} checked={x.selected}/>
        {" "}
        <label for={key}>{x.label}</label>
      </li>;
    });
  } else {
    facets = props.facets.map((x) => {
      const key = "facet_" + x.filter;
      return <li key={key}>
        <a href="#"><label>{x.label}</label></a>
      </li>;
    });
  }

  /*
   * the "any" link should only be active when a facet is selected
   */
  const any = props.facets.find(x => x.selected) === undefined ?
    <em>any</em> :
    <a href="#"><em>any</em></a>;

  return <ul className="app_ul">
    {facets}
    <li>{any}</li>
  </ul>;
};

FacetList.propTypes = {
  multiselect: PropTypes.bool,
  facets: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    filter: PropTypes.string,
    selected: PropTypes.bool
  }))
};

export default FacetList;
