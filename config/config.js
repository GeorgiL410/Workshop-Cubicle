//the purpose if this file is to assign the port of the server

module.exports = {
    development: {
        port: process.env.PORT || 3000,
        DB_CONNECTION: 'mongodb+srv://testUser:testPassword@cluster0.icavt.mongodb.net/test'
    },
    production: {}
};