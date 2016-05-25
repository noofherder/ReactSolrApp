
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
      { id: "1",
        name: "Samsung SpinPoint P120 SP2514N - hard drive - 250 GB - ATA-133",
        features: ["7200RPM, 8MB cache, IDE Ultra ATA-133",
          "NoiseGuard, SilentSeek technology, Fluid Dynamic Bearing (FDB) motor"],
        price: 92.0,
        inStock: true
      },
      { id: "2",
        name: "Maxtor DiamondMax 11 - hard drive - 500 GB - SATA-300",
        features: ["SATA 3.0Gb/s, NCQ",
          "8.5ms seek",
          "16MB cache"],
        price: 350.0,
        inStock: true
      },
      { id: "3",
        name: "Belkin Mobile Power Cord for iPod w/ Dock",
        features: ["car power adapter, white"],
        price: 19.95,
        inStock: true
      },
    ],
    facets: {
      manufacturer: [
        { label: "Corsair", count: 10, filter: "a1", selected: false },
        { label: "Belkin", count: 8, filter: "a2", selected: true },
        { label: "Canon", count: 3, filter: "a3", selected: false }
      ],
      category: [
        { label: "Electronics", count: 12, filter: "b1", selected: false },
        { label: "Memory", count: 9, filter: "b2", selected: false },
        { label: "Connector", count: 9, filter: "b3", selected: false },
        { label: "Software", count: 7, filter: "b4", selected: false },
        { label: "Printer", count: 3, filter: "b5", selected: false },
        { label: "Blah", count: 3, filter: "b6", selected: false },
        { label: "Blah", count: 3, filter: "b7", selected: false },
        { label: "Blah", count: 3, filter: "b8", selected: false },
        { label: "Blah", count: 3, filter: "b9", selected: false },
        { label: "Blah", count: 3, filter: "b10", selected: false },
        { label: "Blah", count: 3, filter: "b11", selected: false },
        { label: "Blah", count: 3, filter: "b12", selected: false },
        { label: "Blah", count: 3, filter: "b13", selected: false },
        { label: "Blah", count: 3, filter: "b14", selected: false },
      ],
      price_range: [
        { label: "£50-100", count: 17, filter: "c1", selected: false },
        { label: "£20-50", count: 4, filter: "c2", selected: false },
        { label: "£100-200", count: 3, filter: "c3", selected: false },
        { label: "£10-20", count: 1, filter: "c4", selected: false }
      ]
    }
  };
}
