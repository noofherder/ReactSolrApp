import capitalize from 'capitalize';

/*
 * conf should have the properties:
 *    solrSearchUrl:  (e.g. http://localhost:8983/solr/techproducts/select)
 *    displayFields:  (e.g. ["id", "name", "text"])
 *    pageSize:       number of results per page
 *    facetFields:    config for field facets
 *    facetQueries:   config for query facets
 *    facetLimit:     max number of items to return for each facet
 */

export function makeSearchService(conf) {
  return (queryParams, setSearchResults) => {
    // convert queryParams into Solr params
    let solrParams = {
      offset: conf.pageSize * (queryParams.page || 0),
      limit: conf.pageSize,
      query: queryParams.query,
      filter: [],
      fields: conf.displayFields,
      facet: {}
    };

    // collect filters on same field into OR filters
    if (queryParams.filters) {
      let filterFields = {};
      queryParams.filters.forEach((filter) => {
        const field = getFieldnameFromFilter(filter);
        if (field) {
          if (filterFields[field] === undefined) {
            filterFields[field] = [];
          }
          filterFields[field].push(filter);
        }
      });

      // tag each filter with the fieldname so we can exclude it from the
      // corresponding facet count
      for (let key in filterFields) {
        solrParams.filter.push("{!tag=" + key.toUpperCase() + "}" +
          filterFields[key].join(" OR "));
      }
    }

    // add faceting parameters
    if (conf.facetFields) {
      for (let key in conf.facetFields) {
        const field = conf.facetFields[key];
        solrParams.facet[key] = {
          type: "terms",
          field: field,
          limit: conf.facetLimit,
          domain: { excludeTags: field.toUpperCase() }
        };
      }
    }

    // and for query facets
    if (conf.facetQueries) {
      for (let key in conf.facetQueries) {
        for (let key2 in conf.facetQueries[key]) {
          const filter = conf.facetQueries[key][key2];
          const field = getFieldnameFromFilter(filter);
          if (field) {
            solrParams.facet[key + ":" + key2] = {
              type: "query",
              q: filter,
              domain: { excludeTags: field.toUpperCase() }
            }
          }
        }
      }
    }

    const reqBody = JSON.stringify(solrParams);

    // do the search. 'post' is required with a fetch() body. Solr doesn't mind
    fetch(conf.solrSearchUrl, {
      method: 'post',
      body: reqBody,
      headers: new Headers({
      		'Content-Type': 'application/json'
        })
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "not ok";
      }
    })
    .then((response) => {
      const searchResults = makeSearchResults(
        response, queryParams.filters, conf);

      setSearchResults(searchResults);
    })
    .catch((error) => {
      alert("ERROR: " + error);   // FIXME very unfriendly
      throw error;    // for stacktrace in console
    });
  }
}

function makeSearchResults(r, setFilters, conf) {
  const facets = {};

  // collect field facets
  if (r.facets) {
    if (conf.facetFields) {
      for (let key in conf.facetFields) {
        if (r.facets[key] && r.facets[key].buckets) {
          facets[key] = r.facets[key].buckets.map(x => {
            const filter = conf.facetFields[key] + ":\"" + x.val + "\"";
            return {
              label: capitalize(x.val),
              count: x.count,
              filter: filter,
              selected: setFilters.includes(filter)
            }
          });
        }
      }
    }

    // collect query facets
    if (conf.facetQueries) {
      for (let key in conf.facetQueries) {
        const theseFacets = [];
        for (let key2 in conf.facetQueries[key]) {
          if (r.facets[key + ":" + key2]) {
            const filter = conf.facetQueries[key][key2];
            theseFacets.push({
              label: key2,
              count: r.facets[key + ":" + key2].count,
              filter: filter,
              selected: setFilters.includes(filter)
            });
          }
        }
        facets[key] = theseFacets;
      }
    }
  }

  return {
    queryTime: r.responseHeader.QTime,
    totalFound: r.response.numFound,
    start: r.response.start,
    results: r.response.docs,
    facets: facets,
    pageSize: conf.pageSize
  };
}

export function getFieldnameFromFilter(filter) {
  const i = filter.indexOf(":");
  if (i == -1) return undefined;
  return filter.slice(0, i);
}
