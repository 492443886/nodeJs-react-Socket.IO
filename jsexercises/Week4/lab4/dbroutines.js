
let ObjectID = require('mongodb').ObjectID




let deleteAll = (coll, db) => db.collection(coll).deleteMany({})

let addMany = (json, coll, db) => db.collection(coll).insertMany(json)


module.exports = {deleteAll, addMany}
