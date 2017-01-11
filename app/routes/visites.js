/**
 * Created by Pierre on 04/01/2017.
 */
var express = require('express');
var router = express.Router();


var visites = require('../controllers/Visites'); // Nous allons récuperer notre controlleur fait précédement

/* GET Récupère la liste des visites */
router.get('/', visites.index);

/* POST Création d'une nouvelle visite */
router.get('/creation', function(req, res, next) {
    res.render('visites/creation', { title: 'Creation' });
});
router.post('/creation', visites.create);

/* POST Lire une visite */
router.post('/', visites.read);

/* PUT Modification d'une visite */
router.get('/update', function(req, res, next) {
    res.render('visites/update', { title: 'Update' });
});
router.put('/', visites.update);

/* DELETE Suppression d'une visite */
router.get('/delete', function(req, res, next) {
    res.render('visites/delete', { title: 'Delete' });
});
router.delete('/', visites.delete);

module.exports = router;