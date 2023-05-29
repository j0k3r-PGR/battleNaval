import { useState } from "react"

const AUX = {
    A: " ",
    B: "  "
}

let aciertosMios = Array(81).fill(false)
let barcosRestantesPC = 10
const Box = ({ children, className, updateBox, index, seleccion, juego, acierto }) => {
    const [color, setColor] = useState("")

    let newClassName = className
    if (seleccion) {
        newClassName += (children == AUX.A ? ' blue' : '')
    }
    if (juego) {
        newClassName += acierto ? (children == AUX.A ? " red" : " blue") : ""
    }

    const hanleClick = () => {
        updateBox(index)
    }

    return (
        <div className={newClassName} onClick={hanleClick}>
            {children}
        </div>
    )
}

export function Tablero(
    { tittle, valido, id, clas, actualyReady, seleccion, juego, misBarcos, setMisBarcos, barcosPc, setGanador }
) {
    const [mapBox, setMapBox] = useState(Array(81).fill(null))
    const [barcos, setBarcos] = useState(10)
    const [noWin, setNoWin] = useState(true)
    const updateBox = (index) => {
        if (mapBox[index] || !valido || !noWin) return
        if (barcos >= 1 & seleccion) {
            setBarcos(barcos - 1)
            if (barcos === 1) actualyReady()
            const newMapBox = [...mapBox]
            newMapBox[index] = AUX.A
            setMapBox(newMapBox)
            const barc = [...misBarcos]
            barc.push(index)
            setMisBarcos(barc)
        }
        if (juego) {
            let win = false
            if (barcos === 0 || barcosRestantesPC == 0) {
                setMapBox(Array(81).fill(null))
                setBarcos(10)
                win = !noWin
                setNoWin(win)
            }
            if (!win) {
                setBarcos(barcosPc.some(element => element == index) ? barcos - 1 : barcos)
                aciertosMios[index] = true
                const newMapBox = [...mapBox]
                newMapBox[index] = AUX.A
                setMapBox(newMapBox)
                if (barcos != 0){
                    const tablePC = document.getElementsByClassName("box pc")
                    let num = 0
                    while (true) {
                        num = Math.floor(Math.random() * tablePC.length)
                        if (tablePC[num].classList.value === "box pc") break
                    }
                    const encontro = misBarcos.some(element => element == num)
                    tablePC[num].classList.value = encontro ? "box pc red" : "box pc blue"
                    if (encontro) {
                        barcosRestantesPC = parseInt(document.getElementById("cantPc").innerText, "a") - 1
                        document.getElementById("cantPc").innerText = barcosRestantesPC
                    }
                    if(barcosRestantesPC == 0 & barcos == 0){
                        setGanador("Han Empatado")
                    }else if(barcosRestantesPC == 0){
                        setGanador("Lo SIENTO PERO PERDISTE")
                    }
                }else{
                    setGanador("Has Ganado El Juego")
                }

                    
            }
        }

    }

    return (
        <div className="tabla">
            <h1>{tittle}</h1>
            <div className='container'>
                {
                    mapBox.map((_, index) => {
                        return (
                            <Box
                                key={index}
                                index={index}
                                className={"box " + clas}
                                updateBox={updateBox}
                                seleccion={seleccion}
                                juego={juego}
                                barcosPc={barcosPc}
                                acierto={aciertosMios[index]}
                            >
                                {barcosPc ? (barcosPc.some(element => index === element) ? AUX.A : AUX.B) : mapBox[index]}
                            </Box>
                        )
                    })
                }
            </div>
            <div className='info'>
                <div className='restantes'>
                    <label>BARCOS RESTANTES: <span id={id}>{barcos}</span>  </label>
                </div>
            </div>
        </div>
    )
}