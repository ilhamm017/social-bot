const {runInstagramBot} = require('./bots/instagramBot')

const Account = require('./model/Account')
const sequelize = require('./config/database')

(async() => {
    const id = process.argv[2]
    await sequelize.sync()
    const account = await Account.findByPk(id)

    if (!account) {
        console.log(`account not found`)
        process.exit(1)
    }

    await runInstagramBot(account)
})()