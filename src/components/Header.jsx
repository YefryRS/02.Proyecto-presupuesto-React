import React from 'react'
import {ControlPresupuesto} from './ControlPresupuesto'
import { NuevoPresupuesto } from './NuevoPresupuesto'

const Header = ({
  presupuesto, 
  setPresupuesto, 
  isValidPresupuesto,
  setIsValidPresupuesto,
  gastos,
  setGastos
}) => {

  return (
    <header>
        <h1>Planificador de gastos</h1>
        {/* usamos una condicion, para que en caso de que sea valido el presupuesto                       ( isValidPresupuesto === true) nos renderize el componente del planificador de gastos, y en caso de que no sea valido ( isValidPresupuesto === false) nos siga mostrando el componente de "NuevoPresupuesto" */}
        {isValidPresupuesto ? (
          <ControlPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            gastos={gastos}
            setGastos={setGastos}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        ) : (
          <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        )}
    </header>
  )
}

export {Header}