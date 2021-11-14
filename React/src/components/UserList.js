import React from "react";

function UserList(props) {
    return (
        <React.Fragment>
            <tr>
                <td>
                    {props.id}
                </td>
                <td>
                    <img src={props.image} width="100px" alt="Imagen de Perfil" />
                </td>
                <td>
                    {props.firstName}
                </td>
                <td>
                    {props.lastName}
                </td>
                <td>
                    {props.email}
                </td>
            </tr>
        </React.Fragment>
    )

}

export default UserList;