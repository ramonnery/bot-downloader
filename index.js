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
    console.log('###########################')
    console.log('| Bem-vindo ao Downloader |')
    console.log('###########################\n')

    while(goOn) {
        
        for(month; month >= 0; month--) {
            try {
                console.log('===========================')
                console.log(`baixando ${monthsName[month]}...`)
                goOn = await downloader(url, month, currentYear, cnpj, true);
                if(goOn) {
                    console.log(`Houve um erro interno da SEFAZ ao tentar baixar o mês de ${monthsName[month]}`)
                    console.log('Tentando novamente...')
                    break
                }
                console.log(`${monthsName[month]} baixado com sucesso!`)
            }
            catch(e) {
                console.log(e)
            }
        }
    }
}


exec()




