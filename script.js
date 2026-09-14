//your JS code here. If required.
const output = document.getElementById("output");

// Show Loading initially
output.innerHTML = `
    <tr>
        <td colspan="2">Loading...</td>
    </tr>
`;

// Function to create a promise
function createPromise(name) {
    return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * 2001) + 1000;
        const start = performance.now();

        setTimeout(() => {
            const timeTaken = (performance.now() - start) / 1000;

            resolve({
                name: name,
                time: timeTaken
            });
        }, delay);
    });
}

// Start all 3 promises
const startTime = performance.now();

const promise1 = createPromise("Promise 1");
const promise2 = createPromise("Promise 2");
const promise3 = createPromise("Promise 3");

// Wait for all promises
Promise.all([promise1, promise2, promise3])
    .then((results) => {
        const totalTime = (performance.now() - startTime) / 1000;

        // Remove Loading
        output.innerHTML = "";

        // Add Promise rows
        results.forEach((result) => {
            output.innerHTML += `
                <tr>
                    <td>${result.name}</td>
                    <td>${result.time.toFixed(3)}</td>
                </tr>
            `;
        });

        // Add Total row
        output.innerHTML += `
            <tr>
                <td><strong>Total</strong></td>
                <td><strong>${totalTime.toFixed(3)}</strong></td>
            </tr>
        `;
    });