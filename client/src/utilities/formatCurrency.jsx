const CURRENCY_FORMAT = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function formatCurrency(amount) {
    return CURRENCY_FORMAT.format(amount);
}

