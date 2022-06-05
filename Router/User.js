require("../db/config");
const express = require("express")
const router = express.Router();
const users = require("../db/user");
const bcrypt = require("bcrypt");

// router 1 user ko create karne ke liye

router.post("/createuser", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const { name, password, email } = req.body;
    const emailCheck = await users.findOne({ email })
    if (!emailCheck) {
        const hashkey = await bcrypt.hash(password, salt)
        let user = await new users({ name, password: hashkey, email });
        let result = await user.save()
        result = result.toObject()
        delete result.password
        res.send(result)
    } else {
        res.send({ result: "Email id already exits" })
    }
})

// router 2 user ko login karne ke liye

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let user = await users.findOne({ email });
    if (user) {
        const compare = await bcrypt.compare(password, user.password);
        if (compare) {
            user = user.toObject()
            delete user.password;
            res.send(user)
        } else {
            res.send({result : "Plase enter vilid login deatiles"})
        }
    } else {
        res.send({result : "Plase enter vilid login deatiles"})
    }

})

module.exports = router;