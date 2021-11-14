import React from 'react';
import Actualizaciones from './Actualizaciones';
import ContentRowCards from './ContentRowCards';
import HotelesInDb from './HotelesInDb';
function ContentRowTop() {
	return (
		<React.Fragment>
			{/*<!-- Content Row Top -->*/}
			<div className="container-fluid">
				<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
					<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
				</div>

				<ContentRowCards />

				<div className="row">
					<HotelesInDb />
				</div>

				<div className="row">
					<Actualizaciones />
				</div>

			</div>
			{/*<!--End Content Row Top-->*/}

		</React.Fragment>
	)

}
export default ContentRowTop;