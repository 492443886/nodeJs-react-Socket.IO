// const rtns = require('./fileroutines')
// readUserFile = async () => {
//     try {
//         users = []
//         let rawData = await rtns.getRawUsersFromFSPromise()
//         rawData.split('\r\n').map(user => {
//             if (user.length > 0) {
//                 let userJson = {'Username': user, 'Email': user + '@abc.com'}
//                 users.push(userJson)
//             }
//         })
//         users.map(user => {console.log(`user ==>${user.Username}, email==>${user.Email}`)})
//     }
//     catch (err) {
//         console.log(err)
//     }
// }
// readUserFile()

// const rtns = require('./fileroutines')
// readUserFileWriteJson = async () => {
//     try {
//         users = []
//         let rawData = await rtns.getRawUsersFromFSPromise()
//         rawData.split('\r\n').map(user => {
//             if (user.length > 0) {
//                 let userJson = {'Username': user, 'Email': user + "@abc.com"}
//                 users.push(userJson)
//             }
//         })
//         let writeOk = await rtns.writeUsersJSONToFSPromise(JSON.stringify(users))
//         if (writeOk)
//             console.log('user json file written to file system')
//         else
//             console.log('user json file NOT written to file system')
//     }
//     catch (err) {
//         console.log(err)
//     }
// }
// readUserFileWriteJson()

const env = require('dotenv').config()


const rtns = require('./fileroutines')
userFile = async () => {
    let exists = await rtns.usersJSONExistsPromise()
    if (!exists) { // users.json doesn't exist, let's create it
        try {
            users = []
            let rawData = await rtns.getRawUsersFromFSPromise()
            rawData.split('\r\n').map(user => {
                if (user.length > 0) {
                    let userJson = {'Username': user, 'Email': user + "@abc.com"}
                    users.push(userJson)
                }
            })
            users.map(user => console.log(`user ==>${user.Username}, email==>${user.Email}`))
            await rtns.writeUsersJSONToFSPromise(JSON.stringify(users)) ?
                console.log('user json file written to file system') :
                console.log('user json file NOT written to file system')
        }
        catch (err) {
            console.log(err)
        }
    } else {
        console.log('using existing users file')
    }
}
userFile()