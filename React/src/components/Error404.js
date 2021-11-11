import React from "react";

function Error404() {
    return (
        <React.Fragment>
            <div className="m-auto">

                <h3 className="card text-center text-white bg-danger p-1">
                    Esa ruta no existe!
                </h3>
            </div>
        </React.Fragment>
    )
}

export default Error404;