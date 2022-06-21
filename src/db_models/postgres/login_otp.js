const Sequelize = require('sequelize')
module.exports = function (sequelize) {
    var login_otp = sequelize.define('login_otp', {
        otp_id: {
            primaryKey: true,
            type: Sequelize.BIGINT,
            autoIncrement: true
        },
        otp: {
            type: Sequelize.BIGINT
        },
        expire_in :{
            type: Sequelize.TIME
        },

        user_mail: {
            type: Sequelize.STRING
        },
        user_mobile: {
            type: Sequelize.STRING
        },
    },
        {
            freezeTableName: true,
            timestamps: true
        }
    )

 

    return login_otp
}
