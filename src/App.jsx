import { useState } from 'react'
import './App.css'
import { Tablero } from './Tablero.jsx'


function App() {
  const [ready, setReady] = useState(false)
  const [className,setClassName] = useState("inicioUser")
  const [className2,setClassName2] = useState("tableros none")
  const [misBarcos, setMisBarcos] = useState([])
  const [barcosPc, setBarcosPc] = useState([])
  const [classganador, setClassGanador] = useState("none")
  const [ganador,setGanador] = useState("")

  const iniciar = () =>{
    if(ready) {
      setClassName("none")
      setClassName2("tableros")
    }else{
      alert("debe Cargar Los Barcos")
    }
  }

  const actualyReady = () => {
    setReady(true)
  }

  const actualyMisBarcos = (prop) => {
    setMisBarcos(prop)
    const newBarcosPc = [... barcosPc]
    let repeat = false
    let num = 0
    while (!repeat){
      num = Math.floor(Math.random() * 81)
      repeat = barcosPc.every( element => element != num)
    }
    newBarcosPc.push(num)
    setBarcosPc(newBarcosPc)
  }

  const actualyGanador = (prop) =>{
    setClassGanador("ganador")
    setClassName("none")
    setGanador(prop)
  }

  const reinicio = () =>{
    setReady(false)
    setClassName("inicioUser")
    setClassName2("tableros none")
    setMisBarcos([])
    setBarcosPc([])
    setClassGanador("none")
    setGanador("")
  }
  
  return (
    <>
    <h1>BATTLE GAME</h1>
    <div className={className}>
      <h1>Seleccione sus barcos</h1>
      <Tablero select={true} valido={true} actualyReady={actualyReady} seleccion setBarcosPc={setBarcosPc} misBarcos={misBarcos} setMisBarcos={actualyMisBarcos} />
      <button onClick={iniciar}>Iniciar</button>
    </div>
    <div className={className2}>
      <Tablero tittle="PC Table" valido={true} clas="player" setGanador={actualyGanador} juego barcosPc={barcosPc} misBarcos={misBarcos}/>
      <Tablero tittle="My Table" valido={false} clas="pc" id="cantPc" />
    </div>
    <div className={classganador}>
      <h1>Hubo un ganador</h1>
      <h1>{ganador}</h1>
      <button onClick={reinicio}>Reiniciar Juego</button>
    </div>
    </>
  )
}

export default App
