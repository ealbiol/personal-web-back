//JSON WEB TOKEN CONFIGURATION

const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");

//CREATE ACCESS TOKEN FUNCTION: It needs to receive the user. Allows the user to access authenticated parts of the site.
function createAccessToken(user) {
    const expToken = new Date();
    // The token lasts 3 hours
    expToken.setHours(expToken.getHours() + 3);

    // Data inside token:
    const payload = {
        token_type: "access",
        //user_id: null,
        user_id: user.id,
        iat: Date.now(),
        exp: expToken.getTime(),
    };
    //Generation of new token:
    return jwt.sign(payload, JWT_SECRET_KEY);
};


//CREATE REFRESH TOKEN FUNCTION: It needs to receive the user. Refreshed the access token when it expires as long as the refresh token hasn't expired.
function createRefreshToken(user) {
    const expToken = new Date();
    // The token lasts 1 month
    expToken.getMonth(expToken.getMonth() + 1)

    // Data inside token:
    const payload = {
        token_type: "refresh",
        user_id: user.id,
        iat: Date.now(),
        exp: expToken.getTime(),
    };
    //Generation of new token:
    return jwt.sign(payload, JWT_SECRET_KEY);
};


//DECODING TOKEN FUNCTION: Getting data of decoded token:
function decoded(token){
    return jwt.decode(token, JWT_SECRET_KEY, true);
};

module.exports = {
    createAccessToken,
    createRefreshToken,
    decoded
}