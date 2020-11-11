import React from 'react'

import AutoComplete from 'material-ui/AutoComplete'

import '../App.css'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const urls = require('./urls')


class Advisorylistcomponent extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            traveler: "",
            travelers: props.names,

            advisories:[],
        }

    }

    fetchAdvisories= async () => {

        try {
            let response = await fetch(urls.GETDAVISORYBYNAME + this.state.traveler)
            let json = await response.json()
            this.setState({advisories: json})

        }
        catch (error) {


        }
    }


    handleUpdateInput = (searchPick) => {
        this.setState({traveler: searchPick})
    }
    handleSelectedTravler = (searchPick) => {


        this.setState({traveler: searchPick})
        this.fetchAdvisories()


    }

    render() {
        return (

            <div>

                <h3 style={{textAlign: 'center'}}>

                    Advisories for {this.state.traveler}
                </h3>

                <AutoComplete
                    floatingLabelText="Country of Traveler"
                    filter={AutoComplete.caseInsensitiveFilter}
                    onUpdateInput={this.handleUpdateInput}
                    dataSource={this.state.travelers}
                    onNewRequest={this.handleSelectedTravler}
                    // value ={this.state.traveler}
                />

                <Table>
                    <TableHeader
                        adjustForCheckbox ={false}
                        displaySelectAll ={false}
                    >
                        <TableRow>
                            <TableHeaderColumn width="20%" >Country</TableHeaderColumn>
                            <TableHeaderColumn width="80%">Alert</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody  displayRowCheckbox={false}>
                        {this.state.advisories.map( (row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn width={'20%'} >{row.country}</TableRowColumn>

                                <TableRowColumn  style ={{wordWrap:'break-word', whiteSpace: 'normal'}}>{row.alert +  " - " + row.date}</TableRowColumn>

                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </div>


        )
    }
}
export default Advisorylistcomponent