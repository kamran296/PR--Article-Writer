const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userdb = require("./model/users");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      // callbackURL: "http://localhost:5000/oauth/google/callback",
      callbackURL: "https://www.internal.cachelabs.io/oauth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userdb.findOne({ googleId: profile.id });
        if (!user) {
          user = new userdb({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          await user.save();
        }
        // console.log(profile, "profile");
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // console.log("Serialize User:", user.id); // Logging for debugging
  done(null, user.id); // Save only the user ID in the session
});

passport.deserializeUser(async (id, done) => {
  // console.log("Deserialize User ID:", id); // Logging for debugging
  try {
    const user = await userdb.findById(id);
    // console.log("User Found:", user); // Logging for debugging
    done(null, user); // Fetch the full user object using the ID
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
