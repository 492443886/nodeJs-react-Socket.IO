import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar'
import '../App.css'
const MaterialUIEx1Component = () => (
    <MuiThemeProvider>
        <Card style={{marginTop: '10%', marginLeft:'5%', width: '90%'}}>
            <Toolbar style={{backgroundColor: '#00BCD4', color:'white'}}>
                <ToolbarTitle text="INFO3069 - MaterialUI" />
            </Toolbar>
            <CardHeader>
                <div className="blueTitle">Exercise #1</div>
            </CardHeader>
            <CardText style={{textAlign: 'center'}}>cool stuff goes here</CardText>
        </Card>
    </MuiThemeProvider>
)
export default MaterialUIEx1Component