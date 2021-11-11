import React, { Component } from 'react';
import ProductList from './ProductList';

class Product extends Component {

	constructor() {
		super()
		this.state = {
			listadoProductos: []
		}
	}
	componentDidMount() {
		fetch('/api/products')
			.then(respuesta => {
				return respuesta.json()
			})
			.then(productos => {
				this.setState({
					listadoProductos: productos.data.products
				})

			})
			.catch(error => console.log('Error: ' + error))
	}
	render() {


		return (
			<React.Fragment>
				{/*<!-- PRODUCTS LIST -->*/}


				<div className="card shadow mb-4 w-100">
					<h1 className="h3 mb-2 text-gray-800">Listado de Productos</h1>
					<div className="card-body">
						<div className="table-responsive">
							<table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
								<thead>
									<tr>
										<th>ID</th>
										<th>Hotel</th>
										<th>Tipo de Habitación</th>
										<th>Descripción</th>
										<th>Detalle</th>
									</tr>
								</thead>

								<tbody>
									{
										this.state.listadoProductos.map((producto, index) => {
											return <ProductList {...producto} key={producto.id} />
										})
									}
								</tbody>
								<tfoot>
									<tr>
										<th>ID</th>
										<th>Hotel</th>
										<th>Tipo de Habitación</th>
										<th>Descripción</th>
										<th>Detalle</th>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
				</div>
			</React.Fragment>
		)

	}

}
export default Product;