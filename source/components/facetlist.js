import React, { PropTypes } from 'react';

/*
 * A component implementing a simple facet list.
 *
 * props should be like:
 *    multiselect = true|false (defaults to false)
 *    facets = [
 *        { label, filter, selected }
 *    ]
 *
 * filter should be unique for each facet
 */

const FacetList = ({facets=[], multiselect=false}) => {
  let facitems = null;
  /*
   * the <li> elements are different depending on whether we have multiselect
   * facets. If so, we use checkboxes to make this obvious. Otherwise, we
   * use links.
   */
  if (multiselect) {
    facitems = facets.map((x) => {
      const key = "facet_" + x.filter;
      return <li key={key}>
        <input id={key} type="checkbox" value={x.filter} checked={x.selected}/>
        {" "}
        <label for={key}>{x.label}</label>
      </li>;
    });
  } else {
    facitems = facets.map((x) => {
      const key = "facet_" + x.filter;
      if (x.selected) {
        return <li key={key}><label className="app_bold">{x.label}</label></li>;
      } else {
        return <li key={key}>
          <a href="#"><label>{x.label}</label></a>
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
