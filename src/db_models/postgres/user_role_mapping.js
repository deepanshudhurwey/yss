const Sequelize = require('sequelize')

module.exports = function (sequelize) {

    var user_role_mapping = sequelize.define('user_role_mapping', {

        user_role_id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        user_id:{
            type: Sequelize.INTEGER
        },
        role_id :{
            type: Sequelize.INTEGER
        }
    },
        {
            freezeTableName: true,
            timestamps: true
        }
    )

    user_role_mapping.associate = (models) => {
        user_role_mapping.belongsTo(models.user_details, {
            foreignKey: 'user_id', targetKey: 'user_id'
        });
        user_role_mapping.belongsTo(models.role_details, {
            foreignKey: 'role_id', targetKey: 'role_id'
        });
    }
    return user_role_mapping
}

