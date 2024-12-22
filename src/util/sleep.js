export async function sleep(ms) {
    if (isNaN(ms)) throw new Error("The ms is invalid.");
    return new Promise(resolve => setTimeout(resolve, ms));
}