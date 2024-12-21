export function sleep(question) {
    if (typeof question != "string") throw new Error("The question is invalid");
    return new Promise(resolve => {
        process.stdout.write(question);
        process.stdin.once("data", (data) => {
            resolve(data.toString().trim());
        });
    });
}