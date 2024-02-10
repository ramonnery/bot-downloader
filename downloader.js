const puppeteer = require('puppeteer');
const waitSeconds = require('./waitSeconds');
const getPages = require('./getPages')

async function downloader(url, currentMonth, currentYear, cnpj, view=true) {
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: !view,
    })

    const page = await browser.newPage()
    await page.goto(url)

    // Seleciona o mês
    await page.waitForSelector('#mesReferencia');
    await page.click('#mesReferencia')
    await page.select('#mesReferencia', String(currentMonth))

    // Seleciona o ano
    await page.click('#anoReferencia')
    await page.select('#anoReferencia', String(currentYear))

    // Seleciona a receita
    await page.click('#codReceita')
    await page.select('#codReceita', '1031')

    // Seleciona débitos
    await page.click('#situacao')
    await page.select('#situacao', '2')
    
    // Add CNPJ
    await page.type('#codDestinatario', cnpj)
    await page.click('body')

    // Espera 2 segundos e pesquisa
    await waitSeconds(2)
    await page.click('#pesquisar')

    await waitSeconds(3)
    const modalDialog = await page.$('.modal-dialog')
    const erro = modalDialog !== null
    
    if(erro) {
        await browser.close()
        return true
    }

    await waitSeconds(5)
    await page.waitForSelector('.text-center.screen')
    const element = await page.$('.text-center.screen');
    const text = await page.evaluate(element => element.textContent, element);
    let totalPages = getPages(text)
    
    for(let p = 1; p <= totalPages; p++)  {
        await waitSeconds(1)
        await page.waitForSelector('#lancamentos a');
        await page.click('#lancamentos a')
        await waitSeconds(1)
        await page.click('.glyphicon-triangle-right')
    }

    await waitSeconds(4)
    await browser.close()
    return false
}

module.exports = downloader;