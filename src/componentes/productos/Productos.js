import React, {useEffect, useState, useContext,  Fragment} from 'react';
import { Link } from 'react-router-dom';
// importar cliente axios
import clienteAxios from '../../config/axios';
import Producto from './Producto';
import Spinner from '../layout/Spinner';

// import el Context
import { CRMContext } from '../../context/CRMContext';

function Productos(props) {

    // productos = state, guardarproductos = funcion para guardar el state
    const [productos, guardarProductos] = useState([]);

    // utilizar valores del context
    const [auth, guardarAuth ] = useContext( CRMContext );

    // useEffect para consultar api cuando cargue
    useEffect( () => {

        if(auth.token !== '') {
            // Query a la API
            const consultarAPI = async () => {
                try {
                    const productosConsulta = await clienteAxios.get('/productos', {
                        headers: {
                            Authorization : `Bearer ${auth.token}`
                        }
                    });
                    guardarProductos(productosConsulta.data);
                } catch (error) {
                    // Error con authorizacion
                    if(error.response.status = 500) {
                        props.history.push('/iniciar-sesion');
                    }
                }
            }
            // llamado a la api
            consultarAPI();

        } else {
            props.history.push('/iniciar-sesion');
        }
    }, [productos]);

    // Si el state esta como false
    if(!auth.auth) {
        props.history.push('/iniciar-sesion');
    }


    // spinner de carga
    if(!productos.length) return <Spinner /> 


    return (
        <Fragment>
            <h2>Productos</h2>

            <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {productos.map(producto => (
                    <Producto 
                        key={producto._id}
                        producto={producto}
                    />
                ))}
            </ul>
        </Fragment>
    )
}
export default Productos;