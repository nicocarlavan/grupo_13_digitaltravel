import React, { Component } from 'react';
import Hotel from './Hotel';


class HotelesInDb extends Component {

    constructor() {
        super()
        this.state = {
            categories: []
        }
    }
    componentDidMount() {
        fetch('/api/products')
            .then(respuesta => {
                return respuesta.json()
            })
            .then(productos => {

                let categories = Object.entries(productos.data.countByCategory);
                this.setState({
                    categories: categories
                })
            })
            .catch(error => console.log('Error: ' + error))
    }

    render() {
        return (
            <React.Fragment>

                <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-gray-800">Habitaciones por Hotel</h6>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {
                                    this.state.categories.map((category, index) => {
                                        return <Hotel name={category[0]} quantity={category[1]} key={index} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }


}
export default HotelesInDb;