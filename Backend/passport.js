// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const OAuth2Strategy = require("passport-google-oauth2").Strategy;
// const userdb = require("./model/users");
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "http://127.0.0.1:5000/oauth/google/callback",
//       scope: ["profile", "email"],
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // const email = profile.emails[0].value;
//       // const domain = email.split("@")[1];

//       // if (domain !== "saimanshetty.com") {
//       //   return done(null, false, { message: "Unauthorized domain" });
//       // }

//       // // Store user info in session
//       // const user = {
//       //   googleId: profile.id,
//       //   displayName: profile.displayName,
//       //   email: email,
//       // };

//       return done(null, profile);
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// passport.use(
//   new OAuth2Strategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "/oauth",
//       scope: ["profile", "email"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       console.log(profile);
//       try {
//         let user = await userdb.findOne({ googleId: profile.id });

//         if (!user) {
//           user = new userdb({
//             googleId: profile.id,
//             displayName: profile.displayName,
//             email: profile.emails[0].value,
//             image: profile.photos[0].value,
//           });

//           await user.save();
//           req.session.user = {
//             user,
//           };
//         }

//         console.log("user", user);
//         return done(null, profile);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   console.log("SErialize", user.id);
//   done(null, user);
// });

// passport.deserializeUser(async (user, done) => {
//   try {
//     // const user = await userdb.findById(id);
//     console.log("deserialize", user);
//     done(null, user);
//   } catch (error) {
//     console.log(error);
//   }
// });

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
