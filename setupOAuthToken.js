// const TokenRequestSpec = require('./TokenRequestSpec');

// module.exports = async () => {
//     try {
//         const tokenRequest = new TokenRequestSpec();
//         const token = await tokenRequest.postTokenRequest();
//         process.env.BEARER_TOKEN = token;
//     } catch (error) {
//         console.error('Error fetching OAuth token:', error);
//         process.exit(1); // Exit the process with a non-zero code to indicate failure
//     }
// };