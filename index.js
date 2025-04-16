const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const accountRoutes = require('./routes/account');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/accounts', accountRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
})