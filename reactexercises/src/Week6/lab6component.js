import React from 'react'
import '../App.css'
class PureClassyComponent extends React.PureComponent {
    constructor() {
        super()
        this.state = {  word: '' , msg: ''}
    }
    appendMsg() {

        this.setState({ msg: this.state.msg + " " + this.state.word })
        this.setState({ word: ""})
    }
    clearMsg() {

        this.setState({ msg: ""})
        this.setState({ word: ""})
    }

    handleChange(value){

        this.setState({ word: value })

    }

    render() {
        return (
            <h3>
                The message is:  {this.state.msg}<br/><br/>
                <input type="text" value={this.state.word} onChange={(event) => this.handleChange(event.target.value)} />
                <input type="submit" value="Add Word" onClick={() => this.appendMsg()}/><br/><br/>

                <input type="submit"  value="clear msg" onClick={() => this.clearMsg()}/>
                {/*This is a class based <span class="bigred">PURE</span>component! The button was clicked*/}
                {/*<span className="bigred">{this.state.clicks}</span> times.<p></p>*/}
                {/*<input type="submit" value="Click me!" onClick={() => this.increment()}/>*/}
            </h3>
        )
    }
}
export default PureClassyComponent