/**
 * Created by Pierre on 04/01/2017.
 */
'use strict';

const models  = require('../models');
const session = require('express-session');

var Users = {
    index: function(req,res){
        models
            .Visite
            .findAll()
            .then(function (visites) {
                res.render('visites/index', {
                    visites: visites
                });
            });
    },
    create: function(req,res){
        var callback1 = new Promise(function(resolve, reject){
            if(req.body.name && req.body.description) {
                console.log("well input");
                resolve();
            }
            else{
                reject();
                console.log("error: no input");
                res.redirect('/visites/creation');
            }
        });

        var callback2 = callback1.then(function(data){
            console.log("resolve callback1");
            return new Promise(function(resolve, reject){
                models.Visite.find({
                    where: {
                        name: req.body.name,
                        user_id: req.session.id_user
                    }
                }).then(function(visite){
                    resolve(visite);
                })
            });
        });

        var callback3 = callback2.then(function(visite){
            console.log("resolve callback2");
            return new Promise(function(resolve, reject){
                console.log(visite);
                if(visite!=null){
                    reject();
                    console.log("You have already post a visit with this name");
                    res.redirect('/visites/creation');
                }
                else
                    console.log("null");
                    resolve();
            });
        });

        callback3.then(function(data){
            models.Visite.create({
                name: req.body.name,
                description: req.body.description,
                user_id: req.session.id_user
            }).then(function(){
                console.log({error : null});
            }, function () {
                console.log({error : '1'});
            }).then( function () {
                res.redirect('/visites');
            });
        });
    },
    read: function (req, res) {
        models.Visite.find({
            where: {
                name: req.body.name,
                user_id: req.session.id_user
            }
        }).then(function(visite){
            if(visite!=null){
                req.session.id_visite = visite.id;
                req.session.save(function(err) {
                    if(err) throw (err);
                    console.log("save");
                    res.render('visites/details', {
                        title: 'Details',
                        visite : visite
                    });

                });
            }
            else {
                console.log("null");
                res.redirect('/visites');
            }
        });
    },
    update: function(req, res){
        models.Visite
            .find({
                where: {
                    id: req.session.id_visite
                }
            })
            .then( function (visite) {
                visite.update({
                    description: (req.body.description)? req.body.description : visite.description,
                    name: (req.body.name)? req.body.name : visite.name
                }).then(function(){
                    console.log({error : null});
                }, function () {
                    console.log({error : '1'});
                });
            }).then( function (){
            res.redirect('/visites');
        });
    },
    delete: function(req, res) {
        var callback1 = new Promise(function (resolve, reject) {
            if (req.body.name) {
                console.log("well input");
                resolve();
            }
            else {
                reject();
                console.log("error: no input");
                res.redirect('/visites/delete');
            }
        });

        var callback2 = callback1.then(function(data){
            new Promise(function(resolve, reject) {
                models.Visite.find({
                    where: {
                        name: req.body.name,
                        user_id: req.session.id_user
                    }
                }).then(function (visite) {
                    if (visite) {
                        console.log(visite);
                        resolve(visite);
                    } else {
                        reject();
                        res.redirect('/visite/delete');
                    }
                })
            });
        });

        callback2.then(function (visite) {
            console.log('callback2 resolve' + visite);
            visite.destroy({
                where: {},
                truncate: true
            }).then(function () {
                console.log({error: null});
            }, function () {
                console.log({error: '1'});
            }).then(function () {
                res.redirect('/visites');
            });
        });
    }
};

module.exports = Users;