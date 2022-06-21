const Sequelize = require('sequelize')

module.exports = function (sequelize) {

    var videos = sequelize.define('videos', {

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
        video_link: {
            type: Sequelize.STRING
        }


    },
        {
            freezeTableName: true,
            timestamps: true
        }
        
        
      
    );


return videos
}


