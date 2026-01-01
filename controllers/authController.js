import db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// User Registration
export const registerUser = (req, res) => {
    // 1. SAFETY CHECK: Is req.body defined?
    // If the middleware failed or user sent weird data, req.body might be missing.
    if (!req.body) {
        return res.status(400).json({ error: "Invalid request body" });
    }

    const { username, email, password } = req.body;

    // 2. VALIDATION: Are the fields empty?
    // This stops the "salt required" error because we never reach bcrypt if password is missing.
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Username, email, and password are required" });
    }
    // check if user exists
    const checkUserQuery = `SELECT * FROM users WHERE email = ?`;

    db.get(checkUserQuery, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ eror: err.message });
        }
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
    });

    // has the password 
    const hasedPassword = bcrypt.hashSync(password, 10);

    // sql query to insert user
    const insertUserQuery = `INSERT INTO users (username, email,password) VALUES (?,?,?)`;

    // run the query 
    db.run(insertUserQuery, [username, email, hasedPassword], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes == 0) {
            return res.status(500).json({ error: "Failed to register user" });
        }

        // success
        res.status(201).json({
            message: "User registerd successfully",
            user: {
                id: this.lastID,
                username: username,
                email: email
            }
        });
    });
};

// User Login
export const loginUser = (req, res) => {
    // Implementation for user login
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    // check if user exists
    const checkUserQuery = `SELECT * FROM users WHERE email=?`;

    db.get(checkUserQuery, [email], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: "User not found" });
        // check password 
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) return res.status(401).json({ error: "Invalid Password" });

        // generate jwt code 
        const token = jwt.sign({ id: user.id }, "ACCESS_TOKEN", { expiresIn: '24h' });
        // success
        res.json({
            message: "Login Successful",
            token: token
        });

    });

};