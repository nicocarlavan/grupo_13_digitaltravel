import React, { Component } from 'react';


class ContentRowLastProduct extends Component {

    constructor() {
        super()
        this.state = {
            id: 0,
            name: '',
            roomType: '',
            roomCategory: '',
            description: '',
            price: '',
            discountRate: '',
            detail: ''
        }
    }
    componentDidMount() {
        fetch('/api/products')
            .then(resultado => {
                return resultado.json()
            })
            .then(productos => {
                console.log(productos)
                this.setState({
                    ...productos.data.products[productos.data.products.length - 1]
                })
                console.log(this.state)
            })
            .catch(error => console.log('Error: ' + error));
    }

    render() {
        return (
            <React.Fragment>

                <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h5 className="m-0 font-weight-bold text-gray-800">Último Producto en Base de Datos</h5>
                        </div>
                        <div className="card-body">
                            <div className="text-center">
                                <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 40 + 'rem' }} src={this.state.image} alt=" Star Wars - Mandalorian " />
                            </div>
                            <h4>{this.state.name}</h4>
                            <p>{this.state.description}</p>
                            <p>${this.state.price}</p>
                            <p>{this.state.discountRate}%</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}
export default ContentRowLastProduct;