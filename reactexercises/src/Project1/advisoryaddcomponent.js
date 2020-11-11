import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardHeader, CardText} from 'material-ui/Card'

import AutoComplete from 'material-ui/AutoComplete'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../App.css'


import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {lightGreen800} from "material-ui/styles/colors";


const urls = require('./urls')

const muiTheme = new getMuiTheme({
    palette:{primary1Color:lightGreen800},

    card:{primary1Color:lightGreen800},
    textField:{textColor:lightGreen800}
})


class Advisoryaddcomponent extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            traveler: "",
            country: "",


            addDisable: true,

            countriesname: props.countrynames
        }

        //this.fetchCountries()
    }


    addAdvisory = async () => {

        let advisory = {traveler: this.state.traveler, country: this.state.country}

        let advisoryStr = JSON.stringify(advisory)
        let myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        let json = ""
        try {
            let response = await fetch(urls.ADDADVISORY, {
                method: 'POST',
                headers: myHeaders,
                body: advisoryStr
            })

            json =  await response.json()

            this.setState({traveler: ""})
            this.setState({country: ""})

            this.props.ListCallBack(json.msg)

        }
        catch (error) {
            this.props.ListCallBack(json.msg)
        }
    }


    handleUpdateInput = (searchPick) => {
        this.setState({country: searchPick})
    }
    handleSelected = (searchPick) => {

        this.setState({country: searchPick})


    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Card style={{marginTop: '5%', marginLeft: '5%', width: '90%'}} >
                    <CardHeader style={{textAlign: 'center'}}>

                        <h3 style={{textAlign: 'center'}}>

                            Add advisory

                        </h3>
                    </CardHeader>
                    <CardText style={{textAlign: 'center'}}>

                        <TextField fullWidth={true} hintText="Enter Traveler's Name Here" errorText={this.state.traveler === "" &&'This field is required!'}  value={this.state.traveler} onChange={(event) =>this.setState({traveler: event.target.value})} />


                        <AutoComplete
                            // style={{ marginBottom: "25px"}}
                            floatingLabelText="Country of Traveler"
                            errorText={this.state.country === ""&&'This field is required!'}
                            searchText={this.state.country}
                            filter={AutoComplete.caseInsensitiveFilter}
                            onUpdateInput={this.handleUpdateInput}
                            dataSource={this.state.countriesname}
                            onNewRequest={this.handleSelected}
                            fullWidth={true}
                        />
                        <RaisedButton label="Add" disabled={(this.state.traveler === "" || this.state.country === "")?true: false} primary={true} onClick={this.addAdvisory} />
                    </CardText>

                </Card>
            </MuiThemeProvider>

        )
    }
}
export default Advisoryaddcomponent