import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const ModalForm = ({ campos = [], titulo ,method}) => {
    // Asegurar que campos siempre sea un array
    const initialState = campos.length > 0 
        ? campos.reduce((acc, campo) => ({ ...acc, [campo]: "" }), {}) 
        : {};

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const {getProductos,getOrdenes,getClientes}=useContext(GlobalContext)
    const {productos,ordenes,clientes} = useContext(GlobalContext)

    const selectProductos = useRef(null)

    const handleChange = (campo, valor) => {
        setFormData({ ...formData, [campo]: valor });
    };


    const validateOrden = ()=>{
        if(method==="DELETE"){
            return true;
        }
        let newErrors = {};
    
        if (!formData["cliente email"] || formData["cliente email"].trim() === "") {
            newErrors["cliente email"] = "El cliente email es obligatorio";
        }
        // Validar fecha en formato YYYY-MM-DD
        const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!formData["fecha"] || !fechaRegex.test(formData["fecha"])) {
            newErrors["fecha"] = "Formato de fecha incorrecto (YYYY-MM-DD)";
        }
        // Validar que al menos un producto esté seleccionado
        if (!selectProductos.current.selectedOptions || selectProductos.current.selectedOptions.length === 0) {
            newErrors["productos"] = "Debes seleccionar al menos un producto";
        }
        if (!formData["total"] || isNaN(formData["total"]) || Number(formData["total"]) <= 0) {
            newErrors["total"] = "El total debe ser un numero positivo";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const validateClient = ()=>{
        if(method==="DELETE"){
            return true;
        }
        let newErrors = {};

        if (!formData["nombre"] || formData["nombre"].trim() === "") {
            newErrors["nombre"] = "El nombre es obligatorio";
        }
        if (!formData["apellido"] || formData["apellido"].trim() === "") {
            newErrors["apellido"] = "El apellido es obligatorio";
        }
        if (!formData["email"] || formData["email"].trim() === "") {
            newErrors["email"] = "El email es obligatorio";
        }
        if (!formData["contraseña"] || formData["contraseña"].trim() === "") {
            newErrors["contraseña"] = "La contraseña es obligatoria";
        }
        

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }


    const validateProductos = () => {
        if(method==="DELETE"){
            return true;
        }
        let newErrors = {};

        if (!formData["nombre"] || formData["nombre"].trim() === "") {
            newErrors["nombre"] = "El nombre es obligatorio";
        }
        if (!formData["precio"] || isNaN(formData["precio"]) || Number(formData["precio"]) <= 0) {
            newErrors["precio"] = "El precio debe ser un número positivo";
        }
        if (!formData["stock"] || isNaN(formData["stock"]) || !Number.isInteger(Number(formData["stock"])) || Number(formData["stock"]) < 0) {
            newErrors["stock"] = "El stock debe ser un número entero positivo";
        }
        if (!formData["categoria"] || formData["categoria"].trim() === "") {
            newErrors["categoría"] = "La categoría es obligatoria";
        }
        if (!formData["descripcion"] || formData["descripcion"].trim().length < 10) {
            newErrors["descripción"] = "La descripción debe tener al menos 10 caracteres";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateProductos() && titulo.split(" ")[1]==="producto") {
            console.log("Formulario válido", formData);
            fetch(`http://localhost:3000/productos/${method==="PATCH" || method==="DELETE"?formData["Numero de producto"]:""}`,{
                method:method,
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({nombre:formData["nombre"],categoria:formData["categoria"],descripcion:formData["descripcion"],precio:parseFloat(formData["precio"]),stock:parseInt(formData["stock"])})
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data,formData)
                getProductos()
            })
            .catch(err=>alert(err))
            document.getElementById(`${titulo}`).close();
        } else {
            console.log("Errores en el formulario", errors);
        }
        if(titulo.split(" ")[1]==="orden"){
            if(validateOrden()){

                console.log("Formulario válido", formData);
            fetch(`http://localhost:3000/ordenes/${method==="PATCH" || method==="DELETE"?formData["Numero de orden"]:""}`,{
                method:method,
                headers:{
                    "Content-Type":"application/json"
                },
                body:method!="DELETE"?JSON.stringify({email_client:formData["cliente email"],fecha:formData["fecha"],productos:Array.from(selectProductos.current.selectedOptions).map(option => option.value),total:parseFloat(formData["total"])}):null
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data,formData)
                getOrdenes()
            })
            .catch(err=>alert(err))
            document.getElementById(`${titulo}`).close();
        } else {
            console.log("Errores en el formulario", errors);
        }
            }


        if(titulo.split(" ")[1]==="cliente"){
            if(validateClient()){
                console.log("Formulario válido", formData);
            fetch(`http://localhost:3000/clientes/${method==="PATCH" || method==="DELETE"?formData["Numero de cliente"]:""}`,{
                method:method,
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({nombre:formData["nombre"],apellido:formData["apellido"],email:formData["email"],contrasena:formData["contraseña"]})
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data,formData)
                getClientes()
            })
            .catch(err=>alert(err))
            document.getElementById(`${titulo}`).close();
        } else {
            console.log("Errores en el formulario", errors);
        }
            }
        }
        

    return (
        <>
            <button className="btn" onClick={() => document.getElementById(`${titulo}`).showModal()}>
                {titulo}
            </button>
            <dialog id={titulo} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">{titulo}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-4 flex-col">
                            {campos.length > 0 ? (
                                campos.map((campo) => (
                                    <div key={campo}>
                                        <p>{campo}</p>
                                        {campo==="Numero de producto"?
                                        <select onChange={(e)=>handleChange(campo,e.target.value)} defaultValue="Selecciona un producto" className="select">
                                             <option disabled={true}>Selecciona un {campos[0].split(" ")[2]}</option>
                                            {productos.map((producto)=>(
                                                <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                                            ))}
                                        </select>
                                        :
                                        campo==="Numero de orden"?
                                          <select onChange={(e)=>handleChange(campo,e.target.value)} defaultValue="Selecciona una orden" className="select">
                                          <option disabled={true}>Selecciona una {campos[0].split(" ")[2]}</option>
                                         {ordenes.map((orden)=>(
                                             <option key={orden.id} value={orden.id}>{orden.id}</option>
                                         ))}
                                     </select>
                                     :campo==="Numero de cliente"?
                                     <select onChange={(e)=>handleChange(campo,e.target.value)} defaultValue="Selecciona un cliente" className="select">
                                          <option disabled={true}>Selecciona un {campos[0].split(" ")[2]}</option>
                                         {clientes.map((cliente)=>(
                                             <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
                                         ))}
                                     </select>
                                     :campo==="productos"?
                                     <select ref={selectProductos} multiple>
                                        {productos.map((producto)=>(
                                            <option key={producto.id} value={JSON.stringify(producto)}>{producto.nombre}</option>
                                        ))}
                                     </select>  
                                    :
                                    <input
                                         type="text"
                                         placeholder={`Escribe aquí`}
                                         className="input"
                                         value={formData[campo] || ""}
                                         onChange={(e) => handleChange(campo, e.target.value)}
                                     />}
                                        {errors[campo] && <p className="text-red-500">{errors[campo]}</p>}
                                    </div>
                                ))
                            ) : (
                                <p>No hay campos disponibles.</p>
                            )}
                        </div>
                        <div className="modal-action">
                            <div className="flex justify-end items-center gap-4">
                                <button type="button" className="btn" onClick={() => document.getElementById(`${titulo}`).close()}>
                                    Cerrar
                                </button>
                                <button type="submit" className="btn btn-accent">
                                    {titulo.split(" ")[0]}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
};
