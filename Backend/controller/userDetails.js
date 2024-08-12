const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");

async function userDetails(req, res) {
    try {
        const token = req.cookies.token || ""; // Use 'cookies' instead of 'cookie'

        const user = await getUserDetailsFromToken(token);

        return res.status(200).json({
            msg: "User details",
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            error: error
        });
    }
}

module.exports = userDetails;
