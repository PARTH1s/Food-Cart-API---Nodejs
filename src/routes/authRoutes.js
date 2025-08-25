const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

// User signup route
router.post(
    "/signup",
    passport.authenticate("signup", { session: false }),
    async (req, res) => {
        return res.status(201).json({
            success: true,
            message: "Signup successful",
            data: { user: req.user },
        });
    }
);

// User login route
router.post("/login", async (req, res, next) => {
    passport.authenticate("login", async (err, user) => {
        try {
            if (err || !user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password",
                });
            }

            req.login(user, { session: false }, async (err) => {
                if (err) return next(err);

                // JWT payload
                const body = { _id: user._id, email: user.email };

                // Sign token
                const token = jwt.sign(
                    { user: body },
                    process.env.JWT_SECRET || "TOP_SECRET",
                    { expiresIn: "1h" } // token expiry
                );

                return res.status(200).json({
                    success: true,
                    message: "Successfully signed in",
                    token,
                });
            });
        } catch (err) {
            console.error("Login error:", err);
            return next(err);
        }
    })(req, res, next);
});

module.exports = router;
