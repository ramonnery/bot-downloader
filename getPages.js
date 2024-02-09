const getNumbersOfString = require('./getNumbersOfString');

function getPages(text) {
    let indexPagina = text.indexOf('Página')
    let phrase = text.slice(indexPagina)
    let listNumbers = getNumbersOfString(phrase)
    let totalPages = Number(listNumbers[1])
    return totalPages
}

module.exports = getPages;