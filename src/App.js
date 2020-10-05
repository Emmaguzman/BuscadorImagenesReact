import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaactual, setPaginaactual] = useState(1);
  const [totalpaginas, setTotalpaginas] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === "") return;
      const imagenesPorPagina = 30;
      const KEY = '18586064-b2d456367fef32e16766dd773';
      const URL = `https://pixabay.com/api/?key=${KEY}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const req = await fetch(URL);
      const res = await req.json();
      setImagenes(res.hits);

      //calcular el total de paginas
      const _calcularTotalPaginas = Math.ceil(res.totalHits / imagenesPorPagina);
      setTotalpaginas(_calcularTotalPaginas)
      const jumbotron=document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'})
    }
    consultarAPI();
  }, [busqueda,paginaactual])


  const _paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if (nuevaPaginaActual === 0) return;
    setPaginaactual(nuevaPaginaActual);
  }


  const _paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if (nuevaPaginaActual > totalpaginas) return;
    setPaginaactual(nuevaPaginaActual);
  }


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">
          Buscador de Imágenes
       </p>
        <Formulario
          setBusqueda={setBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
        {(paginaactual === 1)
          ? null
          :
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={_paginaAnterior}
          >
            &laquo; Anterior</button>
        }

        {(paginaactual===totalpaginas)
        ?null
        :<button
        type="button"
        className="bbtn btn-info mr-1"
        onClick={_paginaSiguiente}
      >
        Siguiente&raquo;</button>
        }
        
      </div>
    </div>
  );
}

export default App;
