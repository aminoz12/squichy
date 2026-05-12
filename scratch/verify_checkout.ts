import { products } from "../lib/data";

const testIds = [
  "mystery-b1",
  "mystery-b63",
  "apple-squishy-b21",
  "bundle-6-get-3" // Legacy
];

console.log("Testing Checkout ID Mapping:");

testIds.forEach(id => {
    let searchId = id;
    if (searchId === "bundle-1") searchId = "mystery-b1";
    if (searchId === "bundle-2-get-1") searchId = "mystery-b21";
    if (searchId === "bundle-4-get-2") searchId = "mystery-b42";
    if (searchId === "bundle-6-get-3") searchId = "mystery-b63";
    if (searchId === "bundle-8-get-4") searchId = "mystery-b84";

    let found = false;
    for (const p of products) {
        const opt = p.options.find(o => o.id === searchId);
        if (opt) {
            console.log(`✅ [${id}] -> Found in ${p.name}: ${opt.label} ($${opt.priceUsd})`);
            found = true;
            break;
        }
    }
    if (!found) {
        console.log(`❌ [${id}] -> NOT FOUND`);
    }
});
