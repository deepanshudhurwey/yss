const { STRING } = require('sequelize')
const Sequelize = require('sequelize')
module.exports = function (sequelize) {
    var user_details = sequelize.define('user_details', {
        user_id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        first_name: STRING,
        last_name:STRING,
        email_id:STRING,
        google_id:STRING,
        facebook_id:STRING,
        mobile_number:{
            type: Sequelize.BIGINT
        },
        date_of_birth:{
            type: Sequelize.DATE
        },
        Gender :{
            type: Sequelize.STRING
        },
        sevadhari :{
            type: Sequelize.BOOLEAN
        },
        sevadhari_code:{
            type: Sequelize.STRING,
            defaultValue: "Self",
        }
    },
        {
            freezeTableName: true,
            timestamps: true
        }
    )

 

    return user_details
}
