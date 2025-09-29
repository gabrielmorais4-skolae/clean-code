const SHIPPING_THRESHOLD_EUR = 100; // euros
const SHIPPING_FLAT_EUR = 7.99;     // euros
const GIFT_WRAP_COST = 1.5          // euros
const ONE_HUNDRED = 100;            // percent base
const DISCOUNT_FIVE_PERCENT = 0.05; // percent base
const DISCOUNT_TEN_PERCENT = 0.10;  // percent base (fixed typo)

type ProductType = {
    price: number,
    quantity: number,
    giftWrap: boolean
};

function applyTax(amount: number, taxRatePercent: number) {
    if (taxRatePercent <= 0) return amount;
    return amount + (amount * (taxRatePercent / ONE_HUNDRED));
}

function shippingCost(orderTotal: number) {
    return orderTotal > SHIPPING_THRESHOLD_EUR ? 0 : SHIPPING_FLAT_EUR;
}

function totalY(a, tx) {
    let tot = 0;
    for (let i = 0; i < a.length; i++) {
        let s = a[i].price * a[i].qty;
        if (a[i].giftWrap) {
            s = s + (1.5 * a[i].qty);
        }
        tot += s;
    }
    let disc = 0;
    if (tot >= 50 && tot <= 100) {
        disc = 0.05;
    }
    if (tot > 100) {
        disc = 0.10;
    }
    tot = tot - (tot * disc);
    tot = tot + (tot * (tx / 100));
    if (tot > 100) {
        tot = tot + 0;
    } else {
        tot = tot + 7.99;
    }
    return tot;
}
