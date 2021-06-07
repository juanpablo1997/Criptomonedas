import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";

// Componentes:
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";

// Imagenes y Styles CSS3:
import imagen from "./cryptomonedas.png";
import Spinner from "./components/Spinner";

// Styled Components:
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 2.5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700px;
  font-size: 50px;
  margin-bottom: 25px;
  margin-top: 30px;

  // Seudo-elemento (Linea Azul bajo el 'Heading'):
  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  // State
  const [moneda, guardarMoneda] = useState("");
  const [criptomoneda, guardarCriptomoneda] = useState("");
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    // Evitamos que se ejecute la primera vez:
    if (moneda === "") {
      return;
    }

    // Consultar la API para obtener la cotizaión:
    const consultarAPI = async () => {
      const urlAPI = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(urlAPI);
      // Mostrar spinner:
      guardarCargando(true);

      // Ocultar el spinner y mostrar resultado:
      setTimeout(() => {
        guardarCargando(false);
        // Guarda la cotización:
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 4000);
    };
    consultarAPI();
  }, [moneda, criptomoneda]);

  // Mostrar spinner o resultado:
  const componente = cargando ? (
    <Spinner />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen criptomonedas" />
      </div>
      <div>
        <Heading>Cotiza criptomonedas al Instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
