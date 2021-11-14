import React from "react";

function ProductList(props) {
    return (
        <React.Fragment>
            <tr>
                <td>
                    {props.id}
                </td>
                <td>
                    <img src={props.image} width="100px" alt={props.name} />
                </td>
                <td>
                    {props.name}
                </td>
                <td>
                    {props.roomType}
                </td>
                <td>
                    {props.roomCategory}
                </td>
                <td>
                    {props.description}
                </td>
                <td>
                    ${props.price}
                </td>
                <td>
                    {props.discountRate}%
                </td>
            </tr>
        </React.Fragment>
    )

}

export default ProductList;