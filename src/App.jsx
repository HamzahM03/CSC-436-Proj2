import { useState } from "react";
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

    function advanceMarket() {
        setMarket(previousMarket => {
            const updatedMarket = {};

            for (const [ticker, stockData] of Object.entries(previousMarket)) {
                const percentChange = (Math.random() - 0.5) * 0.04;

                const newPrice = Math.max(
                    0.01,
                    stockData.price * (1 + percentChange)
                );

                updatedMarket[ticker] = {
                    price: newPrice,
                    history: [...stockData.history, newPrice]
                };
            }

            return updatedMarket;
        });
    }

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

                <button
                    type="button"
                    className="btn btn-outline-light mt-3"
                    onClick={advanceMarket}
                >
                    Next Market Tick
                </button>
            </main>
        </>
    );
}

export default App;