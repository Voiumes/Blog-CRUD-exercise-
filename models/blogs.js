const mongoose = require('mongoose');
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

Blog.create({
    title: 'Test Blog',
    image: 'https://bit.ly/2BxyKFb',
    body: '+=========================+'
},function(err, blog){
    if(err){

    }else{
        console.log('added test blog!')
        console.log(blog)
    }
})

module.exports = Blog;