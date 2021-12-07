// MÓDULO PARA LLAMAR PUPPETEER
const puppeteer = require('puppeteer');

const scrapingTe = async tag => {
    try {
        //·················NAVEGADOR··················//

        // Abre el navegador (chromium)
        const browser = await puppeteer.launch({
            headless: false,
        });

        // Abre nueva página en el navegador con TecnoEmpleo
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });
        await page.goto('https://www.tecnoempleo.com/');

        //·················BÚSQUEDA··················//

        //Buscamos en el input por desarrollador

        // Espera a que el input sea visible
        await page.waitForSelector('#te', {
            visible: true,
        });
        //Escribe texto en el input seleccionado
        await page.type('#te', tag, {
            delay: 200,
        });

        //Hacemos click en el botón "Buscar"

        await page.waitForTimeout(2000);
        await page.click('.btn-warning');

        //·················FILTRO··················//

        // Espera a que sea visible el filtro "Sin experiencia"
        await page.waitForSelector(
            '#sidebar_filters > div:nth-child(8) > a:nth-child(7)',
            {
                visible: true,
            }
        );
        // Espera 4 seg para poder hacer click
        await page.waitForTimeout(2000);

        //Hacemos click en la opción "sin experiencia"
        await page.click(
            '#sidebar_filters > div:nth-child(8) > a:nth-child(7)'
        );

        //·················CONTENEDOR DE ADS GENERAL Y LINKS·····················//

        // Espera a que sea visible el contenedor con las tarjetas de resultados
        await page.waitForSelector(
            'div[class="bg-white col-12 col-sm-12 col-md-12 col-lg-9"]',
            {
                visible: true,
            }
        );
        await page.waitForTimeout(900);

        // Extraemos en un array los links de las ofertas de trabajo

        const allLinks = await page.evaluate(() => {
            const cards = document.querySelectorAll(
                'div[class="p-2 border-bottom bg-white"]'
            );
            const linksArr = [];

            cards.forEach(element => {
                linksArr.push(
                    element
                        .getAttribute('onclick')
                        .slice(14)
                        .replace(/[ '"]+/g, '')
                );
            });

            return linksArr;
        });

        //·················LOOP EXTRACCIÓN DE DATOS·····················//
        const allAdsTec = [];
        // Loop a los href para sacar la info
        for (let allLink of allLinks) {
            await page.goto(allLink);

            // TITULO-Cuando esta visible, todos estan visibles
            await page.waitForSelector('h1[itemprop="title"]');
            await page.waitForTimeout(400);

            //ENLACE

            //Objetivo a contruir: https://www.tecnoempleo.com/validacion_enviar.php?refer=1c1co2c0er4d5z5494t0&TK=

            await page.waitForSelector('form[name="enviar"]'); // 'https://www.tecnoempleo.com/validacion_enviar.php'
            await page.waitForSelector('form[name="enviar"] input'); //'1c1co2c0er4d5z5494t0'
            await page.waitForTimeout(1000);

            // Creamos un objeto vacío para almacenar los datos
            const allAds = await page.evaluate(() => {
                const tmpObj = {
                    title: document.querySelector('h1[itemprop="title"]')
                        .innerText,
                    company: document.querySelector(
                        'a[class="text-primary link-muted fs--18"]'
                    ).innerText,
                    location: `${
                        document.querySelector('div[class="ml-0 mt-2"] a')
                            .innerText
                    } - ${
                        document.querySelector('div[class="ml-0 mt-2"] span')
                            .innerText
                    }`,
                    description: document.querySelector(
                        'p[class="fs--16 text-gray-800"]'
                    ).innerText,
                    image: document.querySelector('img').src,
                    date: document.querySelector('span[class="ml-4"]')
                        .innerText,
                    link: `${document
                        .querySelector('form[name="enviar"]')
                        .getAttribute('action')}?refer=${document
                        .querySelector('form[name="enviar"] input')
                        .getAttribute('value')}&TK=`,
                };
                return tmpObj;
            });
            allAdsTec.push(allAds);
        }
        await browser.close();
        return allAdsTec; // ESTE MALDITO RETURN LO TENÍAMOS COMO CONSOLE LOG!!! ERROR!
    } catch (err) {
        console.log(err);
    }
};

module.exports = scrapingTe;
