import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import AppBar from 'material-ui/AppBar'
import AutoComplete from 'material-ui/AutoComplete'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import List from 'material-ui/svg-icons/action/list'
import IconButton from 'material-ui/IconButton'
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
class MaterialUIEx3Component extends React.Component {
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
    clearFacts = () => {
        this.setState({funFacts: ''})
    }
    clearSelection = () => {
        this.setState({selectedFruit:''})
    }
    render() {
        return (
            <MuiThemeProvider>
                <Card style={{marginTop: '5%', marginLeft:'5%', width: '90%'}}>
                    <AppBar title="INFO3069 - MaterialUI"
                            iconElementLeft={<IconMenu
                                iconButtonElement={<IconButton>
                                    <List color="white" />
                                </IconButton>}>
                                <MenuItem primaryText="Clear Fun Fact"
                                          onClick={this.clearFacts} />
                                <MenuItem primaryText="Clear Selection"
                                          onClick={this.clearSelection} />
                            </IconMenu>}>
                    </AppBar>
                    <CardHeader>
                        <div className="blueTitle">
                            Exercise #3
                        </div>
                    </CardHeader>
                    <CardText style={{textAlign: 'center'}}>
                        <AutoComplete
                            id="fruitIn"
                            floatingLabelText="Pick a fruit"
                            filter={AutoComplete.caseInsensitiveFilter}
                            onUpdateInput={this.handleUpdateInput}
                            dataSource={this.state.fruit}
                            onNewRequest={this.handleSelectedFruit}
                            searchText={this.state.selectedFruit}
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
export default MaterialUIEx3Component