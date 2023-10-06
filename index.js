const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

const path = require('path');

const app = express();


const Posts =  require('./Posts.js');

mongoose.connect('mongodb+srv://news1:UMbWA9lVxRGcP5k8@cluster0.jfoznti.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}).then(function(){
  console.log('conectado com sucesso');
}).catch(function(err){
  console.log(err.message);
})

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));


app.get('/', (req, res) => {
  if (req.query.busca == null) {
    Posts.find({}).sort({"_id": -1}).exec(function(err,posts){
      console.log(posts[0]);
      res.render('home',{posts:posts});
    })

  }
app.get('/:slug',(req,res)=>{
    //res.send(req.params.slug);
    Posts.findOneAndUpdate({slug: req.params.slug}, {$inc : {views: 1}}, {new: true}, function(err,resposta){
        console.log(resposta)
        res.render('single',{});
    })
    
})



app.listen(5000,()=>{
    console.log('server rodando!');
})