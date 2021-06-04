'use strict';

const db = require('./db');

const Post = db.sequelize.define('posts', {
    title: {
        type: db.Sequelize.STRING
    },

    content: {
        type: db.Sequelize.TEXT
    }
})

//Create table
//Post.sync({force: true})

module.exports = Post