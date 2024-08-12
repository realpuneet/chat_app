const UserModel = require('../models/UserModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function checkPassword(req, res) {
    try {
        const { password, user_Id } = req.body;
        const user = await UserModel.findById(user_Id);

        if (!user) {
            return res.status(404).json({
                msg: 'User not found',
                error: true
            });
        }

        const verifyPassword = await bcryptjs.compare(password, user.password);

        if (!verifyPassword) {
            return res.status(400).json({
                msg: 'Invalid password',
                error: true
            });
        }

        const tokenData = {
            id: user.id,
            email: user.email
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        const cookieOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        };

        return res.cookie('token', token, cookieOption).status(200).json({
            msg: 'Login successful',
            token: token,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            error: true
        });
    }
}

module.exports = checkPassword;
 