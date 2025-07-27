import { Link } from "react-router"

export const Header = ()=>{
    return(
        <header className="h-14 bg-orange-500 flex items-center gap-4 justify-center p-4">
            <Link to={"/"}><span className="text-white cursor-pointer hover:bg-slate-800 p-4 rounded-4xl">Inicio</span></Link>
            <Link to={"/productos"}><span className="text-white cursor-pointer hover:bg-slate-800 p-4 rounded-4xl">Productos</span></Link>
            <Link to={"/ventas"}><span className="text-white cursor-pointer hover:bg-slate-800 p-4 rounded-4xl">Ventas</span></Link>
            <Link to={"clientes"}><span className="text-white cursor-pointer hover:bg-slate-800 p-4 rounded-4xl">Clientes</span></Link>
        </header>
    )
}