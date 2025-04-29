// Bot mengumpulkan Trends dari website tempo
const puppeteer = require('puppeteer')
async function main() {
    const browser = await puppeteer.launch({
        headless:true
    })
    const page = await browser.newPage()
    await page.goto('https://www.tempo.co', {waitUntil: 'networkidle2'})
    await page.waitForSelector('div[class="w-full my-6 lg:hidden"]')
    const hashtag = await page.$$eval('div[class="w-full my-6 lg:hidden"] ul li a', links => 
        links.map(link => link.textContent.trim())
    )
    console.log('Trending hashtag')
    hashtag.forEach((tag, index) => {
        console.log(`${index+1}.${tag}`)
    })

    await browser.close()
}

main()