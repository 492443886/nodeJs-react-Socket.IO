import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import io from 'socket.io-client'
class SocketClientComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {msg: ""}
    }
    componentDidMount = async () => {
// connect to server
        const socket = io.connect('localhost:5150',{'forceNew':true });
        // send join message to server, pass a payload to it
        socket.emit('join', {name: this.props.name, room: this.props.room}, (err) => {})
        // handle welcome message from server
        socket.on('welcome', (greetingsMsg) => {
            if (this.state.msg === '') {
                this.setState({msg: greetingsMsg})
            }
        })
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    {this.state.msg}
                </div>
            </MuiThemeProvider>
        )
    }
}
export default SocketClientComponent