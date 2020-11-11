import React from 'react'
import {RadioButtonGroup, RadioButton} from 'material-ui/RadioButton'

// const styles = {
//     radioButton: {
//         marginBottom: 10,
//         color: '#4aa144',
//         width: '5%'
//     }
// }
// inputStyle={styles.radioButton}
const RoomsComponent = (props) => {
    const rooms = props.rooms.map((room, i) => <RadioButton key={i} value={room} label={room}/>)
    return (<RadioButtonGroup onChange={props.selectRoom} name="roomsButton">{rooms}</RadioButtonGroup>)
}

export default RoomsComponent

