const mongoose = require('mongoose')

const URI = 'mongodb+srv://Thouka:7NWiOL3unV1pc6E8@cluster0.fsb3bd0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

module.exports = {
    connectDB : async () => {
        try {
            await mongoose.connect(URI, {
                useNewUrlParser: true,
            })
            console.log('mongodb connect ...')
        } catch (error) {
            console.error(`mongodb error: ${error.message}`)
            process.exit(1)
        }
    }
}