import React from 'react';
import ContentRowLastProduct from './ContentRowLastProduct';
import ContentRowLastUser from './ContentRowLastUser';


function Actualizaciones() {

	return (
		<React.Fragment>

			<div className="row">
				<ContentRowLastProduct />

				<ContentRowLastUser />
			</div>

		</React.Fragment>
	)

}

export default Actualizaciones;