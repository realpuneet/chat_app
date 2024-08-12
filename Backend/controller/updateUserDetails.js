const UserModel = require("../models/UserModel");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");

async function updateUserDetails(req, res) {
    try {
        const token = req.cookies.token || ""; // Use 'cookies' instead of 'cookie'

        const user = await getUserDetailsFromToken(token);

        const { name, profile_pic } = req.body;

        // Update user details and return the updated document
        const updatedUser = await UserModel.findByIdAndUpdate(
            user._id,
            {
                name,
                profile_pic
            },
            { new: true } // This option returns the updated document
        );

        return res.json({
            message: "User Details Updated Successfully.",
            data: updatedUser,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            error: error
        });
    }
}

module.exports = updateUserDetails;

