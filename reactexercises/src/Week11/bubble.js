
import '../App.css'
import React from 'react'

const Bubble = (props) => {

    return (
        <div className={props.position} style={{backgroundColor: props.message.color, color:'white' }}>
            <div style={{float:"right"}}>
                room: {props.message.room}<br />
                @: {props.message.createdAt}<br />
            </div>
            <div style={{

                fontSize: 'medium',
                display: 'inline-block',
                marginBottom: '25px',
            }
            }>{props.message.from} says: </div>
            <div style={{
                wordWrap: 'break-word',
                fontSize: 'medium',
                fontWeight: 'bold',
            }}>{props.message.text}</div>
        </div>
    )



}
export default Bubble