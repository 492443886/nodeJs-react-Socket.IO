import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SocketClientComponent from './socketclientcomponent'
class AllRoomsComponent extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <SocketClientComponent name="some geek" room="geeks" />
                    <SocketClientComponent name="nerd1" room="nerds" />
                    <SocketClientComponent name="nerd2" room="nerds" />
                </div>
            </MuiThemeProvider>
        )
    }
}
export default AllRoomsComponent