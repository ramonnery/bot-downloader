function waitSeconds(seconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, (seconds * 1000));
    });
}

module.exports = waitSeconds;