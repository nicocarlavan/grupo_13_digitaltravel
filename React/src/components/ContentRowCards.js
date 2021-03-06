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

let offers = {
    color: "danger",
    titulo: "Productos en Oferta",
    icono: "fas fa-dollar-sign",
}

let cardProps = [products, hotels, users, offers];


class ContentRowTop extends Component {

    constructor() {
        super()
        this.state = {
            productsQuantity: 0,
            hotelsQuantity: 0,
            usersQuantity: 0,
            offersQuantity: 0
        }
    }
    componentDidMount() {
        fetch('/api/products')
            .then(resultado => {
                return resultado.json()
            })
            .then(productos => {
                let aux = 0;
                productos.data.products.forEach(producto => {
                    if (producto.discountRate !== 0) {
                        aux += 1;
                    }
                });
                this.setState({
                    productsQuantity: productos.data.count,
                    hotelsQuantity: Object.keys(productos.data.countByCategory).length,
                    offersQuantity: aux
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