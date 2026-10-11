import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";

import { newsEvents } from "./data/newsEvents.js";
import { initialStocks } from "./data/initialStocks.js";
import { formatCents } from "./utils/formatCents.js";

import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import GameStats from "./components/GameStats.jsx";
import MarketPanel from "./components/MarketPanel.jsx";
import TradePanel from "./components/TradePanel.jsx";

// Money is stored as whole cents so cash math stays exact.
const STARTING_CASH_CENTS = 1_000_000;

function App() {
    const [selectedTicker, setSelectedTicker] = useState("AAPL");
    const [currentNews, setCurrentNews] = useState(null);

    // Cash and shares owned per stock are kept together in one object.
    const [portfolio, setPortfolio] = useState(() => ({
        cashCents: STARTING_CASH_CENTS,
        holdings: Object.fromEntries(
            initialStocks.map(stock => [stock.ticker, 0])
        )
    }));

    // Track news cooldown and recently triggered events.
    const newsCooldownRef = useRef(0);
    const recentNewsIdsRef = useRef([]);

    // Initialize market prices and price histories.
    const [market, setMarket] = useState(() =>
        Object.fromEntries(
            initialStocks.map(stock => [
                stock.ticker,
                {
                    price: stock.startingPrice,
                    history: [stock.startingPrice]
                }
            ])
        )
    );

    const advanceMarket = useCallback(() => {
        // Generate random price movements for all stocks.
        const changes = Object.fromEntries(
            initialStocks.map(stock => [
                stock.ticker,
                (Math.random() - 0.5) * 0.04
            ])
        );

        // Determine whether a news event should occur.
        let newsEvent = null;

        if (newsCooldownRef.current > 0) {
            newsCooldownRef.current -= 1;
        } else if (Math.random() < 0.20) {
            // Exclude the last eight triggered events.
            const availableEvents = newsEvents.filter(
                event => !recentNewsIdsRef.current.includes(event.id)
            );

            // Choose a random eligible event.
            if (availableEvents.length > 0) {
                const randomIndex = Math.floor(
                    Math.random() * availableEvents.length
                );

                newsEvent = availableEvents[randomIndex];

                // Remember this event, keeping only the last eight IDs.
                recentNewsIdsRef.current = [
                    ...recentNewsIdsRef.current,
                    newsEvent.id
                ].slice(-8);

                // Prevent news for the next three market ticks.
                newsCooldownRef.current = 3;
            }
        }

        // Update the news headline displayed in the UI.
        if (newsEvent) {
            console.log("News triggered:", newsEvent);
            setCurrentNews(newsEvent);
        }

        // Update all stock prices, applying any news impacts.
        setMarket(previousMarket => {
            const updatedMarket = {};

            for (const [ticker, stockData] of Object.entries(previousMarket)) {
                // An event can affect one, several, or all stocks.
                const newsImpact = newsEvent?.impacts[ticker] ?? 0;

                const totalChange = changes[ticker] + newsImpact;

                const newPrice = Math.max(
                    0.01,
                    stockData.price * (1 + totalChange)
                );

                updatedMarket[ticker] = {
                    price: newPrice,
                    history: [...stockData.history, newPrice]
                };
            }

            return updatedMarket;
        });
    }, []);

    // Automatically advance the market every three seconds.
    useEffect(() => {
        const intervalId = setInterval(advanceMarket, 3000);

        return () => clearInterval(intervalId);
    }, [advanceMarket]);

    // Get the currently selected stock.
    const selectedStock = initialStocks.find(
        stock => stock.ticker === selectedTicker
    );

    // Total portfolio value = cash + every holding at its current price.
    const portfolioValueCents = initialStocks.reduce(
        (total, stock) =>
            total +
            portfolio.holdings[stock.ticker] *
                Math.round(market[stock.ticker].price * 100),
        portfolio.cashCents
    );

    // Buy or sell the selected stock at its current price.
    // Returns { success, message } so TradePanel can show the result.
    const handleTrade = (type, quantity) => {
        const priceCents = Math.round(market[selectedTicker].price * 100);
        const totalCents = priceCents * quantity;
        const sharesOwned = portfolio.holdings[selectedTicker];

        if (type === "buy" && totalCents > portfolio.cashCents) {
            return {
                success: false,
                message: `Not enough cash. ${quantity} ${selectedTicker} costs ${formatCents(totalCents)}, but you only have ${formatCents(portfolio.cashCents)}.`
            };
        }

        if (type === "sell" && quantity > sharesOwned) {
            return {
                success: false,
                message: `You only own ${sharesOwned} ${selectedTicker} share${sharesOwned === 1 ? "" : "s"}.`
            };
        }

        // Cash goes down when buying and up when selling.
        const cashChange = type === "buy" ? -totalCents : totalCents;
        const sharesChange = type === "buy" ? quantity : -quantity;

        setPortfolio(previous => ({
            cashCents: previous.cashCents + cashChange,
            holdings: {
                ...previous.holdings,
                [selectedTicker]: previous.holdings[selectedTicker] + sharesChange
            }
        }));

        return {
            success: true,
            message: `${type === "buy" ? "Bought" : "Sold"} ${quantity} ${selectedTicker} at ${formatCents(priceCents)} each (${formatCents(totalCents)} total).`
        };
    };

    return (
        <>
            <Header />

            <main className="container">
                <Hero />

                <GameStats
                    stock={selectedStock}
                    price={market[selectedTicker].price}
                    cashCents={portfolio.cashCents}
                    portfolioValueCents={portfolioValueCents}
                />

                <MarketPanel
                    stocks={initialStocks}
                    selectedTicker={selectedTicker}
                    onSelectStock={setSelectedTicker}
                    history={market[selectedTicker].history}
                    price={market[selectedTicker].price}
                    news={currentNews}
                />

                <TradePanel
                    stock={selectedStock}
                    price={market[selectedTicker].price}
                    sharesOwned={portfolio.holdings[selectedTicker]}
                    onTrade={handleTrade}
                />
            </main>
        </>
    );
}

export default App;