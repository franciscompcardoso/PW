const bCrypt = require('bcrypt-nodejs');
const jsonMessagesPath = __dirname + "/../../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");


module.exports = function(passport, user) {
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(function(user, done) {
      done(null, user.id);

    });



    //verificar se o modelo user existe

    passport.deserializeUser(function(id, done) {


        User.findOne({ where: {id: id} }).then(function(user) {
          if (user) {
            done(null, user.get());
          }
          else {
            done(user.errors, null);
          }
        });
      });
      passport.use('local-signup', new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true
      },

    //RECEBE OS DADOS ENVIADOS PELO FORMULÁRIO

    function(req, email, password, done) {
        const generateHash = function(password){
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        User.findOne({ where: {email: email} }).then(function(user){
            if (user) {
                return done(null, false, jsonMessages.user.duplicate);
            }
            else{
                const userPassword = generateHash(password);
                const data = {
                    email: email,
                    password: userPassword,
                    nome: req.body.nome,
                    apelido: req.body.apelido,
                };
                User.create(data).then(function(newUser, created){
                    if(!newUser){
                        return done(null, false);
                    }
                    if(newUser) {
                        return done(null, newUser);
                    }
                });
            }
        });
    }
));
    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },


        function(req, email, password, done) {

            var User = user;
            var isValidPassword = function(userpass, password) {
                 
              return bCrypt.compareSync(password, userpass);
      
            }
            User.findOne({ where: { email: email } }).then(function(user) {
              if (!user) {
                return done(null, false, jsonMessages.user.email);
              }
              if (!isValidPassword(user.password, password)) {
                return done(null, false, jsonMessages.user.password);
              }
              var userinfo = user.get();
              return done(null, userinfo);
            }).catch(function(err) {
              console.log("Error:", err);
              return done(null, false,  jsonMessages.user.error);
            });
          }
    ));        
}