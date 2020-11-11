const fs = require('fs')
var request = require('request');
const env = require('dotenv').config()

let fileExistsPromise = (file) =>
    new Promise((resolve, reject) => {
        fs.stat(file, (err, data) => err ? resolve(false) : resolve(true))
    })

let getJsonFromWWWPromise=(Url)=> new Promise((resolve, reject) => {
    request(Url, (err, res, body) => {
        resolve(JSON.parse(body));
    });
});

let writeJSONToFSPromise=(file, Json) =>new Promise((resolve, reject) =>
    fs.writeFile(file, JSON.stringify(Json) , 'UTF-8', (err) => err ? resolve(false) : resolve(true))
)

let getJSONToFSPromise=(file) =>new Promise((resolve, reject) =>
    fs.readFile(file, 'UTF-8', (err, data) => err ? reject(err) : resolve(JSON.parse(data)))
)


module.exports = {fileExistsPromise, getJsonFromWWWPromise, writeJSONToFSPromise, getJSONToFSPromise}
