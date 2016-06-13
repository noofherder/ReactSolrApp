# ReactSolrApp
An example single-page search app using React and Solr.

This is my first attempt at writing an app in React.js. It implements a simple faceted search over the _techproducts_ example index in Solr 6.

To run the app:

1. [Download](http://lucene.apache.org/solr/downloads.html) and install Solr 6.
2. Enable CORS on Solr by following these
   [instructions.](http://marianoguerra.org/posts/enable-cors-in-apache-solr.html)
3. Run the _techproducts_ example:
    * $ bin/solr start -e techproducts
4. Install app dependencies:
    * $ npm install
5. Start the webpack dev server:
    * $ npm start
6. Point a browser to [localhost:8080/index.html](http://localhost:8080/index.html)
7. Search for everything by typing *:* in the search box and hitting _return_.
8. Try other searches and selecting some facets.
