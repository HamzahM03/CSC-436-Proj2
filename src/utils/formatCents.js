// Format a whole number of cents as dollars, e.g. 1000000 -> "$10,000.00".
export function formatCents(cents) {
    return (cents / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}
