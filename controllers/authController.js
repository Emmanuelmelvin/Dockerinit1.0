const User = require('../models/userModel')
const bcrypt = require("bcryptjs")

exports.signUp = async (req, res) => {
    try {
        const { username, password } = req.body
        const hashPassword = await bcrypt.hash(password, 12)

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
    } catch (error) {
        console.log(error)
        res.status(401).json({
            status: "failed"
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            })
        }
        const isCorrect = await bcrypt.compare(password, user.password)

        if(isCorrect){
            req.session.user = user
            console.log(req.session)
            return res.status(200).json({
                status: "success",
            })
        } else{
            return res.status(400).json({
                status: "failed",
                message: "Password missmatch"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(401).json({
            status: "failed"
        })
    }
}