import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";

// Componentes:
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import Error from "./Error";

// Styled Components:
const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  padding: 15px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 5px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {
  // State de criptomonedas taridas desde la API:
  const [listaCriptomonedas, guardarListaCriptomonedas] = useState([]);

  // State para la validación:
  const [error, guardarError] = useState(false);

  // Arreglo de monedas:
  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar EE.UU" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "COP", nombre: "Peso Colombiano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];

  // Utilizo useMoneda:
  const [moneda, SelectMonedas] = useMoneda("Elige tu moneda", "", MONEDAS);

  // Utilizo useCriptomoneda:
  const [criptomoneda, SeleccionarCriptomoneda] = useCriptomoneda(
    "Elige tu criptomoneda",
    "",
    listaCriptomonedas
  );

  // Llamado a la Api:
  useEffect(() => {
    const consultarAPI = async () => {
      const ulrAPI =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(ulrAPI);
      guardarListaCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  // Funcion para cuando el usuario preciona el boton 'cotizar':
  const cotizarMoneda = (e) => {
    e.preventDefault();
    if (moneda === "" || criptomoneda === "") {
      guardarError(true);
      return;
    }

    guardarError(false);

    // Pasar los datos al componente principal:
    guardarMoneda(moneda);
    guardarCriptomoneda(criptomoneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje={"Hubo un error"} /> : null}
      <SelectMonedas />
      <SeleccionarCriptomoneda />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
