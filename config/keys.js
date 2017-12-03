const config = {
    BNET_ID: process.env.BNET_ID || "kv4639tu8ykuyn6yn4qng2jjm7uy7xpc",
    BNET_SECRET: process.env.BNET_SECRET || "VTFTPXekb6z6YRQZZ2ebgAScpmj4CG98",
    AUTHCALLBACK: process.env.AUTHCALLBACK || "https://localhost:1337/auth/bnet/callback",
    DOCUMENTDB_CONNECTION_STRING: process.env.DOCUMENTDB_CONNECTION_STRING || "mongodb://admin:p382mi@cluster0-shard-00-00-xb9x1.mongodb.net:27017,cluster0-shard-00-01-xb9x1.mongodb.net:27017,cluster0-shard-00-02-xb9x1.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",
    RUN_SELFSIGNED_HTTPS: process.env.AUTHCALLBACK || "true",
    PORT: process.env.PORT || 1337
}

console.log(config);

module.exports = config;