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
  if (props.multiselect) {
    facets = props.facets.map((x) => {
      const key = "facet_" + x.filter;
      return <li key={key}>
        <input id={key} type="checkbox" value={x.filter} defaultChecked={x.selected}/>
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
