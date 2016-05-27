
import { PAGE_SIZE } from '../conf/constants';

/*
 * conf should have the properties:
 *    solrSearchUrl   (e.g. http://localhost:8983/solr/techproducts/select)
 *    displayFields   (e.g. ["id", "name", "text"])
 */

export function makeSearchService(conf) {
  const fetchInit = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache'
  };

  return (queryParams, setSearchResults) => {
    // convert queryParams into Solr params
    let solrParams = {
      wt: 'json',
      rows: PAGE_SIZE,
      q: queryParams.query,
      fq: [],
      fl: conf.displayFields
    };

    // collect filters on same field into OR fqs
    if (queryParams.filters) {
      let filterFields = {};
      queryParams.filters.forEach((filter) => {
        const bits = filter.split(':');
        if (bits.length > 1) {
          const field = bits[0];
          if (filterFields[field] === undefined) {
            filterFields[field] = [];
          }
          filterFields[field].push(filter);
        }
      });

      for (let key in filterFields) {
        solrParams.fq.push(filterFields[key].join(" OR "));
      }
    }

    console.log(solrParams);
    console.log(makeQueryString(solrParams));

    const url = conf.solrSearchUrl + "?" + makeQueryString(solrParams);
    fetch(url, fetchInit)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "not ok";
      }
    })
    .then((response) => {
      console.log('response =');
      console.log(response);
      const searchResults = makeSearchResults(response);
      console.log('searchResults =');
      console.log(searchResults);

      setSearchResults(searchResults);
    });
//    .catch((error) => {
//      alert("ERROR: " + error);
//    });
  };
}

function makeQueryString(query) {
  return Object.keys(query)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(query[key]))
    .join("&")
    .replace(/%20/g, "+");
}

function makeSearchResults(r) {
  return {
    queryTime: r.responseHeader.QTime,
    totalFound: r.response.numFound,
    start: r.response.start,
    results: r.response.docs,
    facets: {}
  }
}
