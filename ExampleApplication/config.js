module.exports = {
    emailConfig: {
        user:    "noreply@example.com",
        password: "XXXXX",
        host:    "smtp.provider.com",
        port: 587,
        tls: {ciphers: "SSLv3"}
    },
    corsWhitelist: ['http://localhost:8080']
};