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
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
class Lab7Component extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
            usernames: [],
            selectedMsg: '',
            userInfo: '',
            gotData: false,
            snackbarMsg: '',
            add: false,

            name:'',
            age:0,
            email:'',
        }
    }
    handleUpdateInput = (searchPick) => {
        this.setState({selectedMsg: searchPick})
    }
    handleSelectedUsername = (searchPick) => {
        let user = this.state.users.find(u => u.name === searchPick)
        this.setState({userInfo: `${user.name} 's email is ${user.email} and he or she is ${user.age} years old`})
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

    toAddPage = async () => {

        this.setState({add: true})
    }

    PostUser= async() => {

        let user = {name: this.state.name, age: this.state.age, email: this.state.email }

        let userStr = JSON.stringify(user)
        let myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        try {
            let response = await fetch('http://127.0.0.1:5150/users', {
                method: 'POST',
                headers: myHeaders,
                body: userStr
            })

            let json =  await response.json()
            this.setState({snackbarMsg: json.msg})
            this.setState({gotData: true})
        }

        catch (error) {
            this.setState({selectedMsg: 'Problem loading Add User'})
            this.setState({gotData: false})
        }

        this.setState({add: false})
    }
    render(){
        return (
            <MuiThemeProvider>

                {this.state.add === true &&
                    <Card style={{marginTop: '5%', marginLeft: '5%', width: '90%'}}>
                        <AppBar title="INFO3069 - MaterialUI"
                                iconElementLeft={
                                    <IconMenu iconButtonElement={<IconButton><List color="white"/></IconButton>}>
                                        <MenuItem primaryText="Grab Users" onClick={this.fetchUsers}/>
                                        <MenuItem primaryText="Add Users" onClick={this.toAddPage}/>
                                    </IconMenu>
                                }>
                        </AppBar>
                        <CardText style={{textAlign: 'center'}}>
                            <CardHeader>
                                <div className="blueTitle">
                                    ADD NEW USER - LAB#7
                                </div>
                            </CardHeader>
                            <TextField hintText="Enter User's Name Here" onChange={(event) =>this.setState({name: event.target.value}) }/>
                            <TextField  hintText="Enter User's Age Here" onChange={(event) =>this.setState({age: event.target.value}) } />
                            <TextField  hintText="Enter User's Email here" onChange={(event) =>this.setState({email: event.target.value}) }/>
                            <RaisedButton label="Add" primary={true} onClick={this.PostUser} />
                        </CardText>
                    </Card>
                }

                {this.state.add === false &&
                    <Card style={{marginTop: '5%', marginLeft: '5%', width: '90%'}}>
                    <AppBar title="INFO3069 - MaterialUI"
                            iconElementLeft={
                                <IconMenu iconButtonElement={<IconButton><List color="white"/></IconButton>}>
                                    <MenuItem primaryText="Grab Users" onClick={this.fetchUsers}/>
                                    <MenuItem primaryText="Add Users" onClick={this.toAddPage}/>
                                </IconMenu>
                            }>
                    </AppBar>
                    <CardHeader>
                        <div className="blueTitle">
                            Lab#7
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

                </Card>
                             }

                <Snackbar
                    open={this.state.gotData}
                    message={this.state.snackbarMsg}
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                />
            </MuiThemeProvider>
        )
    }
}
export default Lab7Component