var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var connectionstring = process.env.DOCUMENTDB_CONNECTION_STRING

var repo = {
    saveplayer: async function (player) {
        return new Promise((resolve, reject) => {
            mongo.connect(connectionstring, function (err, db) {
                if (err) reject(err);                
                
                if (player._id) {
                    var id = ObjectID(player._id);
                    delete player._id;
                    db.collection("players").updateOne({ _id: id }, player, function (err, res) {
                        if (err) reject(err);
                        resolve();
                        db.close();
                    });
                } else {
                    db.collection("players").insertOne(player, function (err, res) {
                        if (err) reject(err);
                        resolve();
                        db.close();
                    });
                }
            });
        })
    },
    getPlayer: async function (userid) {
        return new Promise((resolve, reject) => {
            mongo.connect(connectionstring, function (err, db) {
                if (err) reject(err);
                db.collection("players").find({
                    ownerid: userid
                }).toArray(function (err, result) {
                    if (err) reject(err);
                    if (result.length > 0)
                        resolve(result[0]);
                    else
                        resolve();
                    db.close();
                });
            });
        })
    },
    getAllPlayers: async function () {
        return new Promise((resolve, reject) => {
            mongo.connect(connectionstring, function (err, db) {
                if (err) reject(err);
                db.collection("players").find({}).toArray(function (err, result) {
                    if (err) reject(err);
                    resolve(result);
                    db.close();
                });
            });
        })
    }
}

module.exports = repo;
