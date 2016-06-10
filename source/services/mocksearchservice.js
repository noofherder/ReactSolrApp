
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
    pageSize: 15,
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
        // FIXME
      ],
      category: [
        // FIXME
      ],
      price_range: [
        // FIXME
      ]
    }
  };
}
