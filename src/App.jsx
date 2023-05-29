import { useState } from 'react'
import './App.css'
import { Tablero } from './Tablero.jsx'


function App() {
  const [ready, setReady] = useState(false)
  const [className,setClassName] = useState("inicioUser")
  const [misBarcos, setMisBarcos] = useState([])
  const [barcosPc, setBarcosPc] = useState([])

  const iniciar = () =>{
    if(ready) {setClassName("none")}else{alert("debe Cargar Los Barcos")}
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

  return (
    <>
    <div className={className}>
      <h1>Seleccione sus barcos</h1>
      <Tablero select={true} valido={true} actualyReady={actualyReady} seleccion misBarcos={misBarcos} setMisBarcos={actualyMisBarcos} />
      <button onClick={iniciar}>Iniciar</button>
    </div>
    <h1>BATTLE GAME</h1>
    <div className='tableros'>
      <Tablero tittle="PC Table" valido={true} clas="player" juego barcosPc={barcosPc}/>
      <Tablero tittle="My Table" valido={false} clas="pc" barcosPc={misBarcos}/>
    </div>
    </>
  )
}

export default App
