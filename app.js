const express = require('express'),
    app = express(),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
app.set('view engine', 'ejs')
mongoose.connect("mongodb://localhost/pup_app");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    date: {
        type: Date,
        default: Date.now
    }
});
let Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: 'First Blog Post',
//     image: 'https://bit.ly/2BxyKFb',
//     body: 'Hi there this is the first blog post hueheuhuhe'
// })
app.get('/', function(req, res){
     res.redirect('/blogs');
})
app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log('error line 31')
        }else{
            res.render('index', {blogs:blogs});
        }
    })
    
});
app.get('/blogs/new', function(req, res){
    res.render('new');
});
app.post('/blogs', function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log('line 44 error')
        } else {
             res.redirect('/');
        }
    })
});
app.get('/blogs/:id', function(req, res){  
    Blog.findById(req.params.id, function(err, showBlog){
        if(err){
            console.log('error line 53');
        }else{
            res.render('show', {blogs:showBlog});
        }
    });
});

app.get('/blogs/:id/edit', function(req, res){
    Blog.findById(req.params.id, function(err, editBlog){
        if(err){

        }else{
            res.render('edit', {blog: editBlog});
        }
    })
});
app.put('/blogs/:id', function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){

        }else{
             res.redirect('/blogs/'+ req.params.id);
        }
    })
})





app.listen(3000, function(){
    console.log('PUPCAMP LIVE')
})