const { Datatypes } = require('sequelize')
const sequelize = require('../config/database')

const Account = sequelize.define('Account', {
    platform: {
        type: Datatypes.STRING,
        allowNull: false
    },
    username: {
        type: Datatypes.STRING,
        allowNull: false
    },
    sessionPath: {
        type: Datatypes.STRING,
        allowNull: false
    },
    proxy: {
        type: Datatypes.STRING,
        allowNull: true
    }
})

module.exports = Account