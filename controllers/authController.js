const User = require('../models/userModel')
const bcrypt = require("bcrypt")

exports.signUp = async (req , res) => {
    try{
        const { username , password} = req.body
        const hashPassword = await bcrypt.hash(password , 12)

        const newUser = await User.create(
            {
                username,
                password: hashPassword
            }
        )
        res.status(201).json({
            status: "success",
            data: {
                user: newUser
            }
        })
    }catch (error) {
        console.log(error)
        res.status(401).json({
            status: "failed"
        })
    }
}