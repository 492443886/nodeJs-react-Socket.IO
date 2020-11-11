import React from 'react'
import ListItem from 'material-ui/List/ListItem'
import SvgIcon from 'material-ui/svg-icons/image/healing';

const User = (props) => {
    return (
        <ListItem secondaryText={`${props.user.name} is currently in room ${props.user.room} `} leftIcon={<SvgIcon color={props.user.color} />}/>
    )
}

export default User
