import "./MarketPanel.css";
import StockChart from "./StockChart.jsx";

function MarketPanel({ stocks, selectedTicker, onSelectStock,  history}) {
    
    const selectedStock = stocks.find(
        stock => stock.ticker === selectedTicker
    );

    return (
        <section className="market-panel" aria-label="Stock market">

            <div className="stock-tabs">
                {stocks.map(stock => (
                    <button
                        key={stock.ticker}
                        type="button"
                        className={
                            selectedTicker === stock.ticker
                                ? "stock-tab active"
                                : "stock-tab"
                        }
                        onClick={() => onSelectStock(stock.ticker)}
                        aria-pressed={selectedTicker === stock.ticker}
                    >
                        {stock.ticker}
                    </button>
                ))}
            </div>

            <div className="market-chart">
                <p className="market-chart-label">
                    {selectedStock.name.toUpperCase()}
                </p>

                <h2>${selectedStock.startingPrice.toFixed(2)}</h2>

               <StockChart history={history} />
            </div>

        </section>
    );
}

export default MarketPanel;