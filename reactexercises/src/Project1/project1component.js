import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem'
import List from 'material-ui/svg-icons/action/list'
import IconButton from 'material-ui/IconButton'
import Snackbar from 'material-ui/Snackbar'
import '../App.css'
import logo from './logo.png'


import AlertComponent from './alertsetupcomponent'
import Advisoryaddcomponent from './advisoryaddcomponent'
import Advisorylistcomponent from './advisorylistcomponent'

import getMuiTheme from 'material-ui/styles/getMuiTheme'




import {lightGreen800} from "material-ui/styles/colors";
const muiTheme = new getMuiTheme({
    palette:{primary1Color:lightGreen800},

    card:{primary1Color:lightGreen800},
    textField:{textColor:lightGreen800}
})

const urls = require('./urls')
class Project1 extends React.PureComponent {
    constructor() {
        super()
        this.state = {

            setupAlerts: false,
            addadvisory: false,
            listadvisory: false,
            AlertsMsg: [],
            usernames:[],

            countries: [],
            countriesname:[],
            names: [],

            snackbarMsg:"",
            gotData: false
        }

    }


    setUp = async () => {

        try {
            let response = await fetch(urls.ALERTSETUPURL)
            let json = await response.json()
            json = json.results
            json = json.split(". ")
            this.setState({AlertsMsg: json})

        }
        catch (error) {
            this.setState({snackbarMsg: 'Problem setUp'})
            this.setState({gotData: true})
        }
    }

    fetchCountries= async () => {

        try {
            let response = await fetch(urls.COUNTRIESURL)
            let json = await response.json()
            this.setState({countries: json})
            this.setState({countriesname: []})

            this.state.countries.forEach(e => this.state.countriesname.push(e.Name))


        }
        catch (error) {
            this.setState({snackbarMsg: 'Problem fetch countries'})
            this.setState({gotData: true})
        }
    }

    fetchNames= async () => {

        try {
            let response = await fetch(urls.GETUNIQUENAME)
            let json = await response.json()
            this.setState({names: json})

        }
        catch (error) {
            this.setState({snackbarMsg: 'Problem fetching name'})

        }
    }



    homeClick= async () => {

        this.setState({setupAlerts: false})
        this.setState({listadvisory: false})
        this.setState({addadvisory: false})

    }

    setupClick= async () => {


        await this.setUp()

        this.setState({setupAlerts: true})
        this.setState({listadvisory: false})
        this.setState({addadvisory: false})

    }

    addOnClick= async () => {

        try {

            //let d =new Date()

            await this.fetchCountries()

            this.setState({setupAlerts: false})
            this.setState({listadvisory: false})
            this.setState({addadvisory: true})


        }
        catch (error) {
            this.setState({snackbarMsg: 'Problem add data'})
            this.setState({gotData: true})
        }
    }

    listClick= async () => {

        try {

            await this.fetchNames()
            this.setState({setupAlerts: false})
            this.setState({addadvisory: false})
            this.setState({listadvisory: true})

            //this.setState({snackbarMsg: 'Problem loading server data'})
            //this.setState({snackbarMsg: this.refs.ew})
            //this.setState({gotData: true})


        }
        catch (error) {
            this.setState({snackbarMsg: 'Problem loading server data'})
            this.setState({gotData: true})
        }
    }

    ListCallBack = (msg) => {

        this.setState({snackbarMsg: msg})
        this.setState({gotData: true})

    }


    handleRequestClose = () => {
        this.setState({gotData: false});
        this.setState({snackbarMsg: ''})
    }


    render() {
        return (

            <MuiThemeProvider muiTheme={muiTheme}>
                <Card style={{marginTop: '5%', marginLeft: '1%', width: '98%'}}>
                    <AppBar title="INFO3069 - Case #1"
                            iconElementLeft={
                                <IconMenu iconButtonElement={<IconButton><List color="white"/></IconButton>}>
                                    <MenuItem primaryText="Home" onClick={this.homeClick}/>
                                    <MenuItem primaryText="Setup Alert" onClick={this.setupClick} />
                                    <MenuItem primaryText="Add Tourist Advisories" onClick={this.addOnClick}/>
                                    <MenuItem primaryText="List Tourist Advisories" onClick={this.listClick}/>
                                </IconMenu>
                            }>
                    </AppBar>
                    <CardHeader style={{textAlign: 'center'}}>

                        <div style={{textAlign: 'center'}}>
                        <img src= {logo} width="60" alt="logo"/>
                        <h5>World Wide Travel Alerts</h5>

                        </div>
                    </CardHeader>
                    <CardText style={{textAlign: 'center'}}>

                        {!this.state.setupAlerts ? null : <AlertComponent alertmsg={this.state.AlertsMsg}/>}

                        {!this.state.addadvisory ? null : <Advisoryaddcomponent ListCallBack={this.ListCallBack} countrynames={this.state.countriesname}/>}

                        {!this.state.listadvisory ? null : <Advisorylistcomponent names = {this.state.names}/>}



                    </CardText>
                    <Snackbar
                        open={this.state.gotData}
                        message={this.state.snackbarMsg}
                        autoHideDuration={2000}
                        onRequestClose={this.handleRequestClose}
                    />
                </Card>
            </MuiThemeProvider>

        )
    }
}
export default Project1