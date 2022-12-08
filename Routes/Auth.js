const router = require("express").Router()
const JWT_AUTH = require("../MiddleWare/JWT_AUTH")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../Models/UserModel")



router.post("/isloggedin", JWT_AUTH, async (req, res) => {
    res.status(200).json(req.user)
})

router.post('/login',
    body('email').isEmail().withMessage("Enter a valid email"),
    body('password').isLength({ min: 6 }).withMessage("Password must be greater than 6 characters"),

    async (req, res) => {

        try {
            const { email, password } = req.body

            const existingUser = await User.find({ email: email })

            if (existingUser.length === 0) return res.status(400).json({ error: "Email or Password Invalid!!!" })

            const checkPassword = await bcrypt.compare(password, existingUser[0].password)

            if (!checkPassword) return res.status(400).json({ error: "Email or Password Invalid!!!" })

            const payload = { _id: existingUser[0]._id }

            const token = jwt.sign(payload, process.env.JWT_MY_SECRET, { expiresIn: "1hr" })

            existingUser[0].password = undefined

            const user = existingUser[0]

            return res.status(200).json({ token, user })

        } catch (error) {
            res.status(500).json({ error: error.message })
        }

    })


router.post("/signup",

    body("username").isAlphanumeric().isLength({ min: 4, max: 10 }).withMessage("Username must be between 4 to 10 characters."),
    body("email").isEmail().withMessage("Please enter a valid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be greater than 6 characters")

    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { username, email, password } = req.body

            const getUser = await User.find({ email: email })

            if (getUser.length) return res.status(400).json({ error: `User with ${email} already exists` })

            const encryptedPassword = await bcrypt.hash(password, 15)

            const newUser = new User({ username, email, password: encryptedPassword })

            const successSave = await newUser.save()

            successSave._doc.password = null;

            return res.status(201).json({ ...successSave._doc })

        } catch (error) {

            res.status(500).json({ error: error.message })
        }

    })


module.exports = router;