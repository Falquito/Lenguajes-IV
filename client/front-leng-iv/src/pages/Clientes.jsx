import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { ModalForm } from "../components/ModalForm"
import "jspdf-autotable";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";

export const Clientes = ()=>{
    const columns = [
        {
          name: "Nombre",
          selector: (row) => row.nombre,
          sortable: true,
        },
        {
          name: "Apellido",
          selector: (row) => row.apellido,
          sortable: true,
        },
        {
          name: "Email",
          selector: (row) => row.email,
          sortable: true,
        }
      ];
      
      const {clientes} = useContext(GlobalContext)
        
      const [filterText, setFilterText] = useState("");

  const filteredData = clientes.filter((item) =>
    item.nombre.toLowerCase().includes(filterText.toLowerCase())
  );

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Nombre", "Apellido", "Email"]],
      body: filteredData.map((item) => [
        item.nombre,
        item.apellido,
        item.email
      ]),
    });
    doc.save("clientes.pdf");
  };

    return (
        <div className="h-lvh w-full flex">
            <div className="w-1/5 h-100%"></div>
            {/* CONTENT HERE */}
            <div className="w-3/5 h-100% flex justify-center p-4 gap-4 flex-col">
                <ModalForm titulo="Crear cliente" campos={["nombre", "apellido", "email", "contraseña"]} method={"POST"} />

                <ModalForm titulo={"Editar cliente"} campos={["Numero de cliente","nombre", "apellido", "email", "contraseña"]} method={"PATCH"}></ModalForm>
                <ModalForm titulo={"Eliminar cliente"} campos={["Numero de cliente"]} method={"DELETE"} ></ModalForm>

                <div className="p-4">
                <input
                        type="text"
                        placeholder="Buscar cliente..."
                        className="border p-2 mb-4 w-full"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />

                    <DataTable className="border"
                        title="Lista de Clientes"
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
            <div className="w-1/5 h-100%"></div>
        </div>
    )
}