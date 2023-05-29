import './App.css'
import { Tablero } from './Tablero.jsx'


function App() {



  return (
    <>
    <h1>BATTLE GAME</h1>
    <div className='tableros'>
      <Tablero tittle="PC Table" valido={true} clas=""/>
      <Tablero tittle="My Table" valido={false} clas="pc"/>
    </div>
    </>
  )
}

export default App
