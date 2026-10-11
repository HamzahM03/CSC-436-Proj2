import { formatCents } from "../utils/formatCents.js";

function GameStats({ stock, price, cashCents, portfolioValueCents }) {
    return (
        <section aria-label="Game overview" className="py-3">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                <div>
                    <p className="mb-1 text-uppercase small">
                        {stock.ticker} · {stock.name}
                    </p>

                    <h2 className="fs-4 mb-0">
                        ${price.toFixed(2)}
                        <span className="fs-6 fw-normal"> / share</span>
                    </h2>
                </div>

                <div className="text-end">
                    <p className="mb-1 text-uppercase small">
                        Available Cash
                    </p>

                    <h2 className="fs-4 mb-0">
                        {formatCents(cashCents)}
                    </h2>
                </div>

                <div className="text-end">
                    <p className="mb-1 text-uppercase small">
                        Portfolio Value
                    </p>

                    <h2 className="fs-4 mb-0">
                        {formatCents(portfolioValueCents)}
                    </h2>
                </div>

            </div>
        </section>
    );
}

export default GameStats;
