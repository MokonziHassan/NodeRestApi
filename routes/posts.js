const express = require('express');
const { restart } = require('nodemon');
const Post = require('../models/Post')

const router = express.Router();


//Obtenir tous les posts
router.get('/', async (req, res) =>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message : err});
    }
});

//Envoyer un post
router.post('/', async (req, res)=>{
   const post = new Post({
       title : req.body.title,
       description : req.body.description
   });

   try{
    const SavedPost = await post.save();
   res.json(SavedPost);
   }
   catch(err){
    res.json({message : err});
   }
   
})

//Obtenir un post spécifique
router.get('/:postId', async (req,res)=>{
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }
    catch(err){
        res.json({message : err});
    }
    
})

//Supprimer un post
router.delete('/:postId', async (req, res) =>{
    try{
       const removedPost = await  Post.remove({_id : req.params.postId});
       res.json(removedPost);
    }catch(err){
        res.json({message: err});
    }
})

//Mettre à jour un post
router.patch('/:postId', async (req, res) =>{
    try{
        const updatedPost = await Post.updateOne({_id : req.params.postId}, 
            {$set : {title : req.body.title}});
        res.json(updatedPost);
    }
    catch(err){
        res.json({message: err});
    }
    
})
module.exports = router;