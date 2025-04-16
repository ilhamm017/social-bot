const fs = require('fs')

function saveCookies(page, path) {
    return page.cookies().then((cookies) =>{
        fs.writeFileSync(path, JSON.stringify(cookies, null, 2))
    })
}

async function loadCookies(page, path) {
    if (fs.existsSync(path)) {
        const cookies = JSON.parse(fs.readFileSync(path))
        await page.setCookie(...cookies)
    }
}

module.exports = {
    saveCookies,
    loadCookies
}