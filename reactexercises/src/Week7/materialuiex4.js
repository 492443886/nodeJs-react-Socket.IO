import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import AppBar from 'material-ui/AppBar'
import AutoComplete from 'material-ui/AutoComplete'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem'
import List from 'material-ui/svg-icons/action/list'
import IconButton from 'material-ui/IconButton'
import Snackbar from 'material-ui/Snackbar'
import '../App.css'
class MaterialUIEx4Component extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
            usernames: [],
            selectedMsg: '',
            userInfo: '',
            gotData: false,
            snackbarMsg: ''
        }
    }
    handleUpdateInput = (searchPick) => {
        this.setState({selectedMsg: searchPick})
    }
    handleSelectedUsername = (searchPick) => {
        let user = this.state.users.find(u => u.name === searchPick)
        this.setState({userInfo: `${user.name} 's email is ${user.email}`})
        this.setState({selectedMsg: `${user.name} selected!`})
    }
    handleRequestClose = () => {
        this.setState({gotData: false});
    }
    fetchUsers = async () => {
        this.setState({selectedMsg: ''})
        this.setState({userInfo: ''})
        try {
            let response = await fetch('http://127.0.0.1:5150/users')
            let json = await response.json()
            this.setState({users: json})
            this.setState({usernames: []})
            this.state.users.forEach(user => this.state.usernames.push(user.name))
            this.setState({snackbarMsg: 'Server data loaded'})
            this.setState({gotData: true})
        }
        catch (error) {
            this.setState({selectedMsg: 'Problem loading server data'})
            this.setState({gotData: false})
        }
    }
    render() {
        return (
            <MuiThemeProvider>
                <Card style={{marginTop: '5%', marginLeft: '5%', width: '90%'}}>
                    <AppBar title="INFO3069 - MaterialUI"
                            iconElementLeft={
                                <IconMenu iconButtonElement={<IconButton><List color="white"/></IconButton>}>
                                    <MenuItem primaryText="Grab Users" onClick={this.fetchUsers}/>
                                </IconMenu>
                            }>
                    </AppBar>
                    <CardHeader>
                        <div className="blueTitle">
                            Exercise #4
                        </div>
                    </CardHeader>
                    <CardText style={{textAlign: 'center'}}>
                        <AutoComplete
                            floatingLabelText="Pick a User"
                            filter={AutoComplete.caseInsensitiveFilter}
                            onUpdateInput={this.handleUpdateInput}
                            dataSource={this.state.usernames}
                            onNewRequest={this.handleSelectedUsername}
                        />
                        <div className="alertText">{this.state.selectedMsg}</div>
                        {this.state.userInfo.length > 0 &&
                        <p className="blueTitle">{this.state.userInfo}</p>
                        }
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
export default MaterialUIEx4Component