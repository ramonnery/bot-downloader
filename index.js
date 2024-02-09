const downloader = require('./downloader');

const url = 'https://www2.sefaz.ce.gov.br/sitram-internet/masterDetailLancamento.do?method=search&answer='
const currentDate = new Date()
const currentYear = String(currentDate.getFullYear())
const currentMonth = String(currentDate.getMonth() - 1)

downloader(url, currentMonth, currentYear)