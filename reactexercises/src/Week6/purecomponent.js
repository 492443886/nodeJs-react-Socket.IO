import React from 'react'
import '../App.css'
class PureClassyComponent extends React.PureComponent {
    constructor() {
        super()
        this.state = { clicks: 0 }
    }
    increment() {
        this.setState({ clicks: this.state.clicks + 1 })
    }
    render() {
        return (
            <h3>
                This is a class based <span class="bigred">PURE</span>component! The button was clicked
                <span className="bigred">{this.state.clicks}</span> times.<p></p>
                <input type="submit" value="Click me!" onClick={() => this.increment()}/>
            </h3>
        )
    }
}
export default PureClassyComponent