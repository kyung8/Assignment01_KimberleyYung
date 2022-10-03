var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get("/aboutme", function (req, res, next) {
  res.render("aboutme", { title: 'About Me' });
});

router.get("/project", function (req, res, next) {
  res.render("project", { title: 'Projects' });
});

router.get("/service", function (req, res, next) {
  res.render("service", { title: 'Services' });
});

router.get("/contact", function (req, res, next) {
  res.render("contact", { title: 'Contact' });
});

module.exports = router;
