const SHIPPING_THRESHOLD_EUR = 100; // euros
const SHIPPING_FLAT_EUR = 7.99;     // euros
const GIFT_WRAP_COST = 1.5          // euros
const ONE_HUNDRED = 100;            // percent base
const DISCOUNT_FIVE_PERCENT = 0.05; // percent base
const DISCOUNT_TEN_PERCENT = 0.10;  // percent base

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

function giftWrapCost(quantity: number) {
    return GIFT_WRAP_COST * quantity;
}

function calculateDiscount(totalPurchase: number) {
    let discountPercentage = 0;

    if (totalPurchase < 50) {
        return totalPurchase;
    } else if (totalPurchase >= 50 && totalPurchase <= 100) {
        discountPercentage = DISCOUNT_FIVE_PERCENT;
    } else {
        discountPercentage = DISCOUNT_TEN_PERCENT;
    }

    return totalPurchase - (totalPurchase * discountPercentage);
}

function calculateTotalPurchase(products: ProductType[]) {
    let totalPurchase = 0;
    for (let i = 0; i < products.length; i++) {
        let currentProductValue = products[i].price * products[i].quantity;
        if (products[i].giftWrap) {
            currentProductValue += giftWrapCost(products[i].quantity);
        }
        totalPurchase += currentProductValue;
    }

    return totalPurchase;
}

function handlePurchase(products: ProductType[], productsTax: number) {
    const totalPurchase = calculateTotalPurchase(products);
    const totalPurchaseAfterDiscount = calculateDiscount(totalPurchase);
    const totalPurchaseAfterTax = applyTax(totalPurchaseAfterDiscount, productsTax);
    const finalPurchasePrice = shippingCost(totalPurchaseAfterTax) + totalPurchaseAfterTax;

    return finalPurchasePrice;
}

console.log(handlePurchase([{ price: 49, quantity: 1, giftWrap: false }], 20))
console.log(handlePurchase([{ price: 75, quantity: 1, giftWrap: false }], 20))
console.log(handlePurchase([{ price: 150, quantity: 1, giftWrap: false }], 20))