import { useState } from "react";
import "./App.css";

import { initialStocks } from "./data/initialStocks.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import GameStats from "./components/GameStats.jsx";
import MarketPanel from "./components/MarketPanel.jsx";

const sampleHistory = {
    AAPL: [190, 192, 189, 195, 193, 198, 196],
    NVDA: [140, 138, 145, 147, 143, 151, 149],
    TSLA: [250, 255, 248, 260, 257, 265, 261],
    AMZN: [180, 183, 181, 186, 184, 188, 191],
    MSFT: [420, 425, 423, 430, 428, 433, 436],
};

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
                    history={sampleHistory[selectedTicker]}
                />
            </main>
        </>
    );
}

export default App;