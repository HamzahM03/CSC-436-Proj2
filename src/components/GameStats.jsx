function GameStats({ stock }) {
    return (
        <section aria-label="Game overview" className="py-3">
            <div className="d-flex justify-content-between align-items-center gap-3">

                <div>
                    <p className="mb-1 text-uppercase small">
                        {stock.ticker} · {stock.name}
                    </p>

                    <h2 className="fs-4 mb-0">
                        ${stock.startingPrice.toFixed(2)}
                        <span className="fs-6 fw-normal"> / share</span>
                    </h2>
                </div>

                <div className="text-end">
                    <p className="mb-1 text-uppercase small">
                        Available Cash
                    </p>

                    <h2 className="fs-4 mb-0">
                        $10,000.00
                    </h2>
                </div>

            </div>
        </section>
    );
}

export default GameStats;