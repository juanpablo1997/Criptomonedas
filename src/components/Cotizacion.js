import React from "react";
import styled from "@emotion/styled";

// Styled Components:
const ResultadoDiv = styled.div`
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  user-select: none;
`;

const Informacion = styled.p`
  font-size: 16px;
  span {
    font-weight: bold;
  }
`;

const Precio = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #f5b041;
  span {
    font-weight: bold;
    color: #f39c12;
    transition: color 0.2s ease;

    &:hover {
      color: #fff;
      border: 0.5px solid #fff;
      border-radius: 5px;
      padding: 5px;
    }
  }
`;

const Cotizacion = ({ resultado }) => {
  // Si el objeto llega vacío no se va a retornar nada:
  if (Object.keys(resultado).length === 0) {
    return null;
  }

  return (
    <ResultadoDiv>
      <Precio>
        PRECIO: <span>{resultado.PRICE}</span>
      </Precio>
      <Informacion>
        Precio más alto del día: <span>{resultado.HIGHDAY}</span>
      </Informacion>
      <Informacion>
        Precio más bajo del día: <span>{resultado.LOWDAY}</span>
      </Informacion>
      <Informacion>
        Variación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span>
      </Informacion>
      <Informacion>
        Última actualización: <span>{resultado.LASTUPDATE}</span>
      </Informacion>
    </ResultadoDiv>
  );
};

export default Cotizacion;
