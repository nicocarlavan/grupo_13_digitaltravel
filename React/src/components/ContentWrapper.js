import React from 'react';
import ContentRowTop from './ContentRowTop';
import Product from './Product';
import User from './User';
import Footer from './Footer';
function ContentWrapper() {
    return (
        <React.Fragment>
            {/*<!-- Content Wrapper -->*/}
            <div id="content-wrapper" className="d-flex flex-column">
                {/*<!-- Main Content -->*/}
                <div id="content">
                    <ContentRowTop />
                    <Product />
                    <User />
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    )
}
export default ContentWrapper;