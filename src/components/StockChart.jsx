import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

function StockChart({ history }) {
    const chartData = history.map((price, index) => ({
        step: index + 1,
        price: price,
    }));

    return (
        <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid
                        stroke="#46617a"
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="step"
                        stroke="#a9bacb"
                    />

                    <YAxis
                        domain={["auto", "auto"]}
                        stroke="#a9bacb"
                        width={55}
                    />

                    <Tooltip
                        formatter={(value) => `$${Number(value).toFixed(2)}`}
                    />

                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#65c7c0"
                        strokeWidth={2.5}
                        dot={false}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StockChart;