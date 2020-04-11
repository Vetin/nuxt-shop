const { Strategy, ExtractJwt } = require("passport-jwt");
// const User = require("../models/user.model");
const keys = require("../keys");

// Authorization
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT,
};

module.exports = new Strategy(options, async (payload, done) => {
  try {
    const pretender = await User.findById(payload.userId).select("id");

    if (pretender) {
      done(null, pretender);
    } else {
      done(null, false);
    }
  } catch (error) {
    console.log(error);
  }
});
