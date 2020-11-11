require('dotenv').config()
const express = require('express')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient
const alertaRtns = require('./alertsetup')

const dataRtns = require('./dbroutines')

const moment = require('moment')

router.get('/alertsetup', async (req, res) => {
    try {

        let alters = await alertaRtns.AlertFunction()
        res.send(alters)

    }
    catch (err) {
        console.log(err.stack)
        res.status(500).send('Set up - internal server error')
    }
})

router.get('/advisory/unique/names', async (req, res) => {

    try {

        const conn = await mongoClient.connect(process.env.DBURL)
        const db = conn.db(process.env.DB)

        let advisories = await dataRtns.findAll('advisories', db)


        let names = []

        advisories.forEach(function(element) {

            names.push(element.name)

        });


        names = names.filter(function(element, pos,arrary) {
            return arrary.indexOf(element) == pos;
        });
        res.send(names)
        conn.close()

    }
    catch (err) {
        console.log(err.stack)
        res.status(500).send('get all Countries failed - internal server error')
    }
})

router.get('/advisory/:name', async (req, res) => {

    try {

        const conn = await mongoClient.connect(process.env.DBURL)
        const db = conn.db(process.env.DB)

        let name = req.params.name;

        let advisories = await dataRtns.findAll('advisories', db)

        let results = []

        advisories.forEach(function(element) {

            if(element.name ===name)
                results.push(element)

        });

        res.send(results)

        conn.close()
    }
    catch (err) {
        console.log(err.stack)
        res.status(500).send(' Get user failed - internal server error')
    }
})

router.get('/countries', async (req, res) => {
    try {

        const conn = await mongoClient.connect(process.env.DBURL)
        const db = conn.db(process.env.DB)

        let countries = await dataRtns.findAll('countries', db)

        res.send(countries)
        conn.close()

    }
    catch (err) {
        console.log(err.stack)
        res.status(500).send('get all Countries failed - internal server error')
    }
})

router.post('/advisory', async (req, res) => {
    try {
        const conn = await mongoClient.connect(process.env.DBURL)
        const db = conn.db(process.env.DB)

        let data = req.body

        let name = data.traveler
        let country = data.country
        let code = ""
        let alert =""

        let d =new Date()
        let date = moment().format('YYYY-MM-DD HH:mm')

        let countries = await dataRtns.findAll('countries', db)

        let Alerts = await dataRtns.findAll('alerts', db)



        Alerts.forEach(function(element) {

            if(element.Name === country){
                alert = element.Alert
            }

        });

        countries.forEach(function(element) {

            if(element.Name === country){
                code = element.Code
            }

        });
        //let ad = {name: name, country: country, code:code, alert: alert, date: "2"}

        let ad = {name: name, country:code, alert: alert, date: date}

        let result  = await dataRtns.addOneAdvisory("advisories",ad, db)
        res.send({msg: `${result.insertedCount} advisory document(s) were added`})



        conn.close()
    }
    catch (err) {
        console.log(err.stack)
        res.status(500).send('add advisory failed - internal server error')
    }
})

module.exports = router