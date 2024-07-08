const express = require("express");
const router = express.Router();
const passport = require("passport");
const clientURL = "https://www.internal.cachelabs.io/";

// initial google ouath login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://www.internal.cachelabs.io/",
    failureRedirect: "https://www.internal.cachelabs.io/login",
  })
);

router.get("/login/success", async (req, res) => {
  console.log(req.isAuthenticated(), 34);
  if (req.isAuthenticated()) {
    res.status(200).json({ message: "user Login", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});

router.get("/logout", (req, res) => {
  console.log("logout");
  req.logout((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    req.session = null; // Clear the session

    res.redirect(clientURL);
  });
});

router.get("/profile", (req, res) => {
  // console.log(req.cookies, 123);
  // console.log(req.session, "session");
  // console.log(req.isAuthenticated(), 123);
  // console.log("user", req.user);
  if (req.isAuthenticated()) {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }
});

module.exports = router;
