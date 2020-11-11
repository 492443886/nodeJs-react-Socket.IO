
//const SERVER = "http://localhost:5150/project1"; // development
const SERVER = "/project1"; // production
module.exports = {
    COUNTRIESURL: `${SERVER}/countries`,
    ALERTSETUPURL: `${SERVER}/alertsetup`,
    GETUNIQUENAME: `${SERVER}/advisory/unique/names`,
    GETDAVISORYBYNAME: `${SERVER}/advisory/`,
    ADDADVISORY: `${SERVER}/advisory`

}