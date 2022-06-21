const Sequelize = require('sequelize')

module.exports = function (sequelize) {

    var books = sequelize.define('books', {

        _id: {
            primaryKey: true,
            type: Sequelize.BIGINT,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        book_link: {
            type: Sequelize.STRING
        }


    },
        {
            freezeTableName: true,
            timestamps: true
        }
        
        
      
    );


return books
}


