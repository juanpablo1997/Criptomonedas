import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

// Styled Components:
const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: normal;
    font-size: 1.2rem;
    margin-top: 1rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 0.5rem;
    -webkit-appearance: none;
    border-radius: 5px;
    border: none;
    outline: none;
    cursor: pointer;
`;

const useCriptomoneda = (label, stateInicial, criptomonedas) => {
  // State de mi custom hook:
  const [state, actualizarState] = useState(stateInicial);

  // Esto se renderiza en pantalla:
  // Nota: Al retornar un componente simepre hacer con () y no con {}
  const SeleccionarCriptomoneda = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select
        onChange={e => actualizarState(e.target.value)}
        value={state}
      >
        <option value="">Seleccione moneda</option>
        {criptomonedas.map(opcion => (
            <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
        ))}  
      </Select>
    </Fragment>
  );

  // Retorno State, interfaz y función que modifica el State:
  return [state, SeleccionarCriptomoneda, actualizarState];
};

export default useCriptomoneda;