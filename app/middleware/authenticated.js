
const EncryptionHelper = require("../utils/encryption_helper");
const ResponseHelper = require('../utils/response_helper');
const User = require("../models/User");
const util = require('util');
const jwt = require('jsonwebtoken');
const verifyAsync = util.promisify(jwt.verify);
const jwtSecret = EncryptionHelper.getAuthTokenStr();

const tokenBlacklist = new Set();

function isTokenExpired(decodedToken) {
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp < currentTimestamp;
}

async function authCheck(req, role = null) {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        // Extract the token from the Authorization header
        const token = authorizationHeader.split(' ')[1];

        if (tokenBlacklist.has(token)) {
            return false;
        }

        const jwtSecret = EncryptionHelper.getAuthTokenStr();
        const decodedToken = await verifyAsync(token, jwtSecret);
        const tokenExpired = isTokenExpired(decodedToken);
        const username = decodedToken.username;
        const result = await User.findOne({ username });

        if (role) {
            if (result.role != role) {
                return false;
            }
        }

        if (result && !tokenExpired) {
            return true;
        }
    }
    return false;
}

exports.auth = async (req, res, next) => {
    const status = await authCheck(req);
    if (status) {
        return next();
    }
    return ResponseHelper.sendJsonResponse(res, 401, {}, "", { 'error': 'Not authorized' });
}

exports.adminAuth = async (req, res, next) => {
    const status = await authCheck(req, 'admin');
    if (status) {
        return next();
    }
    return ResponseHelper.sendJsonResponse(res, 401, {}, "", { 'error': 'Not authorized' });
    // const token = req.cookies.jwt
    // if (token) {
    //     jwt.verify(token, jwtSecret, (err, decodedToken) => {
    //         if (!err && decodedToken.role === "admin") {
    //             next();
    //         }
    //         return ResponseHelper.sendJsonResponse(res, 401, {}, "", { 'error': 'Not authorized' });
    //     });
    // } else {
    //     return ResponseHelper.sendJsonResponse(res, 401, {}, "", { 'error': 'Not authorized' });
    // }
}

exports.userAuth = async (req, res, next) => {
    const status = await authCheck(req, 'Basic');
    if (status) {
        return next();
    }
    return ResponseHelper.sendJsonResponse(res, 401, {}, "", { 'error': 'Not authorized' });
    // const token = req.cookies.jwt
    // if (token) {
    //     jwt.verify(token, jwtSecret, (err, decodedToken) => {
    //         if (!err && decodedToken.role === "Basic") {
    //             next();
    //         }
    //         return ResponseHelper.sendJsonResponse(res, 401, {}, "", { 'error': 'Not authorized' });
    //     })
    // } else {
    //     return ResponseHelper.sendJsonResponse(res, 401, {}, "", { 'error': 'Not authorized' })
    // }
}

exports.tokenBlacklist = tokenBlacklist;
