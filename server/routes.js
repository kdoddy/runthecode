var Users = require('../database/database-index.js').Users
var runThis = require('../coderunner/coderunner.js').runThis;

///////// PASSPORT ROUTES /////////

var passportRoutes = function(app, passport) {
  //Sign up routes
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/signupSuccess',
    failureRedirect: '/signupFailure',
    failureFlash: true,
    successFlash: true
  }));
  app.get('/signupSuccess', function(req, res) {
    res.send(req.flash('User'));
  });
  app.get('/signupFailure', function(req, res) {
    res.send({message: req.flash('signupMessage')});
  });

  //Login routes
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure',
    failureFlash: true,
    successFlash: true
  }));
  app.get('/loginSuccess', function(req, res) {
    res.send(req.flash('User'));
  });
  app.get('/loginFailure', function(req, res) {
    res.send({message: req.flash('loginMessage')});
  });

  //Logout route
  app.get('/logout', function(req, res) {
    req.logout();
    res.end('Logged out successfully');
  });
}

/////// CHALLENGE ROUTES ///////

var challengeRoutes = function(app) {
  //Challenge solution submission routes
  app.post("/challengeSolution", function(req, res) {
    var codeResult = runThis(req.body.currentUserSolutionCode);
    console.log(codeResult);
    res.end(JSON.stringify(codeResult));
    /* 
    example of vm.run: 
      console.log(runThis('var testFunc = function(x, y) {var result = x + y; return result}; testFunc(3,4)'));
    */
   ////
  })
}

////// HABIB DB ROUTES //////

var dbRoutes = function(app) {
  app.post("/createUser", function(req, res) {
    console.log("heard posted user from app, and the posted user is ", req.body);
    db.addUser(req.body);
  })
  
  app.post("/createChallenge", function(req, res) {
    console.log("heard posted challenge from app, and the posted challenge is ", req.body);
    db.addChallenge(req.body);
  })
  
  app.post("/addSolution", function(req, res) {
    console.log("heard posted solution from app, and the posted solution is ", req.body);
    db.addSolution(req.body, "testUser1", "testChallenge1");
  })
  
  app.get("/populatedUser", function(req, res) {
    db.getPopulatedUser("testUser1")
      .then(function(results) {console.log("in server-index, get route, the results from the populatedUser are ", results)});
  })
  
  app.get("/populatedChallenge", function(req, res) {
    db.getPopulatedChallenge("testChallenge1")
      .then(function(results) {console.log("in server-index, get route, the results from the populatedChallenge are ", results)});
  })
}

module.exports.passportRoutes = passportRoutes;
module.exports.challengeRoutes = challengeRoutes;
module.exports.dbRoutes = dbRoutes;