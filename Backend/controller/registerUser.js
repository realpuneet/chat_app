const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");

async function registerUser(req, res) {
    try {
        const {name, email, password, profile_pic} = req.body;

        const checkEmail = await UserModel.findOne({email}); 
        if (checkEmail) {
            return res.status(404).json({
                message: " Already registered",
                data: checkEmail,
                error : true
            })
        }
        //password encryption
        const salt = await bcryptjs.genSalt(15)
        const hashPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            profile_pic,
            password: hashPassword
        }

        const user = new UserModel(payload)
        const userSave = await user.save()

        return res.status(200).json({
            message: "User registration successful...",
            data : userSave,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true
        })
    }
}

module.exports = registerUser;