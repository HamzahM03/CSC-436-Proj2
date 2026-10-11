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
    const newsCooldownRef = useRef(0);

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
        // Generate random price movements for all five stocks.
        const changes = Object.fromEntries(
            initialStocks.map(stock => [
                stock.ticker,
                (Math.random() - 0.5) * 0.04
            ])
        );

        // Decide whether a news event should occur this tick.
        let newsEvent = null;

        if (newsCooldownRef.current > 0) {
            newsCooldownRef.current -= 1;
        } else if (Math.random() < 0.20) {
            const randomIndex = Math.floor(
                Math.random() * newsEvents.length
            );

            newsEvent = newsEvents[randomIndex];
            newsCooldownRef.current = 3;
        }

        // Store the latest news event for the future news ticker.
        if (newsEvent) {
            console.log("News triggered:", newsEvent);
            setCurrentNews(newsEvent);
        }

        // Update every stock, including any news impact.
        setMarket(previousMarket => {
            const updatedMarket = {};

            for (const [ticker, stockData] of Object.entries(previousMarket)) {
                const newsImpact =
                    newsEvent?.ticker === ticker ? newsEvent.impact : 0;

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

    // Advance the market automatically every three seconds.
    useEffect(() => {
        const intervalId = setInterval(advanceMarket, 3000);

        return () => clearInterval(intervalId);
    }, [advanceMarket]);

    // Find the stock currently selected by the player.
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