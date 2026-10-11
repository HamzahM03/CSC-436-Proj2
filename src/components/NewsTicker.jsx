import "./NewsTicker.css";

function NewsTicker({ news }) {
    return (
        <section className="news-ticker" aria-label="Market news">
            <span className="news-ticker-label">
                MARKET NEWS
            </span>

            <div className="news-ticker-track">
                <p
                    key={news?.id ?? "waiting"}
                    className="news-ticker-headline"
                    aria-live="polite"
                >
                    {news
                        ? news.headline
                        : "Market is open. Waiting for breaking news..."}
                </p>
            </div>
        </section>
    );
}

export default NewsTicker;