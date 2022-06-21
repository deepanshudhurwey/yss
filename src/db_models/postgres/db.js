
const Sequelize = require("sequelize")
const path = require('path')
const env = require('../../config/env')
var config = require(path.join(__dirname, '../../', 'config', 'config.json'))[env];
var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    {
        host: config.host,
        dialect: "postgres",
        pool: {
            max: 20,
            min: 0,
            acquire: 2000000,
            idle: 1000
        }
    }
);
sequelize
.authenticate()
.then(() => {
    console.log("Pg Connection has been established successfully");
})
.catch((error) => {
    console.error("Unable to connect to the database:", error);
});
const db = {}

sequelize
.sync()
//{alter:true}
.then(() => {
    console.log("sync")
})
.catch((err) => {
    console.log(err);
});

// fs
//     .readdirSync(__dirname)
//     .filter(function (file) {
//         return (file.indexOf(".") !== 0) && (file !== "index.js");
//     })
//     .forEach(function (file) {
//         var model = require(path.join(__dirname, file));(sequelize) 
//         db[model.name] = model;
//     });

// Object
//     .keys(db)
//     .forEach(function (modelName) {
//         /*istanbul ignore next */
//         if ("associate" in db[modelName]) {
//             db[modelName].associate(db);
//         }
//     });

db.Sequelize = sequelize
db.Sequelize = sequelize

db.user_detail = require("./user_details")(sequelize, Sequelize);
db.role_detail = require("./role_details")(sequelize, Sequelize);
db.user_role_mapping = require("./user_role_mapping")(sequelize,Sequelize)
db.login_otp = require("./login_otp")(sequelize,Sequelize)
module.exports = db;