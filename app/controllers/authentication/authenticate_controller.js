
const EncryptionHelper = require("../../utils/encryption_helper");
const ResponseHelper = require('../../utils/response_helper');
const User = require("../../models/User");

class AuthenticateController {
    static async register(req, res) {
        let { name, email, username, password } = req.body;

        if (password.length < 6) {
            return res.status(400).json({ message: "Password less than 6 characters" })
        }

        password = await EncryptionHelper.hashPassword(password);

        try {
            await User.create({ username, password, email, name }).then(user => {
                EncryptionHelper.getJwtSignedToken(user, res);
                ResponseHelper.sendJsonResponse(res, 200, { user: user._id }, "Successfully Created New Entry")
            });
        } catch (err) {
            console.error('Error retrieving data : ', err);
            ResponseHelper.sendJsonResponse(res, 500, {}, "", { 'error': 'An error has occurred' });
        }
    }

    static async logIn(req, res) {
        try {
            const { username, password } = req.body
            // Check if username and password is provided
            if (!username || !password) {
                ResponseHelper.sendJsonResponse(res, 400, {}, "", { 'error': 'Either Username or Password not present' })
            }

            const user = await User.findOne({ username });
            if (!user) {
                ResponseHelper.sendJsonResponse(res, 404, {}, "", { 'not_found': 'User not found' });
            }

            const checkPasswordStatus = await EncryptionHelper.compareHashPassword(password, user.password);

            if (!checkPasswordStatus) {
                ResponseHelper.sendJsonResponse(res, 400, {}, "", { 'error': 'Invalid Password' });
            } else {
                await EncryptionHelper.getJwtSignedToken(user, res);
                ResponseHelper.sendJsonResponse(res, 200, { user: user._id }, "Login successful");
            }
        } catch (error) {
            res.status(400).json({
                message: "An error occurred",
                error: error.message,
            })
        }
    }

    static async logOut(req, res) {
        res.cookie("jwt", "", { maxAge: 0 });
        ResponseHelper.sendJsonResponse(res, 200, {}, "Successfully Logged Out");
    }
}


module.exports = AuthenticateController;