

async function logout(req, res){
    try {
        const cookieOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        };

        return res.cookie('token','',cookieOption).status(200).json({
            msg: "session out",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            error: error
        })
    }
}

module.exports = logout;