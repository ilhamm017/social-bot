const { exec } = require('child_process')
const path = require('path')
const Account = require('../model/Account')

exports.getAllAccounts = async (req, res) => {
    const accounts = await Account.findAll()
    res.json(accounts)
}

exports.addAccount = async (req, res) => {
    const { platform, username, sessionPath, proxy} = req.body
    const newAccount = await Account.create({
        platform,
        username,
        sessionPath,
        proxy
    })
    res.json(newAccount)
}

exports.runBot = async (req, res) => {
    const { id } = req.params
    const account = await Account.findByPk(id)
    
    if (!account) {
        return res.status(404).json({ message: 'Account not found' })
    }

    const botPath = path.join(__dirname, '../../run-bot.js')
    const command = `node ${botPath} ${id}`

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return res.status(500).json({ message: 'Error running bot' })
        }
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
        res.json({ message: 'Bot is running' })
    })
}