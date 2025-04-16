const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { saveCookies, loadCookies } = require('../utils/sessionManager')

puppeteer.use(StealthPlugin())

async function runInstagramBot(username, sessionPath) {
    const browser = await puppeteer.launch({ headless: true})
    const page = await browser.newPage()
    const urlTarget = 'https://www.instagram.com'
    await page.goto('https://www.instagram.com', { waitUntil: 'networkidle2' })

    await loadCookies(page, sessionPath)
    await page.reload({ waitUntil: 'networkidle2' })

    const isLoggedIn = await page.$('nav')
    if (!isLoggedIn) {
        console.log(`${username} is not logged in`)
        await page.waitForSelector('input[name="username"]', { timeout: 60000})
        await page.waitForTimeout(60000)
        await saveCookies(page, sessionPath)
        console.log(`Session saved for ${username}`)
    } else {
        console.log(`${username} is logged in`)
    }

    await page.goto(urlTarget, { waitUntil: 'networkidle2' })
    await page.waitForSelector('svg[aria-label="Like')
    console.log(`liked`)
    await browser.close()
}

module.exports = {
    runInstagramBot
}