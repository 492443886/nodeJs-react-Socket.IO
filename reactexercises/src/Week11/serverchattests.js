import React from 'react'
import io from 'socket.io-client'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Dialog from 'material-ui/Dialog'
import logo from './logo.png'

import {CardTitle, Card, CardText}  from "material-ui/Card";

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import UserList from "./userlist"
import TopBar from "./TopBar"

import RoomsComponent from "./roomscomponent"
import {lightGreen800} from "material-ui/styles/colors";

import UserBubble from "./userbubble"

const Theme = getMuiTheme({
    palette:{primary1Color:lightGreen800},
    card:{primary1Color:lig htGreen800},
    textField:{textColor:lightGreen800}
});

class ServerTestComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            socket: null,
            chatName: '',
            roomName: '',
            msg:'',
            isTyping:false,
            joined: false,
            openDialogue: false,
            rooms: ["default"],
            users: [],
            chatNameError: "Please Enter a Unique Name",
            chatRoomError: "Please Enter the Room Name",
            messages:[],
            typingMsg:""
        }
    }
    componentDidMount = () => {

        //const socket = io.connect('localhost:5150', {'forceNew': true});

        const socket = io();
        this.setState({socket: socket})
        socket.on('welcome', this.onWelcome)
        socket.on('nameexists', this.onNameExists);
        socket.on('joined', this.onJoined)
        socket.on('currentusers', this.onCurrentusers)
        socket.on('currentrooms', this.onCurrentrooms)
        socket.on('createMessage', this.onCreateMessage)
        socket.on('typing', (dataFromServer)=> {this.setState({typingMsg : `${dataFromServer} is typing...`})} )


    }

    onCreateMessage=(dataFromServer)=>{
        let ms = this.state.messages;
        ms.push(dataFromServer);
        this.setState({
            messages: ms, typingMsg:""
        });

    }
    onCurrentusers = (dataFromServer) => {this.setState({users: dataFromServer})}


    onCurrentrooms = (dataFromServer) => {this.setState({rooms: dataFromServer})

    }

    onJoined = (dataFromServer) => {

        let ms = this.state.messages;
        ms.push(dataFromServer);
        this.setState({
            messages: ms,
        });

    }
    onNameExists = () => this.setState({chatNameError: "This name already exist"})

    onWelcome = (dataFromServer) => {
        let ms = this.state.messages;
        ms.push(dataFromServer);
        this.setState({
            messages: ms,joined:true
        });
    }
    handleScenario1Tests = () => this.state.socket.emit('join', {chatName: this.state.chatName, roomName: this.state.roomName})


    handleNameChange = (e) => {
        if (e.target.value.length !== 0) {
            this.setState({chatName: e.target.value, chatNameError: ''})
        } else {

            this.setState({ chatName: '', chatNameError: "Please Enter a Unique Name" });
        }
    }

    handleTyping = e => {
        this.setState({ msg: e.target.value })

        if (this.state.isTyping === false) {
            this.state.socket.emit(
                "typing", { from: this.state.chatName }, error => {}
            );
            this.setState({ isTyping: true });
        }
    };


    handleNewMessage = e => {
        e.preventDefault()
        this.state.socket.emit('createMessage', {from: this.state.chatName, text: this.state.msg}, (err) => {
        })
        this.setState({msg: '',isTyping: false})

    };

    handleOpenDialog = () => this.setState({openDialogue: true})
    handleCloseDialog = () => this.setState({openDialogue: false})

    handleSelectRoom = (e) =>{
        this.setState({roomName: e.target.value});
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={Theme}>
                <div>

                    <TopBar viewDialog={this.handleOpenDialog}/>

                    {this.state.joined === true &&
                        <Dialog title="Current Users" modal={false} open={this.state.openDialogue}
                                onRequestClose={this.handleCloseDialog}>

                            <UserList users={this.state.users}/>
                        </Dialog>
                    }

                    <div style={{ textAlign: "center"}}>
                        {!this.state.joined &&
                        <Card style={ {marginTop: '5%', marginLeft: '5%',padding: "5%", width: '90%'}}>

                            <img src= {logo} width="60" alt="logo"/>
                            <CardTitle title="Sign In"
                                       titleColor="#78b048" />


                            <CardText  style={{ margin: "5%",  border: "solid"}}>
                                <TextField
                                    hintText='Enter unique name'
                                    value={this.state.chatName}
                                    onChange={this.handleNameChange}
                                    errorText= {this.state.chatNameError}
                                />
                            </CardText>
                            <CardText  style={{ margin: "5%", textAlign: "left", border: "solid" }}>

                                <h3 style={{ color: "#78b048"}}>Join Existing or Enter Room Name</h3>
                                <RoomsComponent rooms = {this.state.rooms} selectRoom = {this.handleSelectRoom} />
                                <TextField
                                    hintText='Enter room'
                                    value={this.state.roomName}
                                    onChange={(e) => this.setState({roomName: e.target.value, chatNameMsg: ''})}
                                    errorText={this.state.roomName === ""&&this.state.chatRoomError}
                                />
                                <br/>
                            </CardText>

                            <RaisedButton label="Join"
                                          labelColor={'#ffffff'}
                                          backgroundColor={'#0D47A1'}
                                          onClick={this.handleScenario1Tests}
                                          disabled={this.state.chatName === ""|| this.state.roomName === ""}
                            />


                        </Card>
                        }

                        {this.state.joined &&

                            <Card style={ {marginTop: '5%', marginLeft: '5%',padding: "5%", width: '90%'}}>
                                <UserBubble messages={this.state.messages} name = {this.state.chatName}/>

                                <form onSubmit={this.handleNewMessage}>
                                <TextField
                                hintText='Enter message'
                                value={this.state.msg}
                                onChange={this.handleTyping}
                                />
                                </form>
                                <div>
                                    {this.state.typingMsg}
                                </div>
                            </Card>
                        }

                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default ServerTestComponent