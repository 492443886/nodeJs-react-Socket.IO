import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar'
import AutoComplete from 'material-ui/AutoComplete'
import '../App.css'
const fruit = [
    'Apple', 'Apricot', 'Avocado',
    'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
    'Boysenberry', 'Blood Orange',
    'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry',
    'Coconut', 'Cranberry', 'Clementine',
    'Damson', 'Date', 'Dragonfruit', 'Durian',
    'Elderberry',
    'Feijoa', 'Fig',
    'Goji berry', 'Gooseberry', 'Grape', 'Grapefruit', 'Guava',
    'Honeydew', 'Huckleberry',
    'Jabouticaba', 'Jackfruit', 'Jambul', 'Jujube', 'Juniper berry',
    'Kiwi fruit', 'Kumquat',
    'Lemon', 'Lime', 'Loquat', 'Lychee',
    'Nectarine',
    'Mango', 'Marion berry', 'Melon', 'Miracle fruit', 'Mulberry', 'Mandarine',
    'Olive', 'Orange',
    'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Physalis', 'Plum', 'Pineapple',
    'Pumpkin', 'Pomegranate', 'Pomelo', 'Purple Mangosteen',
    'Quince',
    'Raspberry', 'Raisin', 'Rambutan', 'Redcurrant',
    'Salal berry', 'Satsuma', 'Star fruit', 'Strawberry', 'Squash', 'Salmonberry',
    'Tamarillo', 'Tamarind', 'Tomato', 'Tangerine',
    'Ugli fruit',
    'Watermelon',
]
class MaterialUIEx2Component extends React.Component {
    constructor() {
        super()
        this.state = {
            fruit: fruit,
            selectedFruit: '',
            funFacts: ''
        }
    }
    handleUpdateInput = (searchPick) => {
        this.setState({selectedFruit: searchPick})
    }
    handleSelectedFruit = (searchPick) => {
        this.setState({funFacts:
                `some interesting stuff about ${this.state.selectedFruit} would go here`})
    }
    render() {
        return (
            <MuiThemeProvider>
                <Card style={{marginTop: '5%', marginLeft:'5%', width: '90%'}}>
                    <Toolbar style={{backgroundColor: '#00BCD4', color:'white'}}>
                        <ToolbarTitle text="INFO3069 - MaterialUI" />
                    </Toolbar>
                    <CardHeader>
                        <div className="blueTitle">
                            Exercise #2
                        </div>
                    </CardHeader>
                    <CardText style={{textAlign: 'center'}}>
                        <AutoComplete
                            floatingLabelText="Pick a fruit"
                            filter={AutoComplete.caseInsensitiveFilter}
                            onUpdateInput={this.handleUpdateInput}
                            dataSource={this.state.fruit}
                            onNewRequest={this.handleSelectedFruit}
                        />
                        <div className="alertText">
                            {this.state.selectedFruit}
                        </div>
                        {this.state.funFacts.length > 0 &&
                        <p className="blueTitle">{this.state.funFacts}</p>
                        }
                    </CardText>
                </Card>
            </MuiThemeProvider>
        )
    }
}
export default MaterialUIEx2Component
