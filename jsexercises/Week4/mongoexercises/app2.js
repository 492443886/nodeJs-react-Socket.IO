const mongoClient = require('mongodb').MongoClient
const userRoutines = require('./userroutines')
const coll = 'users'
mongoExercise3 = async () => {
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
// update his email
        user.email = 'joey@here.com'
        let updateResults = await userRoutines.updateOne(coll, user, db)
        console.log(`${updateResults.modifiedCount} user document(s) was updated`)
// get him one more time and show the email
        user = await userRoutines.findByName(coll,'Joe User', db)
        console.log(`user ${user.name}'s updated email is ${user.email}`)
        conn.close()
        process.exit()
    }
    catch (err) {
        console.log(`Houston we have a problem: ${err}`)
        process.exit(1)
    }
}
mongoExercise3()