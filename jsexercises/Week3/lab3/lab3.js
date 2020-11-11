const env = require('dotenv')

const rtns = require('./countrycoderoutines')

Lab3Function = async () => {

    //var file = process.env.COUNTRYCODEFILE;
    let isExit = await rtns.fileExistsPromise(process.env.COUNTRYCODEFILE)
    if(!isExit) {
        let Json = await rtns.getJsonFromWWWPromise(process.env.COUNTRYCODESURL)
        let isSuccess = await rtns.writeJSONToFSPromise(process.env.COUNTRYCODEFILE, Json)
        if(isSuccess){
            console.log(`A new ${process.env.COUNTRYCODEFILE.substr(2, process.env.COUNTRYCODEFILE.length - 1)} was written.`)
        }

    }else {
        console.log(`An existing ${process.env.COUNTRYCODEFILE.substr(2, process.env.COUNTRYCODEFILE.length - 1)} file was read from the file system`)
    }

    let result = await rtns.getJSONToFSPromise(process.env.COUNTRYCODEFILE)
    console.log(`There are ${result.length} in ${process.env.COUNTRYCODEFILE.substr(2, process.env.COUNTRYCODEFILE.length - 1)}`)
}


Lab3Function()

