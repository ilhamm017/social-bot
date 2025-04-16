const express = require('express')
const router = express.Router()
const controller = require('../controller/accountController')

router.get('/', controller.getAllAccounts)
router.post('/', controller.addAccount)
router.post('/:id/run', controller.runBot)

module.exports = router