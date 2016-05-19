import React, { Component } from 'react';
import QueryInput from './queryinput';
import Stats from './stats';
import Results from './results';
import FacetList from './facetlist';
import Pager from './pager';

const mockResponse = {
  stats: {
    qtime: 27,
    numFound: 7526,
    start: 50
  },
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

class SearchApp extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      response: mockResponse
    };
  }

  render() {
    let row2 = null;
    let row3 = null;
    let row4 = null;

    const query = this.props.location.query.query;
    const resp = this.state.response;

    if (query) {
      row2 = <div className="row app_vsp05">
        <Stats qtime={resp.stats.qtime}
          numFound={resp.stats.numFound}
          start={resp.stats.start}
          len={resp.results.length} />
        <div className="col-sm-4">
          <strong>Refine search</strong>
        </div>
      </div>;

      if (resp.results) {
        row3 = <div className="row app_vsp15">
          <Results searchResults={resp.results}/>
          <div className="col-sm-4">
            <h5>Source:</h5>
            <FacetList multiselect={true} facets={resp.facets.source} />

            <h5 className="app_vsp15">Published:</h5>
            <FacetList facets={resp.facets.published}/>

            <h5 className="app_vsp15">Word count:</h5>
            <FacetList facets={resp.facets.wordcount} />
          </div>
        </div>;

        // only show pager if required
        if (resp.stats.start > 0 || resp.stats.numFound > resp.results.length) {
          row4 = <div className="row app_vsp05">
            <div className="col-sm-8">
              <Pager numFound={resp.stats.numFound}
                start={resp.stats.start}
                len={resp.results.length}
                pageSize={10} />
            </div>
          </div>;
        }
      }
    }

    return <div className="container">
      <div className="row">
        <QueryInput initialQuery={query} onQuerySubmit={this.onQuerySubmit.bind(this)}/>
      </div>
      {row2} {row3} {row4}
    </div>;
  }

  onQuerySubmit(newQuery) {
    // this confused me for ages - previously:
    //this.props.history.push({query:newQuery});
    this.props.history.push({query:{query:newQuery}});
  }
}

export default SearchApp;
