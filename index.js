const downloader = require('./downloader');

const url = 'https://www2.sefaz.ce.gov.br/sitram-internet/masterDetailLancamento.do?method=search&answer='
const cnpj = '43192471000151'
const currentDate = new Date()
const monthsName = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];

async function exec() {
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    let month = currentMonth - 1
    let goOn = true

    while(goOn) {
        
        for(month; month >= 0; month--) {
            try {
                goOn = await downloader(url, month, currentYear, cnpj, true);
                if(goOn) break
                console.log(`${monthsName[month]} baixado com sucesso!`)
            }
            catch(e) {
                console.log(e)
            }
        }
    }
}


exec()




