import React, { Component } from 'react';

class Hotel extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="col-lg-6 mb-4">
                    <div className="card text-white bg-dark  shadow">
                        <div className="card-body">
                            {this.props.name}: {this.props.quantity}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}
export default Hotel;