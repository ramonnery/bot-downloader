const downloader = require('./downloader');

const url = 'https://www2.sefaz.ce.gov.br/sitram-internet/masterDetailLancamento.do?method=search&answer='
const cnpj = '43192471000151'
const currentDate = new Date()
const currentYear = String(currentDate.getFullYear() - 1)
const currentMonth = String(11)

downloader(url, currentMonth, currentYear, cnpj, false)