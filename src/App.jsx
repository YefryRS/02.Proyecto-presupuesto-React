import { Fragment, useState, useEffect } from 'react'
import { Filtros } from './components/Filtros';
import { Header } from './components/Header'
import {ListadoGastos} from './components/ListadoGastos';
import { Modal } from './components/Modal';
import {generarId} from "./helpers"
import IconoNuevoGasto from "./img/nuevo-gasto.svg"

function App() {
  
  /*como el presupuesto va a estar disponible en varios componentes, entonces definimos el presupuesto en nuestro componente principal (app.jsx)  */

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false) /* usamos este componente para validar si el presupuesto es valido, y en caso de que sea valido, cambiamos un componente(NuevoPresupuesto) por otro componente (planificador de gastos) */
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  //EN esta caso como el arreglo lo convertimos a un string, nuevamente tenemos que volver a colocarlo como un array
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
  )

  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState("")
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      setModal(true)
  
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  },[gastoEditar])


  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0)
  },[presupuesto])

  //NO se pueden almacenar un arreglo en el localStorage, y por ese motivo hay que convertirlo en un string
  useEffect(() => {
    localStorage.setItem("gastos",JSON.stringify(gastos) ?? [])
  },[gastos])

  useEffect(() => {
    if(filtro) {
      //Filtrar gastos por categoria
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])


  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0

    if(presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  },[])



  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  
  const guardarGasto = gasto => {
    if (gasto.id) {
      //Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState )
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      //Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos,gasto])
    }

    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {/* Hacemos esta condicion para que solo se muestre si el presupuesto es valido y usamos el "&&" en vez del "?" para validar, ya que este nos permite hacer una sola validacion */}
      {isValidPresupuesto && (
      <Fragment>
        <main>
          {gastos.length > 0 && 
          <Filtros
            filtro={filtro}
            setFiltro={setFiltro}
          />
          }
          <ListadoGastos
            gastos={gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
          />
        </main>
        <div className='nuevo-gasto'>
          <img 
            src={IconoNuevoGasto} 
            alt="Icono del nuevo gasto" 
            onClick={handleNuevoGasto}
            />
        </div>
      </Fragment>
      )}
      

      {modal && 
        <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
        />
      }

    </div>
  )
}

export default App
