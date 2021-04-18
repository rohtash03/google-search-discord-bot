const puppeteer = require('puppeteer');
const {
    googleSearch: { url }
} = require('../../../config/config.js');

const {
    GOOGLE_SEARCH_RESULTS: { RESULTS_LIMIT },
    RESPONSE_CODES,
} = require('../../../utils/constant');

const {
    saveSearchHistroy,
} = require('../../searchHistory/searchHistoryHelper/searchHistory.helper');

/**
 * @description Search query text on google and return results
 */
const customGoogleSearch = async ({ params: query, authorId }) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.type('input[name="q"]', query);
        await page.$eval('input[name=btnK]', button => button.click());
        await page.waitForSelector('div[id=search]');

        let searchResults = await page.$$eval('div[class=hlcw0c]', results => {
            let data = [];
            results.forEach(parent => {
                //Check if parent has h2 with text 'Web Results'
                const ele = parent.querySelector('h2');
                //If element with 'Web Results' Title is not found  then continue to next element
                if (ele === null) {
                    return;
                }
                //Check if parent contains 1 div with class 'g' or contains many but nested in div with class 'srg'
                let gCount = parent.querySelectorAll('div[class=g]');
                //If there is no div with class 'g' that means there must be a group of 'g's in class 'srg'
                if (gCount.length === 0) {
                    //Targets all the divs with class 'g' stored in div with class 'srg'
                    gCount = parent.querySelectorAll('div[class=srg] > div[class=g]');
                }
                //Iterate over all the divs with class 'g'
                gCount.forEach(result => {
                    //Target the title
                    const title = result.querySelector('div[class=tF2Cxc] > div[class=yuRUbf] > a >  h3').innerText;
                    //Target the url
                    const url = result.querySelector('div[class=tF2Cxc] > div[class=yuRUbf] > a').href;
                    //Add to the return Array
                    data.push({ title, url });
                });
            });
            return data;
        });
        await browser.close();
        searchResults = searchResults.slice(0, RESULTS_LIMIT);
        let replyText = '';
        let statusCode = RESPONSE_CODES.SUCCESS;
        if (searchResults.length) {
            await saveSearchHistroy({ authorId, searchQuery: query });
            replyText = `Top ${searchResults.length} google search results\n\n`;
        }
        searchResults.forEach((search, index) => {
            replyText = replyText + `${index+1}. ${search.url} \n`;
        });

        if (!replyText) {
            replyText = 'No results found';
            statusCode = RESPONSE_CODES.NOT_FOUND;
        }
        return { replyText, status: statusCode };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    customGoogleSearch,
}
