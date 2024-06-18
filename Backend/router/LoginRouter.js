const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
const path = require('path');

const app = express();

// Use CORS to allow requests from the frontend
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'bG9uZyBzZWN1cmUgc2VjdmV0IGtleSD3aXRoIGhpZ2kgZW50cm9weQ==', // Replace with your generated secret key
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Placeholder for users
const users = [];

// Configure Passport to use Google OAuth 2.0
passport.use(new GoogleStrategy({
    clientID: '96957487173-gtjskug186me7oe2pcvrmg2s25m6aa2c.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, (token, tokenSecret, profile, done) => {
    // Find or create user
    let user = users.find(u => u.id === profile.id);
    if (!user) {
        user = {
            id: profile.id,
            displayName: profile.displayName,
            emails: profile.emails
        };
        users.push(user);
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

// Authentication Middleware
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Additional route to fetch user data
app.get('/user', isAuthenticated, (req, res) => {
    res.json(req.user);
});

// Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve the home page
app.get('/', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Google OAuth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
    (req, res) => {
        // Successful authentication, redirect to the frontend home.
        res.redirect('http://localhost:5173');
    });

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
