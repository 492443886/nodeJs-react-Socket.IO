const mongoClient = require('mongodb').MongoClient
const userRoutines = require('./userroutines')
const coll = 'users'
mongoExercise4 = async () => {
    try {
        const conn = await mongoClient.connect('mongodb://localhost')
        const db = conn.db('Info3069db')
        console.log("Connected to server")
// set up a new user object
        let joe = await userRoutines.setUser('Chunhui Ma',24, 'Chun@here.com')
// add the new user to db
        let docsAdded = await userRoutines.addOne(coll, joe, db)
// see if the add worked
        docsAdded.insertedCount === 1 ? console.log(`user ${joe.name} added`) : console.log(`user ${joe.name} not added`)
// now see if we can find him
        let user = await userRoutines.findByName(coll,'Chunhui Ma', db)
        console.log(`user ${user.name} found id = ${user._id}`)
// update his email
        user.email = 'Chunhui@here.com'
        let updateResults = await userRoutines.updateOne(coll, user, db)
        console.log(`${updateResults.modifiedCount} user document was updated`)
// get him one more time and show the updated email
        user = await userRoutines.findByName(coll,'Chunhui Ma', db)
        console.log(`user ${user.name}'s updated email is ${user.email}`)
// remove him from the db
        let deleteResults = await userRoutines.deleteOne(coll, user, db)
        console.log(`${deleteResults.deletedCount} document was deleted`)
        conn.close()
        process.exit()
    }
    catch (err) {
        console.log(`Houston we have a problem: ${err}`)
        process.exit(1)
    }
}
mongoExercise4()