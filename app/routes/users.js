var express = require('express');
var router = express.Router();


var users = require('../controllers/Users'); // Nous allons récuperer notre controlleur fait précédement

/* GET Récupère la liste des utilisateurs */
router.get('/', users.index);


/* POST Création d'un nouvel utilisateur */
router.get('/inscription', function(req, res, next) {
  res.render('users/inscription', { title: 'Inscription' });
});
router.post('/inscription', users.create);

/* POST Connexion d'un utilisateur */
router.get('/connexion', function(req, res, next){
  res.render('users/connexion', {title: 'Connexion'});
});
router.post('/connexion', users.connexion);

/* PUT Modification d'un utilisateur */
router.get('/update', function(req, res, next) {
  res.render('users/update', { title: 'Update' });
});
router.put('/', users.update);

/* DELETE Suppression d'un utilisateur */
router.get('/delete', function(req, res, next) {
  res.render('users/delete', { title: 'Delete' });
});
router.delete('/', users.delete);


module.exports = router;