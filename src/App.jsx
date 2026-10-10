import { useState } from "react";
import "./App.css";

import { initialStocks } from "./data/initialStocks.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import GameStats from "./components/GameStats.jsx";
import MarketPanel from "./components/MarketPanel.jsx";

function App() {
    const [selectedTicker, setSelectedTicker] = useState("AAPL");

    const selectedStock = initialStocks.find(
        stock => stock.ticker === selectedTicker
    );

    return (
        <>
            <Header />

            <main className="container">
                <Hero />

                <GameStats stock={selectedStock} />

                <MarketPanel
                    stocks={initialStocks}
                    selectedTicker={selectedTicker}
                    onSelectStock={setSelectedTicker}
                />
            </main>
        </>
    );
}

export default App;