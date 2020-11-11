import React from 'react'
import '../App.css'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';



class AlertComponent extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            Alerts: props.alertmsg,
            usernames:[]

        }
    }



    render() {
        return (

        <Table>
            <TableHeader
                adjustForCheckbox ={false}
                displaySelectAll ={false}
            >
                <TableRow>
                    <TableHeaderColumn style={{textAlign: 'center'}}>Setupresult</TableHeaderColumn>
                </TableRow>
                <TableRow>
                    <TableHeaderColumn>steps</TableHeaderColumn>

                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {this.state.Alerts.map( (row, index) => (
                    <TableRow key={index}>
                        <TableRowColumn style ={{wordWrap:'break-word', whiteSpace: 'normal'}}>{row}</TableRowColumn>
                    </TableRow>
                ))}

            </TableBody>
        </Table>

        )
    }
}
export default AlertComponent