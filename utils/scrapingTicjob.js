// MODULOS
const puppeteer = require('puppeteer');

// IIFE Function (Función asíncrona auto-ejecutable)
const scrapingTicjob = async tag => {
    try {
        // Abre el navegador (chromium)
        const browser = await puppeteer.launch({
            headless: false,
            // devtools: true,
        });

        // Abre nueva página en el navegador
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });
        await page.goto('https://ticjob.es/');

        // ----------------- BUSCAR TRABAJOS DESARROLLO -----------------
        // Espera a que el input sea visible
        await page.waitForSelector('#keywords-input', {
            visible: true,
        });
        // Escribe texto en el input seleccionado
        await page.type('#keywords-input', tag, {
            delay: 100,
        });
        // Click en el botón "Buscar"
        await page.waitForTimeout(2000);
        await page.click('#main-search-button');

        // ----------------- SCRAPEANDO LA INFO -----------------
        // Espera a que sea visible las tarjetas de resultados
        await page.waitForSelector('#search-results-container', {
            visible: true,
        });
        await page.waitForTimeout(2000);

        // Loop a los elementos título de la tarjeta para obtener href
        const allLinks = await page.evaluate(() => {
            const links = document.querySelectorAll('.job-card-header a');
            const linksArr = [];

            for (let link of links) {
                linksArr.push(link.href);
            }
            return linksArr;
        });

        //·················LOOP EXTRACCIÓN DE DATOS·····················//
        const allAdsTicjob = [];
        // Loop a los href para sacar la info
        for (let link of allLinks) {
            await page.goto(link);
            await page.waitForSelector('#job-title');
            await page.waitForTimeout(2000);

            //Creamos un objeto para almacenar los datos
            const allAds = await page.evaluate(() => {
                const tmpObj = {
                    title: document.querySelector('#job-title').innerText,
                    company: document.querySelector(
                        '#job-summary li:last-child a'
                    ).href,
                    location:
                        document.querySelector('#job-summary li a').innerText,
                    description:
                        document.querySelector('.job-offer-content').innerText,
                    image: document.querySelector('.job-offer-logo-image').src,
                    date: 'Sin especificar',
                    link: document.querySelector('#job-options-apply a').href,
                };
                return tmpObj;
            });
            allAdsTicjob.push(allAds);
        }
        await browser.close();
        return allAdsTicjob;
    } catch (err) {
        console.error(err);
    }
};

module.exports = scrapingTicjob;
