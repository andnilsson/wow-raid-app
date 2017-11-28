const config = {
    BNET_ID: process.env.BNET_ID || "kv4639tu8ykuyn6yn4qng2jjm7uy7xpc",
    BNET_SECRET: process.env.BNET_SECRET || "VTFTPXekb6z6YRQZZ2ebgAScpmj4CG98",
    AUTHCALLBACK: process.env.AUTHCALLBACK || "https://localhost:1337/auth/bnet/callback",
    DOCUMENTDB_CONNECTION_STRING: process.env.DOCUMENTDB_CONNECTION_STRING || "mongodb://wowapp:5nFYSPp2Htu6O5C1TXFDhUZNfQgz7QqXIZu7suYPD5MS030tkWBC40VkSUdButwgscYuiQGu32cjTzox2WByaA==@wowapp.documents.azure.com:10255/?ssl=true&replicaSet=globaldb",
    RUN_SELFSIGNED_HTTPS: process.env.AUTHCALLBACK || "true",
    PORT: process.env.PORT || 1337
}

console.log(config);

module.exports = config;