import React from 'react'
import ReactDOM from 'react-dom'
import ListItem from 'material-ui/List/ListItem'
import Bubble from './bubble'
import Triangle from './triangle'
class message extends React.Component {
    componentDidMount = () => {
        let userDOM = ReactDOM.findDOMNode(this)
        userDOM.scrollIntoView({block: "end", behavior: "smooth"})
        userDOM.blur()
    }


    render() {
        let position = this.props.message.from === this.props.name ? "userBubble" : "userBubble2";
        return (
            <div>
                <ListItem ref='user' style={{textAlign: 'left', marginBottom: '5px'}}
                          disabled={true}>
                    <Bubble position = {position} message={this.props.message}/>
                    <Triangle position = {position} color={this.props.message.color}/>
                </ListItem>
                &nbsp;
            </div> )
    }
}
export default message