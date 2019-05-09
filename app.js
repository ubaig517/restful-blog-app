var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  port = process.env.PORT || 3000;

// App Config
mongoose.connect("mongodb://localhost/blog_app", {
  useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Blog Model Config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "First day of ramadan",
//   image:
//     "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?cs=srgb&dl=biriyani-chicken-cooked-1624487.jpg&fm=jpg",
//   body:
//     "TOday is my first fast of Ramadan and I am not going to lie it was kinda tough because I was sleepy!"
// });

// RESTful Routes
app.get("/", function(req, res) {
  res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req, res) {
  //create blog
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});

// Port Config
app.listen(port, function() {
  console.log("The Blog App Server Has Started!");
});
