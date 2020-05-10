var express = require("express");
var router = express.Router();

// importing burger.js database function

var burger = require("../models/burger.js");

// create all routes and set  up logic within the routes
// router.get("/", function(req, res){
//     burger.all(function(data){
//         var hbsObject = {
//             burgers: data
//         };
//         console.log(hbsObject);
//         res.render("index", hbsObject)
//     });

// });
// router.post("/", function(req, res){
//     burger.create([
//         "burger_name", "devoured"
//     ],[
//         req.body.burger_name, req.body.devoured
//     ], function(){
//         res.redirect("/");
      
//     });
// });

// router.put("/:id", function(req, res){
//     var condition = "id =" + req.params.id;
//     console.log("condition", condition);

//     burger.update({
//         devoured: req.body.devoured
//     }, condition, function(){
//         res.redirect("/");
//     });
//     });
//   router.delete("/:id", function(req, res){
//       var condition = "id = " + req.params.id;

//       burger.delete(condition, function(){
//           res.redirect("/");
//       });
//   });

// //   export routes for server.js
// module.exports = router;

// get route -> index
router.get("/", function(req, res) {
    res.redirect("/burgers");
  });
  router.get("/burgers", function(req, res) {
    // express callback response by calling burger.selectAllBurger
    burger.all(function(burgerData) {
      // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
      res.render("index", { burger_data: burgerData });
    });
  });
  // post route -> back to index
  router.post("/burgers/create", function(req, res) {
    // takes the request object using it as input for burger.addBurger
    burger.create(req.body.burger_name, function(result) {
      // wrapper for orm.js that using MySQL insert callback will return a log to console,
      // render back to index with handle
      console.log(result);
      res.redirect("/");
    });
  });
  // put route -> back to index==================
  router.put("/burgers/:id", function(req, res) {
    burger.update(req.params.id, function(result) {
      // wrapper for orm.js that using MySQL update callback will return a log to console,
      // render back to index with handle
      console.log(result);
      // Send back response and let page reload from .then in Ajax
      res.sendStatus(200);
    });
  });
  module.exports = router;
