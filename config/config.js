const dotenv = require("dotenv").config()

module.exports = {
 token: process.env.token,
 owner: process.env.owner,
 status: process.env.status,
}