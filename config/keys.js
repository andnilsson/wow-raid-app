const config = {
    BNET_ID: process.env.BNET_ID || "",
    BNET_SECRET: process.env.BNET_SECRET || "",
    AUTHCALLBACK: process.env.AUTHCALLBACK || "https://localhost:1337/auth/bnet/callback",
    DOCUMENTDB_CONNECTION_STRING: process.env.DOCUMENTDB_CONNECTION_STRING || "",
    RUN_SELFSIGNED_HTTPS: process.env.AUTHCALLBACK || "true",
    PORT: process.env.PORT || 1337
}

console.log(config);

module.exports = config;