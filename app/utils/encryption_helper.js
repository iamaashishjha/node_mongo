const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function hashPassword(plaintextPassword) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(plaintextPassword, salt);
        return hash;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error; // You might want to handle this error appropriately in your application
    }
}

async function compareHashPassword(plaintextPassword, hashedPassword) {
    try {
        const result = bcrypt.compareSync(plaintextPassword, hashedPassword);
        return result;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false;
    }
}

function getAuthTokenStr() {
    try {
        // const result = require("crypto").randomBytes(35).toString("hex");
        // return result;
        return "4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd";
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
}

const jwtSecret = getAuthTokenStr(); // Set jwtSecret using the dynamically generated secret
async function getJwtSignedToken(user, res) {
    const maxAge = 3 * 60 * 60; // 3hrs in sec
    const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        jwtSecret,
        { expiresIn: maxAge }
    );
    return token;
    // res.cookie("jwt", token, {
    //     httpOnly: true,
    //     maxAge: maxAge * 1000, // 3hrs in ms
    // });
}

module.exports = {
    hashPassword,
    compareHashPassword,
    getAuthTokenStr,
    getJwtSignedToken
};
