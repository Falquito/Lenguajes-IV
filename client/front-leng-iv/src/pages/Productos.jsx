import { ModalForm } from "../components/ModalForm"
import "jspdf-autotable";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const Productos = ()=>{
    const columns = [
        {
          name: "Nombre",
          selector: (row) => row.nombre,
          sortable: true,
        },
        {
          name: "Precio",
          selector: (row) => row.precio,
          sortable: true,
        },
        {
          name: "Stock",
          selector: (row) => row.stock,
          sortable: true,
        },
        {
          name: "Categoría",
          selector: (row) => row.categoria,
          sortable: true,
        },
        {
          name: "Descripción",
          selector: (row) => row.descripcion,
        },
      ];
      
      const {productos} = useContext(GlobalContext)
        
      const [filterText, setFilterText] = useState("");

  const filteredData = productos.filter((item) =>
    item.nombre.toLowerCase().includes(filterText.toLowerCase())
  );

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Nombre", "Precio", "Stock", "Categoría", "Descripción"]],
      body: filteredData.map((item) => [
        item.nombre,
        item.precio,
        item.stock,
        item.categoria,
        item.descripcion,
      ]),
    });
    doc.save("productos.pdf");
  };

    return (
        <div className="h-lvh w-full flex">
            <div className="w-1/5 h-100% bg-amber-100"></div>
            {/* CONTENT HERE */}
            <div className="w-3/5 h-100% flex justify-center p-4 gap-4 flex-col">
                <ModalForm titulo="Crear producto" campos={["nombre", "precio", "stock", "categoria", "descripcion"]} method={"POST"} />

                <ModalForm titulo={"Editar producto"} campos={["Numero de producto","nombre", "precio", "stock", "categoria", "descripcion"]} method={"PATCH"}></ModalForm>
                <ModalForm titulo={"Eliminar producto"} campos={["Numero de producto"]} method={"DELETE"} ></ModalForm>

                <div className="p-4">
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        className="border p-2 mb-4 w-full"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />


                    <DataTable
                        title="Lista de Productos"
                        columns={columns}
                        data={filteredData}
                        pagination
                        highlightOnHover
                        striped
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 btn"
                        onClick={exportToPDF}
                    >
                        Exportar a PDF
                    </button>
                </div>
            </div>
            <div className="w-1/5 h-100% bg-amber-100"></div>
        </div>
    )
}