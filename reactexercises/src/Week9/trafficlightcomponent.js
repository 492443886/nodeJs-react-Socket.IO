import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../App.css'
import io from 'socket.io-client'
class Trafficlightcomponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redlamp: "",
            redTime: "",
            yellowlamp: "",
            yellowTime:"",
            greenlamp: "",
            greenTime: "",
        }

    }

    waitSomeSeconds = (wait) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(wait)
            }, wait);
        })
    }
    run = async () => {

        while(true){

            this.setState({greenlamp: 'white', yellowlamp: 'white', redlamp: 'red'})
            await this.waitSomeSeconds(this.state.redTime)

            this.setState({greenlamp: 'Green', yellowlamp: 'white', redlamp: 'white'})
            await this.waitSomeSeconds(this.state.greenTime)

            this.setState({greenlamp: 'white', yellowlamp: 'Yellow', redlamp: 'white'})
            await this.waitSomeSeconds(this.state.yellowTime)
        }


    }

    componentDidMount = async () => {
        // connect to server
        //const socket = io.connect('localhost:5150',{'forceNew':true });

        // connect to server on Heroku cloud
        const socket = io.connect()

        // send join message to server, pass a payload to it
        socket.emit('join', {name: this.props.street}, (err) => {})
        // handle welcome message from server
        socket.on('turnLampOn', (lightMsg) => {
            this.setState({redTime: lightMsg.red})
            this.setState({yellowTime: lightMsg.yellow})
            this.setState({greenTime: lightMsg.green})

            this.run()
        })
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    {this.props.street}
                    <div style={{border: 'solid', width: '34px', padding: '2px'}}>
                        <div className="lamp" style={{backgroundColor: this.state.redlamp}}></div>
                        <div className="lamp" style={{backgroundColor: this.state.yellowlamp}}></div>
                        <div className="lamp" style={{backgroundColor: this.state.greenlamp}}></div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default Trafficlightcomponent