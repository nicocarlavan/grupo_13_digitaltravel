import React, { Component } from 'react';
import SmallCard from './SmallCard';

let products = {
    color: "primary",
    titulo: "Productos en Base de Datos",
    icono: "fas fa-cart-plus",
}

let hotels = {
    color: "success",
    titulo: "Hoteles en Base de Datos",
    icono: "fas fa-concierge-bell",
}

let users = {
    color: "warning",
    titulo: "Usuarios en Base de Datos",
    icono: "fas fa-user",
}

let cardProps = [products, hotels, users];


class ContentRowTop extends Component {

    constructor() {
        super()
        this.state = {
            productsQuantity: 0,
            hotelsQuantity: 0,
            usersQuantity: 0
        }
    }
    componentDidMount() {
        fetch('/api/products')
            .then(resultado => {
                return resultado.json()
            })
            .then(productos => {
                this.setState({
                    productsQuantity: productos.data.count,
                    hotelsQuantity: Object.keys(productos.data.countByCategory).length
                })
            })
            .catch(error => console.log('Error: ' + error));
        fetch('/api/users')
            .then(resultado => {
                return resultado.json()
            })
            .then(usuarios => {
                this.setState({
                    usersQuantity: usuarios.meta.count
                })
            })
            .catch(error => console.log('Error: ' + error));
    }

    render() {
        let values = Object.values(this.state);
        return (
            <React.Fragment>

                {/*<!-- Content Row -->*/}
                <div className="row">
                    {
                        cardProps.map((elemento, index) => {
                            return <SmallCard  {...elemento} key={index} quantity={values[index]} />
                        })
                    }
                </div>
            </React.Fragment>
        )
    }

}
export default ContentRowTop;