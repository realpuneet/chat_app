const UserModel = require('../models/UserModel');

async function checkEmail(req, res) {
    try {
        const { email } = req.body;
        const checkEmail = await UserModel.findOne({ email }).select('-password');

        if (checkEmail) {
            return res.status(200).json({
                message: 'Email already exists',
                error: true,
                data: checkEmail
            });
        } else {
            return res.status(200).json({
                message: 'Email is available',
                success: true,
                data: null
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true
        });
    }
}

module.exports = checkEmail;
