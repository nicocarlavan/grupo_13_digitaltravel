import React, { Component } from 'react';
import UserList from './UserList';

class User extends Component {

	constructor() {
		super()
		this.state = {
			listadoUsuarios: []
		}
	}
	componentDidMount() {
		fetch('/api/users')
			.then(respuesta => {
				return respuesta.json()
			})
			.then(usuarios => {
				this.setState({
					listadoUsuarios: usuarios.data
				})

			})
			.catch(error => console.log('Error: ' + error))
	}
	render() {


		return (
			<React.Fragment>
				{/*<!-- USERS LIST -->*/}


				<div className="card shadow mb-4 w-100">
					<h1 className="h3 mb-2 text-gray-800">Listado de Usuarios</h1>
					<div className="card-body">
						<div className="table-responsive">
							<table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
								<thead>
									<tr>
										<th>ID</th>
										<th>Imagen</th>
										<th>Nombre</th>
										<th>Apellido</th>
										<th>Email</th>
									</tr>
								</thead>

								<tbody>
									{
										this.state.listadoUsuarios.map((usuario, index) => {
											return <UserList {...usuario} key={usuario.id} />
										})
									}
								</tbody>
								<tfoot>
									<tr>
										<th>ID</th>
										<th>Imagen</th>
										<th>Nombre</th>
										<th>Apellido</th>
										<th>Email</th>
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
export default User;