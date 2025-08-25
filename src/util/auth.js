const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// Signup strategy
passport.use(
  "signup",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.create({ email, password });
        return done(null, user);
      } catch (err) {
        console.error("Signup error:", err);
        return done(err);
      }
    }
  )
);

// Login strategy
passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const isValid = await user.isValidPassword(password);
        if (!isValid) {
          return done(null, false, { message: "Wrong password" });
        }

        return done(null, user, { message: "Logged in successfully" });
      } catch (err) {
        console.error("Login error:", err);
        return done(err);
      }
    }
  )
);

// JWT authentication strategy
passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET || "TOP_SECRET", // use env variable in production
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // standard way
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (err) {
        console.error("JWT validation error:", err);
        return done(err);
      }
    }
  )
);
