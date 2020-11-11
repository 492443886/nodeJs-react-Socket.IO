import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Trafficlightcomponent from './trafficlightcomponent';
class Parents extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        return (
            <MuiThemeProvider>
                <div className="MaDiv">
                    <Trafficlightcomponent street="Ma"/>
                </div>

                <div className="MaDiv" >
                    <Trafficlightcomponent street="Chunhui"/>
                </div>

                <div className="MaDiv" >
                    <Trafficlightcomponent street="Info3069"/>
                </div>

                <div className="MaDiv" >
                    <Trafficlightcomponent street="Broadway"/>
                </div>

            </MuiThemeProvider>
        )
    }
}
export default Parents