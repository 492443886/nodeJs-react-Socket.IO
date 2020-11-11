// //Load the request module
// const request = require('request')
// //Lets try to make an HTTP GET request to Fanshawe's website.
// request('http://www.fanshawec.ca', (error, response, body) => {
//     if (!error && response.statusCode === 200) {
//         console.log(body); // Show the HTML for the Fanshawe homepage.
//     }
// })


// Load the request module
const request = require('request')
// Lets try to make a HTTP GET request to GOC's website and get some transfer info in JSON.
let srcAddr = 'http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json'
// Create a currency formatter.
let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
})
request({
    url: srcAddr,
    json: true
}, (error,response,body) => {
    if (error) {
        console.log('unable to connect to GOC servers');
    } else if (response.statusCode === 200) {
// strip out the Ontario amount
        let bc = body.gtf.bc["2017-2018"]
        let ab = body.gtf.ab["2017-2018"]
        let dif =  bc- ab
// format to currency
        bc = formatter.format(bc)
        ab = formatter.format(ab)
        dif = formatter.format(dif)
// dump to the console using ES2016 template literal
        console.log(`B.C's transfer amount for 2016-2017 was ${bc}`)
        console.log(`Alberta's transfer amount for 2016-2017 was ${ab}`)
        console.log(`B.C. received ${dif} more than Alberta`)
    }
})

