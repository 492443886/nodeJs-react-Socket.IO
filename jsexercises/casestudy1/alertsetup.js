const env = require('dotenv')
const mongoClient = require('mongodb').MongoClient
const rtns = require('./fileroutines')
const dbrtns = require('./dbroutines')
const coll = 'alert'
let AlertFunction = async () => {

    let resultString = ""

    try{

        let isExit = await rtns.fileExistsPromise(process.env.COUNTRYCODEFILE)

        if (!isExit) {
            let Json = await rtns.getJsonFromWWWPromise(process.env.COUNTRYCODEURL)
            let isSuccess = await rtns.writeJSONToFSPromise(process.env.COUNTRYCODEFILE, Json)
            if (isSuccess) {
                resultString +=`A new ${process.env.COUNTRYCODEFILE.substr(2, process.env.COUNTRYCODEFILE.length - 1)} was written. `
                // console.log(`A new ${process.env.COUNTRYCODEFILE.substr(2, process.env.COUNTRYCODEFILE.length - 1)} was written. `)
            }

        } else {
            resultString += `An existing ${process.env.COUNTRYCODEFILE.substr(2, process.env.COUNTRYCODEFILE.length - 1)} file was read from the file system. `
            // console.log(`An existing ${process.env.COUNTRYCODEFILE.substr(2, process.env.COUNTRYCODEFILE.length - 1)} file was read from the file system. `)
        }

        let countryJson = await rtns.getJSONToFSPromise(process.env.COUNTRYCODEFILE)

        resultString += `There are ${countryJson.length} in ${process.env.COUNTRYCODEFILE.substr(2, process.env.COUNTRYCODEFILE.length - 1)}. `
        // console.log(`There are ${countryJson.length} in ${process.env.COUNTRYCODEFILE.substr(2, process.env.COUNTRYCODEFILE.length - 1)}. `)


        /////////////////////// ALTER


        let isAlterExit = await rtns.fileExistsPromise(process.env.ALERTFILE)
        if (!isAlterExit) {
            let Json = await rtns.getJsonFromWWWPromise(process.env.ALERTURL)
            let isSuccess = await rtns.writeJSONToFSPromise(process.env.ALERTFILE, Json)
            if (isSuccess) {
                resultString += `A new ${process.env.ALERTFILE.substr(2, process.env.ALERTFILE.length - 1)} was written. `
                // console.log(`A new ${process.env.ALERTFILE.substr(2, process.env.ALERTFILE.length - 1)} was written. `)
            }

        } else {
            resultString += `An existing ${process.env.ALERTFILE.substr(2, process.env.ALERTFILE.length - 1)} file was read from the file system. `
            // console.log(`An existing ${process.env.ALERTFILE.substr(2, process.env.ALERTFILE.length - 1)} file was read from the file system. `)
        }

        let alertJson = await rtns.getJSONToFSPromise(process.env.ALERTFILE)
        let count = Object.keys(alertJson.data).length

        resultString +=`There are ${count} in ${process.env.ALERTFILE.substr(2, process.env.ALERTFILE.length - 1)}. `
        // console.log(`There are ${count} in ${process.env.ALERTFILE.substr(2, process.env.ALERTFILE.length - 1)}. `);


        //////////////////////////////data

        const conn = await mongoClient.connect('mongodb://localhost')
        const db = conn.db('Info3069db')

        dbrtns.deleteAll(process.env.ALERTCOLLECTION, db)


        let Alerts = [] = await Promise.all(countryJson.map(async (element) => {

            var temp = alertJson.data[element.Code]
            if (temp !== undefined) {

                temp = alertJson.data[element.Code]['eng']['advisory-text']
            }
            else {
                temp = "No travel alerts"
            }

            let alert = await dbrtns.setAlter(element.Code, element.Name, temp)

            await dbrtns.addOne(process.env.ALERTCOLLECTION, alert, db)

            return alert
        }));


        let deleteResult =  await dbrtns.deleteAll(coll, db)

        resultString +=`Deleting existing documents form alerts collection. `
        // console.log(`Deleting existing documents form alerts collection. `)

        resultString +=`Added ${Alerts.length} documents to the alerts collection. `
        // console.log(`Added ${Alerts.length} documents to the alerts collection. `)

        conn.close()
        return {results: resultString}

        process.exit()

    } catch (err) {
        resultString += `${err}. `
        return {results: resultString}
    }

}


module.exports = {AlertFunction}

