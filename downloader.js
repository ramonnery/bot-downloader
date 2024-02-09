const puppeteer = require('puppeteer');
const waitSeconds = require('./waitSeconds');
const getPages = require('./getPages')

async function downloader(url, currentMonth, currentYear) {
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: false,
    })

    const page = await browser.newPage()
    await page.goto(url)

    // Seleciona o mês
    await page.waitForSelector('#mesReferencia');
    await page.click('#mesReferencia')
    await page.select('#mesReferencia', currentMonth)

    // Seleciona o ano
    await page.click('#anoReferencia')
    await page.select('#anoReferencia', currentYear)

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

    await page.waitForSelector('.text-center.screen')
    const element = await page.$('.text-center.screen');
    const text = await page.evaluate(element => element.textContent, element);
    let totalPages = getPages(text)
    
    for(let p = 1; p <= totalPages; p++)  {
        await page.waitForSelector('#lancamentos');
        await page.click('#lancamentos a.btn')
        waitSeconds(2)
        await page.click('.glyphicon-triangle-right')
    }

   await waitSeconds(4)
   await browser.close()

}

module.exports = downloader;