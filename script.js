const output = document.getElementById("output");

output.innerHTML = `
    <tr>
        <td colspan="2">Loading...</td>
    </tr>
`;

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

const promise1 = createPromise("Promise 1");
const promise2 = createPromise("Promise 2");
const promise3 = createPromise("Promise 3");

Promise.all([promise1, promise2, promise3])
    .then((results) => {

        output.innerHTML = "";

        results.forEach((result) => {
            output.innerHTML += `
                <tr>
                    <td>${result.name}</td>
                    <td>${result.time.toFixed(3)}</td>
                </tr>
            `;
        });

        const totalTime = Math.max(
            ...results.map(result => result.time)
        );

        output.innerHTML += `
            <tr>
                <td><strong>Total</strong></td>
                <td><strong>${totalTime.toFixed(3)}</strong></td>
            </tr>
        `;
    });