import React, { Component, PropTypes } from 'react';
import SearchApp from './searchapp';

class SearchAppContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      response: mockResponse
    };
  }

  /*
   * should return { query: string, filters: list-of-strings }
   */
  getQueryParams() {
    const query = this.props.location.query.q || '';

    let filters = [];
    if (this.props.location.query.fq) {
      if (this.props.location.query.fq instanceof Array) {
        filters = this.props.location.query.fq.slice(0);
      } else {
        filters = [ this.props.location.query.fq ];
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
    return <SearchApp queryParams={this.getQueryParams()}
                      searchResults={this.state.response}
                      setQueryParams={this.setQueryParams.bind(this)}
            />
  }
}

SearchAppContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SearchAppContainer;

////////// FIXME ///////////

const mockResponse = {
  queryTime: 27,
  totalFound: 7526,
  start: 50,
  results: [
    { id: 1,
      title: "Alaska boundary dispute",
      sample: "The <mark>Alaska boundary dispute</mark> was a territorial dispute between the United States and the United Kingdom, which then controlled Canada's foreign relations.",
      source: "Wikipedia",
      published: "14 May 2016",
      wordcount: 2345
    },
    { id: 2,
      title: "Grace Inez Crawford",
      sample: "<mark>Grace Inez Crawford</mark>, also known as Grace Lovat Fraser (1889–1977) was a singer, actress, costume designer, translator of plays, and author of several books.",
      source:  "Wikipedia",
      published: "14 April 2016",
      wordcount: 789
    }
  ],
  facets: {
    source: [
      { label: "The Guardian", filter: "a1", selected: false },
      { label: "The Independent", filter: "a2", selected: false },
      { label: "Prospect", filter: "a3" , selected: true }
    ],
    published: [
      { label: "Last week", filter: "b1" , selected: false },
      { label: "Last month", filter: "b2", selected: true },
      { label: "Last year", filter: "b3", selected: false },
      { label: "Last five years", filter: "b4", selected: false }
    ],
    wordcount: [
      { label: "1-100", filter: "c1", selected: false },
      { label: "100-1000", filter: "c2", selected: false },
      { label: "1000-any", filter: "c3", selected: false }
    ]
  }
};
