// Mendapatkan data trends twitter/X 
const puppeteer = require('puppeteer')
const { connectDB } = require('../../../db')
const twitter = require('../../../models/twitterTrendings')

let browser = null
let data = null
let error = null
async function getTrends() {
    try {
        browser = await puppeteer.launch({
            headless: false,
            timeout: 120000
        })
        const page = await browser.newPage()
        await page.goto('https://trends24.in/indonesia/', {
            waitUntil: 'networkidle2'
        })
        await page.waitForSelector('div[class="tab-link-list"] [id="tab-link-table"][type="button"]')
        await page.click('div[class="tab-link-list"] [id="tab-link-table"][type="button"]')
        await page.waitForSelector('div[class="table-container"] [class="list"]')
        data = await page.$$eval('div[class="table-container"] [class="list"] tr', rows => {
            return rows.map(row => {
              const rank = row.querySelector('.rank')?.textContent.trim() || '';
              const topic = row.querySelector('.topic a')?.textContent.trim() || '';
              const url = row.querySelector('.topic a')?.href || '';
              const position = row.querySelector('.position')?.textContent.trim() || '';
              const count = parseInt(row.querySelector('.count')?.getAttribute('data-count') || '0', 10);
              const duration = row.querySelector('.duration')?.textContent.trim() || '';
        
              return { rank, topic, url, position, count, duration };
            }).filter(item => item.count > 1000);
          });
        
    } catch (err) {
        error = err
        console.log(err)
    } finally {
        if (browser) {
            await browser.close();
        }
        if (!error) {
            await twitter.deleteMany({})
            await twitter.insertMany(data)
        }
    }
}

(async () => {
    await connectDB();
    await getTrends();
  
    // Schedule setiap 12 jam
    setInterval(getTrends, 12 * 60 * 60 * 1000);
  })();