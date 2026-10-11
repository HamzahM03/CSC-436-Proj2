import { useState, useEffect, useCallback} from "react";
import "./App.css";

import { initialStocks } from "./data/initialStocks.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import GameStats from "./components/GameStats.jsx";
import MarketPanel from "./components/MarketPanel.jsx";


function App() {
    const [selectedTicker, setSelectedTicker] = useState("AAPL");
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
        const changes = Object.fromEntries(
            initialStocks.map(stock => [
                stock.ticker,
                (Math.random() - 0.5) * 0.04
            ])
        );

        setMarket(previousMarket => {
            const updatedMarket = {};

            for (const [ticker, stockData] of Object.entries(previousMarket)) {
                const newPrice = Math.max(
                    0.01,
                    stockData.price * (1 + changes[ticker])
                );

                updatedMarket[ticker] = {
                    price: newPrice,
                    history: [...stockData.history, newPrice]
                };
            }

            return updatedMarket;
        });
    }, []);


    useEffect(() => {
        const intervalId = setInterval(advanceMarket, 3000);

        return () => clearInterval(intervalId);
    }, [advanceMarket]);

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
                />

            </main>
        </>
    );
}

export default App;