function getNumbersOfString(string) {
    const numeros = string.match(/\d+/g);
    return numeros
}

module.exports = getNumbersOfString;