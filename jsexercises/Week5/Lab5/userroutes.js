require('dotenv').config()
const express = require('express')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient
const dataRtns = require('./userroutines')
const coll = 'users'

// define a default route to retrieve all users
router.get('/', async (req, res) => {
    try {
        const conn = await mongoClient.connect(process.env.DBURL)
        const db = conn.db(process.env.DB)
        let users = await dataRtns.findAll(coll, db)
        res.send(users)
        conn.close()
    }
    catch (err) {
        console.log(err.stack)
        res.status(500).send('get all users failed - internal server error')
    }
})


router.post('/', async (req, res) => {
    try {


        const conn = await mongoClient.connect(process.env.DBURL)
        const db = conn.db(process.env.DB)

        let user = req.body
        let result = await dataRtns.addOne(coll, user, db)
        res.send({msg: `${result.insertedCount} user(s) were added`})

        conn.close()

    }
    catch (err) {
        console.log(err.stack)
        res.status(500).send('add user failed - internal server error')
    }
})

router.get('/:name', async (req, res) => {
    try {

        const conn = await mongoClient.connect(process.env.DBURL)
        const db = conn.db(process.env.DB)

        let name = req.params.name;
        let result = await dataRtns.findByName(coll, name, db)
        res.send(result)

        conn.close()
    }
    catch (err) {
        console.log(err.stack)
        res.status(500).send(' Get user failed - internal server error')
    }
})



router.put('/', async (req, res) => {
    try {

        const conn = await mongoClient.connect(process.env.DBURL)
        const db = conn.db(process.env.DB)


        let name = req.body['name']
        let user = await dataRtns.findByName(coll, name, db)

        user['age'] = req.body['age']
        user['email'] = req.body['email']

        let result = await dataRtns.updateOne(coll, user, db)
        res.send({msg:`${result.modifiedCount} user(s) were modified`})
        conn.close()
    }
    catch (err) {
        console.log(err.stack)
        res.status(500).send('Change users failed - internal server error')
    }
})


router.delete('/:name', async (req, res) => {
    try {

        const conn = await mongoClient.connect(process.env.DBURL)
        const db = conn.db(process.env.DB)

        let name = req.params.name
        let user = await dataRtns.findByName(coll, name, db)
        let result = await dataRtns.deleteOne(coll, user, db)
        res.send({msg:`${result.deletedCount} user(s) were deleted`})

        conn.close()
    }
    catch (err) {
        console.log(err.stack)
        res.status(500).send('delete users failed - internal server error')
    }
})

module.exports = router