const Protect = (req, res, next) => {
    const { user } = req.session

    if (!user) {
        return res.status(401).json({
            status: 'failed',
            message: "User must login first"
        })
    }
    req.user = user
    next() 
}

module.exports = Protect