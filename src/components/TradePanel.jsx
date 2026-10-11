import { useState } from "react";
import "./TradePanel.css";
import { formatCents } from "../utils/formatCents.js";

const QUICK_QUANTITIES = [1, 5, 10, 25];

function TradePanel({ stock, price, sharesOwned, onTrade }) {
    // The quantity is kept as text so the input is controlled by React.
    const [quantityText, setQuantityText] = useState("");
    const [result, setResult] = useState(null);

    // A valid quantity is a whole number of at least 1.
    const isValidQuantity = /^[1-9]\d*$/.test(quantityText.trim());
    const quantity = isValidQuantity ? Number(quantityText.trim()) : 0;

    function handleQuantityChange(event) {
        setQuantityText(event.target.value);
        setResult(null);
    }

    // Quick buttons only fill in the quantity; they never place a trade.
    function handleQuickQuantity(amount) {
        setQuantityText(String(amount));
        setResult(null);
    }

    function handleTrade(type) {
        if (!isValidQuantity) {
            setResult({
                success: false,
                message: "Enter a whole number of shares (1 or more)."
            });
            return;
        }

        // App checks cash and shares owned, then updates the portfolio.
        setResult(onTrade(type, quantity));
    }

    return (
        <section className="trade-panel" aria-label="Trade stocks">
            <div className="trade-panel-header">
                <p className="trade-panel-label">
                    TRADE {stock.ticker}
                </p>

                <p className="trade-panel-owned">
                    You own <strong>{sharesOwned}</strong>{" "}
                    {sharesOwned === 1 ? "share" : "shares"}
                </p>
            </div>

            <div className="trade-panel-controls">
                <div className="trade-panel-quantity">
                    <label htmlFor="trade-quantity">Quantity</label>

                    <input
                        id="trade-quantity"
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        placeholder="e.g. 10"
                        value={quantityText}
                        onChange={handleQuantityChange}
                    />
                </div>

                <button
                    type="button"
                    className="trade-button buy"
                    onClick={() => handleTrade("buy")}
                >
                    Buy
                </button>

                <button
                    type="button"
                    className="trade-button sell"
                    onClick={() => handleTrade("sell")}
                >
                    Sell
                </button>
            </div>

            <div
                className="trade-panel-quick"
                role="group"
                aria-label="Quick quantities"
            >
                {QUICK_QUANTITIES.map(amount => (
                    <button
                        key={amount}
                        type="button"
                        className="quick-button"
                        onClick={() => handleQuickQuantity(amount)}
                    >
                        {amount}
                    </button>
                ))}
            </div>

            {isValidQuantity && (
                <p className="trade-panel-estimate">
                    Estimated total: {formatCents(Math.round(price * 100) * quantity)}
                </p>
            )}

            {result && (
                <p
                    className={
                        result.success
                            ? "trade-message success"
                            : "trade-message error"
                    }
                    role="status"
                >
                    {result.message}
                </p>
            )}
        </section>
    );
}

export default TradePanel;
