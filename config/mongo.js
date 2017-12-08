var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const config = require('./keys');
var connectionstring = config.DOCUMENTDB_CONNECTION_STRING;
var en = require('linq');
var repo = {
    getAllBoardMessages: async function (page) {
        page = page - 1;

        return new Promise((resolve, reject) => {
            mongo.connect(connectionstring, function (err, db) {
                if (err) reject(err);
                db.collection("boardmessages").find({}).skip(page * 20).limit(20).sort({ 'createdOn': -1 }).toArray(function (err, result) {
                    if (err) reject(err);
                    resolve(result);
                    db.close();
                });
            });
        });
    },

    
    deletePlayer: async function(id) {
        return new Promise((resolve,reject) => {
            mongo.connect(connectionstring, function (err, db) {
                if (err) reject(err);                
                db.collection("players").deleteOne({ _id: ObjectID(id) }, function (err, res) {
                    if (err) reject(err);
                    resolve();
                    db.close();
                });
            }); 
        });
    },
    deleteBoardMessage: async function(id) {
        return new Promise((resolve,reject) => {
            mongo.connect(connectionstring, function (err, db) {
                if (err) reject(err);                
                db.collection("boardmessages").deleteOne({ _id: ObjectID(id) }, function (err, res) {
                    if (err) reject(err);
                    resolve();
                    db.close();
                });
            }); 
        });
    },
    saveBoardMessage: async function (message) {
        return new Promise((resolve, reject) => {
            mongo.connect(connectionstring, function (err, db) {
                if (err) reject(err);
                db.collection("boardmessages").insertOne(message, function (err, res) {
                    if (err) reject(err);
                    resolve();
                    db.close();
                });
            });
        });
    },
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
                    player.createdOn = new Date();
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
    getPlayerById: async function (playerid) {
        return new Promise((resolve, reject) => {           
            mongo.connect(connectionstring, function (err, db) {
                if (err) reject(err);
                console.log(playerid);
                if(!playerid || playerid === "undefined"){
                    reject();
                    return;
                }
                var id = ObjectID(playerid);
                db.collection("players").find({
                    _id: id
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
                    var players = en.from(result).where(x => !x.hidden).toArray();
                    resolve(players);
                    db.close();
                });
            });
        })
    }
}

module.exports = repo;
