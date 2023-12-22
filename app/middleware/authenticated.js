const jwt = require("jsonwebtoken")
const EncryptionHelper = require("../utils/encryption_helper");
const ResponseHelper = require('../utils/response_helper');
const jwtSecret = EncryptionHelper.getAuthTokenStr();

exports.auth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        next();
    } else {
        return ResponseHelper.sendJsonResponse(res, 401, {}, "", { 'error': 'Not authorized' })
    }
}

exports.adminAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (!err && decodedToken.role === "admin") {
                next();
            }
            return ResponseHelper.sendJsonResponse(res, 401, {}, "", { 'error': 'Not authorized' });
        });
    } else {
        return ResponseHelper.sendJsonResponse(res, 401, {}, "", { 'error': 'Not authorized' });
    }
}

exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (!err && decodedToken.role === "Basic") {
                next();
            }
            return ResponseHelper.sendJsonResponse(res, 401, {}, "", { 'error': 'Not authorized' });
        })
    } else {
        return ResponseHelper.sendJsonResponse(res, 401, {}, "", { 'error': 'Not authorized' })
    }
}