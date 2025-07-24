import {createContext,useEffect,useState} from 'react'

export const GlobalContext = createContext()

export const GlobalContextProvider =({children})=>{
    const [productos,setProductos] = useState([])
    const [ordenes,setOrdenes]=useState([])
    const [clientes,setClientes]=useState([])

    const getProductos = async ()=>{
        fetch("http://localhost:3000/productos",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).
        then(data=>setProductos(data.filter((data)=>data.IsActive)))
        .catch(err=>alert(err))
    }

    const getOrdenes = async()=>{
        fetch("http://localhost:3000/ordenes",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).
        then(data=>setOrdenes(data.filter((data)=>data.IsActive)))
        .catch(err=>alert(err))
    }

    const getClientes = async ()=>{
        fetch("http://localhost:3000/clientes",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).
        then(data=>setClientes(data.filter((data)=>data.IsActive)))
        .catch(err=>alert(err))
    }
    useEffect(()=>{
        getProductos()
        getOrdenes()
        getClientes()
    },[])
    return (
        <GlobalContext.Provider value={{productos,getProductos,ordenes,getOrdenes,clientes,getClientes}}> 
        {children}
        </GlobalContext.Provider>
    )
}
