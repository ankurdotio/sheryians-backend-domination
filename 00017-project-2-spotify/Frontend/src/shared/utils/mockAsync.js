export const wait = (value, delay = 180) =>
    new Promise((resolve) => {
        window.setTimeout(() => resolve(value), delay)
    })