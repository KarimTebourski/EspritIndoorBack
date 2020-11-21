Contact = require('../models/User');
exports.one = function (req, res) {

    Contact.findById({ _id: req.params._id }, function (err, contact) {

        if (err)
            res.json(err);
        else
            res.json(contact);

        //    console.log("*******", contact.Demande.length);

    });

};
exports.demande = function (req, res) {
    // id_user il bich yab3ith il demande
    Contact.findById({ _id: req.params.id_amis }, function (err, contact) {

        if (err)
            res.json(err);
        else {

            contact.Demande.push(req.body.id_user)


            contact.Nbr = contact.Demande.length;

            // console.log("*******", contact.Demande.length);
        }


        contact.save(function (err) {
            res.json(contact);
        });

    });

};


exports.ok = function (req, res) {
    // id_user = il fil sassion il 3idou il demande ;
    Contact.findById({ _id: req.params.id_user }, function (err, contact, next) {

        if (err)
            res.json(err);
        else {
            contact.Demande.pull(req.body.id_demande);
            // console.log(contact.Demande);
            contact.friend.push(req.body.id_demande);//il demande feha il id imta3 il user il iba3th il demande
            contact.Nbr = contact.Demande.length;


            //console.log("demande remove");
        }


        contact.save(function (err) {
            // res.json(contact);
            console.log("demande remove -> amis ajouter");
        });

    });

    ida = req.body.id_demande;//il user il ba3th demande
    c = req.params.id_user;// il user  il accepte il demande
    Contact.findById({ _id: req.body.id_demande }, function (err, contact, next) {

        if (err)
            res.json(err);
        else {
            //console.log(ida);
            contact.friend.push(c);
            // contact.Demande.pull(c)
            //contact.Nbr = contact.Demande.length;


        }
        contact.save(function (err) {
            console.log("yes ->demaande accepter");

        });


    });
    res.json("ok");
};

exports.remove = function (req, res) {
    //console.log("*******");

    Contact.findById({ _id: req.params.id_user }, function (err, contact) {
        //  console.log("*******", contact.Demande);
        if (err)
            res.json(err);
        else {
            contact.Demande.pull(req.body.id_demande)/// demande fah il user il ib3ath
            contact.Nbr = contact.Demande.length;

            // console.log("*******", contact.Demande);
        }


        contact.save(function (err) {
            // console.log("user not accepted")
            res.json("user not accepted");
        });

    });

};
