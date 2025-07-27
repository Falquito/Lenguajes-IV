import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { ModalForm } from "../components/ModalForm"
import "jspdf-autotable";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";

export const Ventas = ()=>{
    const columns = [
        {
          name: "Email Cliente",
          selector: (row) => row.email_client,
          sortable: true,
        },
        {
          name: "Fecha",
          selector: (row) => row.fecha,
          sortable: true,
        },
        {
          name: "Productos",
          selector: (row) => row.productos,
          sortable: true,
        },
        {
          name: "Total",
          selector: (row) => row.total,
          sortable: true,
        }
      ];
      
      const {ordenes} = useContext(GlobalContext)
        
      const [filterText, setFilterText] = useState("");

  const filteredData = ordenes.filter((item) =>
    item.email_client.toLowerCase().includes(filterText.toLowerCase())
  );

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Cliente Email", "Fecha", "Productos", "Total"]],
      body: filteredData.map((item) => [
        item.email_client,
        item.fecha,
        item.productos,
        item.total
      ]),
    });
    doc.save("ordenes.pdf");
  };

    return (
        <div className="h-lvh w-full flex">
            <div className="w-1/5 h-100%"></div>
            {/* CONTENT HERE */}
            <div className="w-3/5 h-100% flex justify-center p-4 gap-4 flex-col">
                <ModalForm titulo="Crear orden" campos={["cliente email", "fecha", "productos", "total"]} method={"POST"} />

                <ModalForm titulo={"Editar orden"} campos={["Numero de orden","cliente email", "fecha", "productos", "total"]} method={"PATCH"}></ModalForm>
                <ModalForm titulo={"Eliminar orden"} campos={["Numero de orden"]} method={"DELETE"} ></ModalForm>

                <div className="p-4">
                    <DataTable className="border"
                        title="Lista de Ventas"
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
            <div className="w-1/5 h-100% "></div>
        </div>
    )
}