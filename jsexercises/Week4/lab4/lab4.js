const env = require('dotenv')
const mongoClient = require('mongodb').MongoClient
const fsrtns = require('./fileroutines')
const dbrtns = require('./dbroutines')
const coll = 'countries'

Lab4Function = async () => {
    try {

        let isExit = await fsrtns.fileExistsPromise(process.env.COUNTRYCODEFILE)
        if(!isExit) {
            let Json = await fsrtns.getJsonFromWWWPromise(process.env.COUNTRYCODESURL)
            let isSuccess = await fsrtns.writeJSONToFSPromise(process.env.COUNTRYCODEFILE, Json)
            if(isSuccess){
                console.log(`A new ${process.env.COUNTRYCODEFILE} was written.`)
            }

        }else {
            console.log(`An existing ${process.env.COUNTRYCODEFILE} file was read from the file system`)
        }

        let result = await fsrtns.getJSONToFSPromise(process.env.COUNTRYCODEFILE)
        console.log(`There are ${result.length} in ${process.env.COUNTRYCODEFILE}`)

        ////////data base

        const conn = await mongoClient.connect(process.env.DBURL)
        const db = conn.db(process.env.db)
        console.log(`Connected to ${process.env.DBURL}/${process.env.db}`)


        let deleteResult = await dbrtns.deleteAll(coll, db);
        console.log(`current countries documents deleted`)
        let addResult = await dbrtns.addMany(result,coll, db);
        console.log(`${addResult.insertedCount} is added to the countries collection`)


        conn.close()
        process.exit()
    }
    catch (err) {
        console.log(`Houston we have a problem: ${err}`)
        process.exit(1)
    }

}


Lab4Function()
