import React,{useState} from 'react';
import Error from'./Error';

const Formulario = ({setBusqueda}) => {

    const [termino,setTermino]=useState('');
    const [error,setError]=useState(false);
    const _buscarImagenes=e=>{
        e.preventDefault();
        //validar
        if(termino.trim()===''){
            setError(true);
            return;
        }
        setError(false);
        setBusqueda(termino);

    }
    return ( 
        <form
        onSubmit={_buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Buscar una imagen, Ej.Programación"
                        onChange={e=>setTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            {error
            ?<Error mensaje="Agrega un termino de Búsqueda"/>
            :null}
        </form>
     );
}
 
export default Formulario;