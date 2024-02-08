const puppeteer = require('puppeteer');

function waitSeconds(seconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, (seconds * 1000)); // 2000 milissegundos = 2 segundos
    });
}

async function downloader() {
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: false,
    })

    const page = await browser.newPage()
    await page.goto('https://www2.sefaz.ce.gov.br/sitram-internet/masterDetailLancamento.do?method=search&answer=')

    // Seleciona o mês
    await page.waitForSelector('#mesReferencia');
    await page.click('#mesReferencia')
    await page.select('#mesReferencia', '11')

    // Seleciona o ano
    await page.click('#anoReferencia')
    await page.select('#anoReferencia', '2023')

    // Seleciona a receita
    await page.click('#codReceita')
    await page.select('#codReceita', '1031')

    // Seleciona débitos
    await page.click('#situacao')
    await page.select('#situacao', '2')
    
    // Add CNPJ
    await page.type('#codDestinatario', '43192471000151')
    await page.click('body')

    // Espera 2 segundos e pesquisa
    await waitSeconds(2)
    await page.click('#pesquisar')

    // Função JavaScript que extrai o texto da div
    const text = await page.evaluate(() => {
        // Seleciona a div usando o seletor fornecido
        const div = document.querySelector('#text');

        // Retorna apenas o texto dentro da div
        return div
    })

    console.log(text)
}

downloader()