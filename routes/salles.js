const express = require('express');
const router = express.Router();


const Salle = require('../models/Salle');





router.post('/',function(req, res, next) {

    Salle.create({
    salleName: req.body.salleName,
    description: req.body.description,
    floor: req.body.floor,
    lat: req.body.lat,
    lon: req.body.lon
  }, function(err, data) {
    if(err) res.status(500).send(err);
    else res.send(data);
  });
});


router.get('/', function(req, res, next) {
  Salle.find({})
  .exec(function(err, data) {
    if(err) res.status(500).send(err);
    else res.send(data);
  })
});


router.delete('/deletSalle/:id', function(req,res) {
  var id = req.params.id;
  Salle.findOneAndRemove({_id: id}, function(err) {
    if(err) {
      console.log(err);
      return res.status(500).send();
    }
    return res.status(200).send();
    
  });
});

router.post('/addComment/:salleName/commentId/:cid',function(req, res){
  const c =  req.params.salleName 
    Salle.findOne(  {"salleName" : c},function(err, post){
        if(err){
            return console.log(err)
        }
        post.comments.push(req.params.cid)
        post.save(function(err, editesalle){
            if(err){
                return console.log(err)
            }
            console.log(editesalle.comments.length);
            console.log(req.params.cid)
            return res.json("post");
        })
    })
});

router.get('/:salleName',function(req,res){

  const c =  req.params.salleName 
  Salle.findOne({"salleName" : c })
  .populate('comments')
  .exec(function(err, data) {
    if(err) res.status(500).send(err);
    else res.send(data);
  })
}
)

module.exports = router;