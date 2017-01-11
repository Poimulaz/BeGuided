/**
 * Created by Pierre on 30/11/2016.
 */
'use strict';


const models  = require('../models');
const session = require('express-session');

var Users = {
    index: function (req, res) {
        models
            .User
            .findAll()
            .then(function (users) {
                if(req.session.id_user){
                    models.User.find({
                        where: {
                            id: req.session.id_user
                        }
                    }).then(function(user) {
                        res.render('index', {
                            users: users,
                            user: user
                        });
                    });
                }else{
                    res.render('index', {
                        users: users
                    });
                }
            });
    },
    connexion: function (req, res) {
        models.User.find({
           where: {
               name: req.body.name,
               firstname: req.body.firstname,
               password: req.body.password
           }
        }).then(function(user){
            if(user!=null){
                req.session.id_user = user.id;
                req.session.save(function(err) {
                    if(err) throw (err);
                    console.log("save");
                    res.redirect('/users');
                });
            }
            else {
                console.log("null");
                res.redirect('/users/connexion');
            }
        });
    },
    create: function (req, res) {
        var callback1 = new Promise(function(resolve, reject){
            if (req.body.name && req.body.firstname && req.body.password) {
                console.log("well input");
                resolve();
            }
            else {
                reject();
                console.log("error: no input");
                res.redirect('/users/inscription');
            }
        });

        var callback2 = callback1.then(function(data){
            console.log("resolve callback1");
            return new Promise(function (resolve, reject) {
                models.User.find({
                    where: {
                        name: req.body.name,
                        firstname: req.body.firstname
                    }
                }).then(function(user){
                    resolve(user);
                });
            });
        });

        var callback3 = callback2.then(function(user) {
            console.log("resolve callback2");
            return new Promise(function (resolve, reject) {
                if (user != null) {
                    reject();
                    console.log("user already exist");
                    res.redirect('/users/inscription');
                }
                else {
                    console.log("null");
                    resolve();
                }
            });
        });
        callback3.then(function(data){
            console.log("resolve callback3");
            models.User.create({
                name: req.body.name,
                firstname: req.body.firstname,
                password: req.body.password
            }).then(function(){
                console.log({error : null});
            }, function () {
                console.log({error : '1'});
            }).then( function () {
                res.redirect('/users');
            });
        })

    },
    update: function (req, res){
        models.User
            .find({
                where: {
                    id: req.session.id_user
                }
            })
            .then( function (user) {
                user.update({
                    password: (req.body.password)? req.body.password : user.password,
                    name: (req.body.name)? req.body.name : user.name,
                    firstname: (req.body.firstname)? req.body.firstname : user.firstname
                }).then(function(){
                    console.log({error : null});
                }, function () {
                    console.log({error : '1'});
                });
            }).then( function (){
            res.redirect('/users');
        });
    },
    delete: function (req, res) {
        models.User
            .find({
                where: {
                    name: req.body.name,
                    firstname: req.body.firstname
                }
            })
            .then( function (user) {
                user.destroy({
                    where: {},
                    truncate: true
                }).then(function(){
                    console.log({error : null});
                }, function () {
                    console.log({error : '1'});
                });
            }).then( function (){
            res.redirect('/users');
        });
    }
};

module.exports = Users;