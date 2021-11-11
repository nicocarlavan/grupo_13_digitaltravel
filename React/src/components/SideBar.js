import React from 'react';
import image from '../assets/images/LogoAvion.png';
import { Route, Link, Routes } from 'react-router-dom';
import ContentWrapper from './ContentWrapper';
import HotelesInDb from './HotelesInDb';
import Actualizaciones from './Actualizaciones';
import Product from './Product';
import Error404 from './Error404';

function SideBar() {
    return (
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-50 p-2" src={image} alt="Digital House" />
                    </div>
                </Link>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0" />

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - Digital Travel</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider" />

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Actions</div>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="Actualizaciones">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Últimas actualizaciones</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Charts -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="HotelesInDb">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Hoteles</span></Link>
                </li>

                {/*<!-- Nav Item - Tables -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="Product">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Listado de Productos</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block" />
            </ul>
            {/*<!-- End of Sidebar -->*/}

            <Routes>
                <Route exact path='/' element={<ContentWrapper />} />
                <Route path='/HotelesInDb' element={<HotelesInDb />} />
                <Route path='/Product' element={<Product />} />
                <Route path='/Actualizaciones' element={<Actualizaciones />} />
                <Route path='*' element={<Error404 />} />
            </Routes>

        </React.Fragment>
    )
}
export default SideBar;