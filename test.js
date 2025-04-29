// Bot like facebook 
const puppeteer = require('puppeteer')
async function main() {
    const browser = await puppeteer.launch({
        headless:false
    })
    const page = await browser.newPage()
    await page.goto('https://www.facebook.com/share/p/1YzVk56gPq/')
}

main()