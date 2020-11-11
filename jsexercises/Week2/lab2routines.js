exports.fullNamePromise = (fn, ln) => {
    return new Promise((resolve, reject) => {
        resolve(`${fn}, ${ln}`);
    })
}

exports.nameAndProvincePromise = (fullname, pv) => {
    return new Promise((resolve, reject) => {

        var Provinces = ['Ontario', 'Alberta', 'British Columbia'];
        var Province = "";
        if(pv === 'ON'){
            Province = Provinces[0]
        }else if(pv === 'AB'){
            Province = Provinces[1]
        }else {
            Province = Provinces[2]
        }

        resolve(`${fullname} - lives in ${Province}`);
    })
}

var request = require('request');
exports.transferPaymentDataPromise = ()=> {
    return new Promise((resolve, reject) => {
        request('http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json', (err, res, body) => {
            resolve(JSON.parse(body));
        });
    });
}

let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
})

exports.buildMessagePromise = (gocData, province, nameAndProvince) => {
    return new Promise((resolve, reject) => {
        let x;
        if(province === "BC"){
            x = gocData.gtf.bc["2016-2017"]
        }else if(province === "ON"){
            x = gocData.gtf.on["2016-2017"]
        }else if(province === "AB"){
            x = gocData.gtf.ab["2016-2017"]

        }

        x = formatter.format(x)

        resolve(`${nameAndProvince}
The individual's province of residence receive ${x}
in transfer payments from the federal government`)


    });
}