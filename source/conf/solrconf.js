const solrConf = {
  solrSearchUrl: "http://localhost:8983/solr/techproducts/select?wt=json",
  displayFields: ["id", "name", "features", "price", "inStock"],
  facetFields: {
    "manufacturer": "manu_id_s",
    "category": "cat"
  },
  facetQueries: {
    "price_range": {
      "0-100": "price:[0 TO 100]",
      "101-200": "price:[101 TO 200]",
      "201-500": "price:[201 TO 500]",
      "501-1000": "price:[501 TO 1000]",
      "1000-any": "price:[1000 TO *]"
    }
  },
  pageSize: 10,
  facetLimit: 30
};

export default solrConf;
