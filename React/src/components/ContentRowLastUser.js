import React, { Component } from 'react';

class ContentRowLastUser extends Component {

    constructor() {
        super()
        this.state = {
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            image: '',
            detail: ''
        }
    }
    componentDidMount() {
        fetch('/api/users')
            .then(resultado => {
                return resultado.json()
            })
            .then(users => {
                this.setState({
                    ...users.data[users.data.length - 1]
                })
            })
            .catch(error => console.log('Error: ' + error));
    }

    render() {
        return (
            <React.Fragment>

                <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h5 className="m-0 font-weight-bold text-gray-800">Último Usuario en Base de Datos</h5>
                        </div>
                        <div className="card-body">
                            <div className="text-center">
                                <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 30 + 'rem' }} src={this.state.image} alt=" Star Wars - Mandalorian " />
                            </div>
                            <h4>{this.state.firstName} {this.state.lastName}</h4>
                            <p>{this.state.email}</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}
export default ContentRowLastUser;