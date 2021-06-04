/*'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize('sql_database', 'root', 'mysql', {
    host: "localhost",
    dialect: 'mysql'
});

sequelize.authenticate().then(function(){
    console.log("Conected successfully!")
}).catch(function(erro){
    console.log("Fail to connect: "+erro)
})

const Posts = sequelize.define('posts', {
    title: {
        type: Sequelize.STRING
    },

    content: {
        type: Sequelize.TEXT
    }
})

//Create table
//Posts.sync({force: true})

const User = sequelize.define('users', {
    name: {
        type: Sequelize.STRING
    },

    lastname: {
        type: Sequelize.STRING
    },

    age: {
        type: Sequelize.INTEGER
    },

    email: {
        type: Sequelize.STRING
    }
})

//Create table
//User.sync({force: true})*/