import React from 'react'
import List from 'material-ui/List/List'
import User from './user'
const UserList = (props) => {
    let users = props.users.map((user) => {return (<User key={user.id} user={user}/>);})
    return (
            <List>{users}</List>
    )
}
export default UserList