// Initialize express router
const express = require('express');
const router = express.Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
////karim
// Import contact controller
var contactController = require('../routes/userwalid');
// Import multer 
const multer = require('../middleware/multer-config');
router.route('/karim/')
    .post(contactController.addusertest);
router.route('/karim/showlist')
    .get(contactController.getshowlist);
router.route('/karim/showevent/:id')
    .get(contactController.getshoweventbyiduser);
router.route('/karim/favoris/:id/event/:fid')
    .post(contactController.postaddfovritevent);
router.route('/karim/delete/:id/favEvent/:fid')
    .get(contactController.getdeleteevent);

/// route demande
var demandeController = require('../routes/demandeCtrl');
router.route('/amis/getdemande/:_id')
    .get(demandeController.one);
router.route('/amis/envoyer/:id_amis')
    .post(demandeController.demande);
router.route('/amis/accept/:id_user')
    .put(demandeController.ok);
router.route('/amis/remove/:id_user')
    .put(demandeController.remove);



router.route('/saisson/:email')
    .get(contactController.saisson);

////
// Contact routes

router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);

router.route('/contacts/:Token')
    .get(contactController.etat);

router.route('/login/:email/:password')
    .get(contactController.login);

router.route('/friend/:_id')
    .get(contactController.one)
    .post(contactController.friend);

router.route('/friends/:_id')
    .put(contactController.delete);

router.route('/profil/:_id')
    .post(multer, contactController.profil)
    .delete(multer, contactController.Remove);

router.route('/imageProfil/:_id/:image')
    .get(multer, contactController.profilimage)

router.route('/imagebackground/:_id/:image')
    .get(multer, contactController.background)

    router.route('/profiluser/:_id')
    .post(multer, contactController.userprofil)



// Export API routes
module.exports = router;