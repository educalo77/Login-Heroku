const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

// registering

router.post("/register", validInfo, async (req, res) => {
    try {
        // 1. destructuring the req.body (name, email, password)
        const {
            name,
            email,
            password
        } = req.body;

        //2. check if user exist
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);
        if (user.rows.length !== 0) {
            return res.status(401).json("User already exist");
        }

        //3. Bcrypt the user Password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //4. enter the new user into our db
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);

        //5- Generating out jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({
            token
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// login route

router.post("/login", validInfo, async (req, res) => {
    try {
        // 1. destructure the req.body
        const {
            email,
            password
        } = req.body;

        // 2. check if doesn't exist
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length === 0) {
            return res.json("Password or Email is incorrect");
        }

        // 3. check if incoming password is the same as db

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }

        // give them the token

        const token = jwtGenerator(user.rows[0].user_id);
        res.json({
            token
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})




module.exports = router;