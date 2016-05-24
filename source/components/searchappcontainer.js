import React, { Component, PropTypes } from 'react';
import SearchApp from './searchapp';

class SearchAppContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      response: null
    };
    console.log("SearchAppContainer.constructor");
    console.log(props);
  }

  /*
   * When the component mounts, do an initial search in case there is a
   * query in the location.
   */
  componentDidMount() {
    console.log("componentDidMount");
    this.doSearch(this.props);
  }

  /*
   * something has changed, probably the location. Update the search results.
   */
  componentWillReceiveProps(newProps) {
    console.log("componentWillReceiveProps");
    console.log(newProps);
    this.doSearch(newProps);
  }

  /*
   * pass the query params to the search service and get the search results.
   * we need to pass props rather than use this.props because of the way that
   * componentDidMount() works.
   */
  doSearch(props) {
    // first, blank existing results and set busy indicator
    this.setState({ response: null, busy: true });

    const qp = this.getQueryParams(props);
    if (qp.query) {
      this.props.searchService(qp, (response) => {
        console.log("setting response from searchService");
        this.setState({ response, busy: false });
      });
    } else {
      this.setState({ busy: false });
    }
  }

  /*
   * should return { query: string, filters: list-of-strings }
   */
  getQueryParams(props) {
    const query = props.location.query.q || '';

    let filters = [];
    if (props.location.query.fq) {
      if (props.location.query.fq instanceof Array) {
        filters = props.location.query.fq.slice(0);
      } else {
        filters = [ props.location.query.fq ];
      }
    }

    return { query, filters };
  }

  setQueryParams(queryParams) {
    this.context.router.push({ query: {
      q: queryParams.query,
      fq: queryParams.filters
    }});
  }

  render() {
    return <SearchApp queryParams={this.getQueryParams(this.props)}
                      searchResults={this.state.response}
                      setQueryParams={this.setQueryParams.bind(this)}
                      busy={this.state.busy} />;
  }
}

SearchAppContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

SearchAppContainer.propTypes = {
  searchService: PropTypes.func.isRequired
};

export default SearchAppContainer;
