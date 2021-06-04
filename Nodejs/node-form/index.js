'use strict';

const express = require("express");
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser');
const Post = require('./models/Post');

// Config
    //Template Engine
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')

    //Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())

//Routes
        app.get('/', function(req, res){
            Post.all({order: [['id', 'DESC']]}).then(function(posts){
                res.render('home', {posts: posts})
            })
            res.render('home')
        })

        app.get('/reg', function(req, res){
            res.render('form')
        })

        app.post('/add', function(req, res){
            Post.create({
                title: req.body.title,
                content: req.body.content
            }).then(function(){
                res.redirect('/')
            }).catch(function(error){
                res.send("Fail to post: " + error)
            })
        })

        app.get('/delete/:id', function(req, res){
            Post.destroy({where: {'id': req.params.id}}).then(function(){
                res.send("Post successfully deleted!")
            }).catch(function(error){
                res.send("Fail to delete!")
            })
        })




app.listen(8081, function(){
    console.log("Server running in url http://localhost:8081");
});