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
        let ont = body.gtf.on["2016-2017"]
// format to currency
        ont = formatter.format(ont)
// dump to the console using ES2016 template literal
        console.log(`Ontario's transfer amount for 2016-2017 was ${ont}`)
    }
})