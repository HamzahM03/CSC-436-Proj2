export const newsEvents = [
    // APPLE — 8 events
    {
        id: 1,
        headline: "Apple reports record iPhone sales",
        impacts: { AAPL: 0.06 }
    },
    {
        id: 2,
        headline: "Apple faces unexpected production delays",
        impacts: { AAPL: -0.05 }
    },
    {
        id: 3,
        headline: "Apple announces breakthrough in on-device AI",
        impacts: { AAPL: 0.07 }
    },
    {
        id: 4,
        headline: "Apple quarterly earnings miss expectations",
        impacts: { AAPL: -0.08 }
    },
    {
        id: 5,
        headline: "Apple expands into new international markets",
        impacts: { AAPL: 0.03 }
    },
    {
        id: 6,
        headline: "Apple faces major antitrust lawsuit",
        impacts: { AAPL: -0.06 }
    },
    {
        id: 7,
        headline: "Apple announces massive share buyback program",
        impacts: { AAPL: 0.04 }
    },
    {
        id: 8,
        headline: "Apple reports weaker-than-expected device demand",
        impacts: { AAPL: -0.04 }
    },

    // NVIDIA — 8 events
    {
        id: 9,
        headline: "NVIDIA unveils next-generation AI processors",
        impacts: { NVDA: 0.09 }
    },
    {
        id: 10,
        headline: "NVIDIA faces restrictions on international chip exports",
        impacts: { NVDA: -0.08 }
    },
    {
        id: 11,
        headline: "NVIDIA announces record data center revenue",
        impacts: { NVDA: 0.07 }
    },
    {
        id: 12,
        headline: "NVIDIA production disrupted by supply shortages",
        impacts: { NVDA: -0.06 }
    },
    {
        id: 13,
        headline: "NVIDIA signs major cloud computing partnership",
        impacts: { NVDA: 0.05 }
    },
    {
        id: 14,
        headline: "Competitor challenges NVIDIA's AI chip dominance",
        impacts: { NVDA: -0.05 }
    },
    {
        id: 15,
        headline: "NVIDIA raises annual revenue forecast",
        impacts: { NVDA: 0.06 }
    },
    {
        id: 16,
        headline: "NVIDIA investors react to disappointing margins",
        impacts: { NVDA: -0.04 }
    },

    // TESLA — 8 events
    {
        id: 17,
        headline: "Tesla announces breakthrough battery technology",
        impacts: { TSLA: 0.10 }
    },
    {
        id: 18,
        headline: "Tesla vehicle deliveries fall below expectations",
        impacts: { TSLA: -0.08 }
    },
    {
        id: 19,
        headline: "Tesla opens major new manufacturing facility",
        impacts: { TSLA: 0.05 }
    },
    {
        id: 20,
        headline: "Tesla recalls vehicles over safety concerns",
        impacts: { TSLA: -0.07 }
    },
    {
        id: 21,
        headline: "Tesla reports record quarterly profitability",
        impacts: { TSLA: 0.07 }
    },
    {
        id: 22,
        headline: "Tesla faces increased electric vehicle competition",
        impacts: { TSLA: -0.04 }
    },
    {
        id: 23,
        headline: "Tesla announces major autonomous driving milestone",
        impacts: { TSLA: 0.08 }
    },
    {
        id: 24,
        headline: "Tesla reduces vehicle prices amid slowing demand",
        impacts: { TSLA: -0.05 }
    },

    // AMAZON — 8 events
    {
        id: 25,
        headline: "Amazon Web Services reports exceptional growth",
        impacts: { AMZN: 0.07 }
    },
    {
        id: 26,
        headline: "Amazon faces widespread delivery disruptions",
        impacts: { AMZN: -0.04 }
    },
    {
        id: 27,
        headline: "Amazon announces major expansion of AI services",
        impacts: { AMZN: 0.06 }
    },
    {
        id: 28,
        headline: "Amazon retail sales miss analyst expectations",
        impacts: { AMZN: -0.06 }
    },
    {
        id: 29,
        headline: "Amazon reports record holiday shopping revenue",
        impacts: { AMZN: 0.05 }
    },
    {
        id: 30,
        headline: "Amazon faces new regulatory investigation",
        impacts: { AMZN: -0.05 }
    },
    {
        id: 31,
        headline: "Amazon introduces major logistics automation improvements",
        impacts: { AMZN: 0.04 }
    },
    {
        id: 32,
        headline: "Amazon cloud service outage affects major customers",
        impacts: { AMZN: -0.08 }
    },

    // MICROSOFT — 8 events
    {
        id: 33,
        headline: "Microsoft announces major Azure revenue growth",
        impacts: { MSFT: 0.06 }
    },
    {
        id: 34,
        headline: "Microsoft faces significant cybersecurity incident",
        impacts: { MSFT: -0.07 }
    },
    {
        id: 35,
        headline: "Microsoft launches new enterprise AI products",
        impacts: { MSFT: 0.07 }
    },
    {
        id: 36,
        headline: "Microsoft cloud infrastructure experiences major outage",
        impacts: { MSFT: -0.08 }
    },
    {
        id: 37,
        headline: "Microsoft signs landmark enterprise software contract",
        impacts: { MSFT: 0.04 }
    },
    {
        id: 38,
        headline: "Microsoft quarterly earnings exceed expectations",
        impacts: { MSFT: 0.05 }
    },
    {
        id: 39,
        headline: "Microsoft faces regulatory challenges over acquisition",
        impacts: { MSFT: -0.05 }
    },
    {
        id: 40,
        headline: "Microsoft reports slowing cloud customer growth",
        impacts: { MSFT: -0.04 }
    },

    // SECTOR-WIDE EVENTS — 5 events
    {
        id: 41,
        headline: "AI infrastructure demand surges across technology sector",
        impacts: {
            NVDA: 0.07,
            MSFT: 0.04,
            AMZN: 0.04,
            AAPL: 0.02
        }
    },
    {
        id: 42,
        headline: "Global semiconductor shortage disrupts technology companies",
        impacts: {
            NVDA: -0.07,
            AAPL: -0.04,
            TSLA: -0.05
        }
    },
    {
        id: 43,
        headline: "New electric vehicle incentives boost industry outlook",
        impacts: {
            TSLA: 0.07
        }
    },
    {
        id: 44,
        headline: "Cloud computing demand accelerates worldwide",
        impacts: {
            MSFT: 0.05,
            AMZN: 0.06,
            NVDA: 0.03
        }
    },
    {
        id: 45,
        headline: "Major cybersecurity vulnerabilities shake technology industry",
        impacts: {
            MSFT: -0.04,
            AMZN: -0.03,
            AAPL: -0.02
        }
    },

    // MARKET-WIDE EVENTS — 5 events
    {
        id: 46,
        headline: "Federal Reserve announces unexpected interest rate cut",
        impacts: {
            AAPL: 0.03,
            NVDA: 0.05,
            TSLA: 0.06,
            AMZN: 0.04,
            MSFT: 0.03
        }
    },
    {
        id: 47,
        headline: "Inflation report exceeds expectations, markets tumble",
        impacts: {
            AAPL: -0.03,
            NVDA: -0.05,
            TSLA: -0.06,
            AMZN: -0.04,
            MSFT: -0.03
        }
    },
    {
        id: 48,
        headline: "Strong employment report fuels market rally",
        impacts: {
            AAPL: 0.02,
            NVDA: 0.03,
            TSLA: 0.04,
            AMZN: 0.03,
            MSFT: 0.02
        }
    },
    {
        id: 49,
        headline: "Global economic uncertainty triggers widespread selling",
        impacts: {
            AAPL: -0.05,
            NVDA: -0.08,
            TSLA: -0.09,
            AMZN: -0.06,
            MSFT: -0.05
        }
    },
    {
        id: 50,
        headline: "Technology stocks rally after optimistic economic forecast",
        impacts: {
            AAPL: 0.04,
            NVDA: 0.06,
            TSLA: 0.05,
            AMZN: 0.04,
            MSFT: 0.04
        }
    }
];