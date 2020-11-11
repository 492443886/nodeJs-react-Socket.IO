import React from 'react'
import List from 'material-ui/List/List'
import Message from "./message"


const UserBubble = (props) => {

    const messages = props.messages.map((message) => <Message message={message} name={props.name} key={message.id} />)

    return (

        <div style={{overflow: "scroll" , height: "400px"}}>
            <List >{messages}</List>
        </div>
    )




}
export default UserBubble
