import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";

import { newsEvents } from "./data/newsEvents.js";
import { initialStocks } from "./data/initialStocks.js";

import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import GameStats from "./components/GameStats.jsx";
import MarketPanel from "./components/MarketPanel.jsx";

function App() {
    const [selectedTicker, setSelectedTicker] = useState("AAPL");
    const [currentNews, setCurrentNews] = useState(null);

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

    return (
        <>
            <Header />

            <main className="container">
                <Hero />

                <GameStats
                    stock={selectedStock}
                    price={market[selectedTicker].price}
                />

                <MarketPanel
                    stocks={initialStocks}
                    selectedTicker={selectedTicker}
                    onSelectStock={setSelectedTicker}
                    history={market[selectedTicker].history}
                    price={market[selectedTicker].price}
                    news={currentNews}
                />
            </main>
        </>
    );
}

export default App;