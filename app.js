const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require("body-parser");

const cors = require('cors');

require('dotenv/config');

//Middleware
app.use(cors());
app.use(bodyParser.json());


//Importer les routes
const postsRoute = require('./routes/posts');
app.use('/posts',postsRoute);
//ROUTES
app.get('/', (req, res) =>{
    res.send("Page d'accueil");
})



//Connection à la base de donnée
mongoose.connect(process.env.DB_CONNECTION,
 { useNewUrlParser: true , useUnifiedTopology: true},
   ()=> {
    console.log('connecté à la base de donnée');
})
app.listen(3000);
