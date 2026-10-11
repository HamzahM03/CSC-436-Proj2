# Stock Simulator

CSC 436 Project 2: React Fundamentals.

A stock-market simulation game. Five fictional stocks (AAPL, NVDA, TSLA, AMZN, MSFT) change price every three seconds, and fictional breaking news moves one or more of them. Start with $10,000 of virtual cash, watch the chart and news ticker, and buy or sell shares to grow your total portfolio value.

**Live site:** _TODO: add the Netlify URL after deploying_

**GitHub repository:** _TODO: add the repository URL_

## Features

- Five stocks with independent prices and price-history charts (Recharts).
- Automatic market updates every three seconds.
- Random news events with cooldown and repeat prevention.
- Buy and sell the selected stock at its current price with a controlled quantity input.
- Validation for non-whole or non-positive quantities, insufficient cash, and selling more shares than owned.
- Live cash balance, shares owned per stock, and total portfolio value.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev      # development server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # serve the production build locally
npm run lint     # run ESLint
```

## Deploy (Netlify)

- Build command: `npm run build`
- Publish directory: `dist`

## Project structure

```
src/
  App.jsx                 # market, news, selected stock, and portfolio state
  components/
    Header.jsx, Hero.jsx
    GameStats.jsx         # selected price, cash, portfolio value
    MarketPanel.jsx       # stock tabs, chart, news ticker
    StockChart.jsx, NewsTicker.jsx
    TradePanel.jsx        # quantity input, buy/sell buttons, messages
  data/                   # initialStocks.js, newsEvents.js
  utils/formatCents.js    # cents -> "$1,234.56"
```
