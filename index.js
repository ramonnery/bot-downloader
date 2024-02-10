const downloader = require('./downloader');

const url = 'https://www2.sefaz.ce.gov.br/sitram-internet/masterDetailLancamento.do?method=search&answer='
const cnpj = '43192471000151'
const currentDate = new Date()
const currentYear = String(currentDate.getFullYear())
const currentMonth = String(currentDate.getMonth() - 1)

async function exec() {
    let goOn = true
    while(goOn) {
        goOn = await downloader(url, currentMonth, currentYear, cnpj, true);        
    }
}

exec()



