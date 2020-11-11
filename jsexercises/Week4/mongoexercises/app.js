// const mongoClient = require('mongodb').MongoClient
// const userRoutines = require('./userroutines')
// const coll = 'user'
// mongoExercise1 = async () => {
//     try {
//         let conn = await mongoClient.connect('mongodb://localhost')
//         let db = conn.db('Info3069db')
//         console.log("Connected to server")
//         let user = await userRoutines.findByName(coll,'Jane Doe', db)
//         console.log(`user ${user.name} found id = ${user._id}`)
//         conn.close()
//         process.exit()
//     }
//     catch (err) {
//         console.log(`Houston we have a problem: ${err}`)
//         process.exit(1)
//     }
// }
// mongoExercise1()


const mongoClient = require('mongodb').MongoClient
const userRoutines = require('./userroutines')
const coll = 'users'
mongoExercise2 = async () => {
    try {
        const conn = await mongoClient.connect('mongodb://localhost')
        const db = conn.db('Info3069db')
        console.log("Connected to server")
// set up a new user object
        let joe = await userRoutines.setUser('Joe User',24,'ju@here.com')
// add the new user to db
        let docsAdded = await userRoutines.addOne(coll, joe, db)
// see if the add worked
        docsAdded.insertedCount === 1 ? console.log(`user ${joe.name} added`) : console.log(`user ${joe.name} not added`)
// now see if we can find him
        let user = await userRoutines.findByName(coll,'Joe User', db)
        console.log(`user ${user.name} found id = ${user._id}`)
        conn.close()
        process.exit()
    }
    catch (err) {
        console.log(`Houston we have a problem: ${err}`)
        process.exit(1)
    }
}
mongoExercise2()