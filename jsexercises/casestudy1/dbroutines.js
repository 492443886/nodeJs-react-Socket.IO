let setAlter = (code, name, alert) => {
    return new Promise((resolve, reject) => {
        resolve({
            name, code, alert
        })
    })
}

let deleteAll = (coll, db) => db.collection(coll).deleteMany({})

let addMany = (json, coll, db) => db.collection(coll).insertMany(json)


let addOne = (coll, Alert, db) => db.collection(coll).insertOne(
    {Code: Alert.code, Name:Alert.name, Alert: Alert.alert}
)


let addOneAdvisory = (coll, Advisory, db) => db.collection(coll).insertOne(
    {name: Advisory.name  ,country: Advisory.country , alert: Advisory.alert,date: Advisory.date }
)

let findAll = (coll,db) => db.collection(coll).find().toArray()

module.exports = {setAlter, addOne, deleteAll, addMany, addOneAdvisory, findAll}