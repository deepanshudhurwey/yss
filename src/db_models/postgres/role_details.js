const Sequelize = require('sequelize')
module.exports = function (sequelize) {
    var role_details = sequelize.define('role_details', {
        role_id: {
            primaryKey: true,
            type: Sequelize.BIGINT,
            autoIncrement: true
        },
        role_name: {
            type: Sequelize.STRING
        },
    },
        {
            freezeTableName: true,
            timestamps: true
        }
    )

 

    return role_details
}
