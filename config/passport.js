const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

//get token from cookie
const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) token = req.cookies["jwt"];
  //console.log("cookie", token);
  return token;
};

module.exports = password => {
  const opts = {};
  opts.jwtFromRequest = cookieExtractor;
  opts.secretOrKey = keys.secretOrKey;

  password.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log("jwt_payload", jwt_payload);
      User.findById(jwt_payload.uid)
        .then(user => {
          if (user) {
            //add expired date from token
            user["exp"] = jwt_payload.exp;
            return done(null, user);
          } else {
            return done(null, false);
            // or you could create a new account
          }
        })
        .catch(err => {
          console.log(err);
          return done(err, false);
        });
    })
  );
};
