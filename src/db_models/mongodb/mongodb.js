const mongoose = require('mongoose' )
const path = require('path')
const env = require('../../config/env')
const config = require('../../config/config.json')[env]
//var config = require(path.join(__dirname, '../../', 'config', 'config.json'))[env];
mongoose.connect(config.MongodbAPI,{useNewUrlParser:true},{ useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('mongo database connected'))
module.exports = db;