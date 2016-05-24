
export function makeSearchService() {
  return (queryParams, setSearchResults) => {
    // use setTimeout to simulate search latency
    setTimeout(() => {
      setSearchResults(makeMockResponse());
    }, 1000);
  };
}

function makeMockResponse() {
  return {
    queryTime: 27,
    totalFound: 7526,
    start: 50,
    results: [
      { id: 1,
        title: "Current time is " + new Date().toUTCString(),
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
}
