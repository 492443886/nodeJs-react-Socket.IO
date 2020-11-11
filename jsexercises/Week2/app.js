yargs = require('yargs');
routines = require('./lab2routines')
const argv = yargs
    .options({
        firstname: {
            demand: true,
            alias: 'fname',
            describe: "Resident’s home province",
            string: true
        },
        lastname: {
            demand: true,
            alias: 'lname',
            describe: 'Resident’s last name',
            string: true
        },
        province:{
            demand: true,
            alias: 'prov',
            choices: ['ON', 'AB', 'BC'],
            describe: 'Resident’s home province',
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv

someAsyncFunction = async (fn, ln, pv) =>
{
    try {
        let fullname = await routines.fullNamePromise(fn, ln)
        let namePv = await routines.nameAndProvincePromise(fullname, pv)
        let payment = await routines.transferPaymentDataPromise()
        let results = await routines.buildMessagePromise(payment, pv, namePv)

        console.log(results)

    } catch (err) {
        console.log(err)
    }
}


someAsyncFunction(argv.firstname, argv.lastname, argv.province)

