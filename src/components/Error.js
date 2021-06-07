import React from 'react';
import styled from "@emotion/styled";

// Styled Components:
const MensajeError = styled.p`
    background-color: #B7322C;
    padding: 0.5rem;
    color: #FFF;
    font-size: 30px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    font-family: "Bebas Neue", cursive;
`;

const Error = ({mensaje}) => {
    return (
        <MensajeError>{mensaje}</MensajeError>
    )
}

export default Error;
