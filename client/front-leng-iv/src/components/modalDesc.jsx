import { useContext, useRef, useState } from "react"
import { IsNumber } from "../utils/ValidarInt"
import { GlobalContext } from "../context/GlobalContext"

export const ModuleDescuentos=()=>{
    const descuento = useRef("")
    const [msj,setMsj] = useState("")
    const {getProductos} = useContext(GlobalContext)
    const applyDesc = async (numero)=>{
        if (!IsNumber(numero)){
            setMsj("El descuento debe ser un formato correcto")
        }else{
            setMsj("")
            const req = await fetch("http://localhost:3000/productos",{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({descuento:parseInt(numero)})
            

            })
            getProductos()
            



        }
    }
    

    return (
        <>
        <button className="btn bg-orange-700 rounded-2xl text-white" onClick={() => document.getElementById(`${"modal-desc"}`).showModal()}>Aplicar descuentos</button>
        <dialog id="modal-desc" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Descuentos!</h3>
            <fieldset className="fieldset">
            <legend className="fieldset-legend">Ingrese descuento</legend>
            <input ref={descuento}  type="text" className="input" placeholder="Ej: 45" />
            {msj.length!=""?(<p className="text-red-700">{msj}</p>):(msj)}
            </fieldset>
            <div className="modal-action">
            <form method="dialog" >
                {/* if there is a button in form, it will close the modal */}
                <button className="btn mr-1">Cerrar</button>
            </form>
                <button className="btn bg-green-500" onClick={()=>{applyDesc(descuento.current.value)}}>Aplicar</button>
            </div>
        </div>
        </dialog>
        </>
        
    )
}