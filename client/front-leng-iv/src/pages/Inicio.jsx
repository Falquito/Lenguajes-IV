import React, { useContext, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { format, isAfter, isBefore } from "date-fns";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { GlobalContext } from "../context/GlobalContext";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { VentasPDF } from "../components/Ventaspdf";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p>Ocurrió un error al generar el PDF.</p>;
    }
    return this.props.children;
  }
}


export function Inicio() {
    
  const {ordenes} = useContext(GlobalContext)
  const [filtro, setFiltro] = useState({ desde: "", hasta: "" });

//   const [nuevaVenta, setNuevaVenta] = useState({
//     cliente: "",
//     producto: "",
//     cantidad: 1,
//     precio: 0,
//     fecha: "",
//   });

//   const handleAgregarVenta = () => {
//     if (!nuevaVenta.cliente || !nuevaVenta.producto || !nuevaVenta.fecha) return;

//     setVentas([...ventas, nuevaVenta]);
//     setNuevaVenta({
//       cliente: "",
//       producto: "",
//       cantidad: 1,
//       precio: 0,
//       fecha: "",
//     });
//   };

//   const filtrarVentas = ordenes.filter((v) => {
//     console.log(v)
//     const fechaVenta = new Date(v.fecha);
//     const desde = filtro.desde ? new Date(filtro.desde) : null;
//     const hasta = filtro.hasta ? new Date(filtro.hasta) : null;

//     if (desde && isBefore(fechaVenta, desde)) return false;
//     if (hasta && isAfter(fechaVenta, hasta)) return false;

//     return true;
//   });

const filtrarVentas = ordenes.filter((v) => {
  const fechaVenta = new Date(v.fecha).setHours(0, 0, 0, 0);
  const desde = filtro.desde ? new Date(filtro.desde).setHours(0, 0, 0, 0) : null;
  const hasta = filtro.hasta ? new Date(filtro.hasta).setHours(23, 59, 59, 999) : null;

  if (desde && fechaVenta < desde) return false;
  if (hasta && fechaVenta > hasta) return false;

  return true;
});
const datosAgrupados = filtrarVentas.reduce((acc, v) => {
  v.productos.forEach((prodStr) => {
    const prod = JSON.parse(prodStr);
    const existente = acc.find((d) => d.producto === prod.nombre);
    const total = v.total // dividir total por cantidad de productos

    if (existente) {
      existente.ventas += total;
    } else {
      acc.push({ producto: prod.nombre, ventas: total });
    }
  });
  return acc;
}, []);

//   const exportarPDF = () => {
//     const input = document.getElementById("reporte");
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("reporte-ventas.pdf");
//     });
//   };
const exportarPDF = () => {
  const input = document.getElementById("reporte");

  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10);
    pdf.save("reporte-ventas.pdf");
  });
};


  return (
    <div className="h-100% flex justify-center">

    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Filtrar por fecha</h1>

      {/* Formulario de carga */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {/* <input
          className="border p-2"
          type="text"
          placeholder="Cliente"
          value={nuevaVenta.cliente}
          onChange={(e) => setNuevaVenta({ ...nuevaVenta, cliente: e.target.value })}
        /> */}
        {/* <input
          className="border p-2"
          type="text"
          placeholder="Producto"
          value={nuevaVenta.producto}
          onChange={(e) => setNuevaVenta({ ...nuevaVenta, producto: e.target.value })}
        /> */}
        {/* <input
          className="border p-2"
          type="number"
          placeholder="Cantidad"
          value={nuevaVenta.cantidad}
          onChange={(e) => setNuevaVenta({ ...nuevaVenta, cantidad: parseInt(e.target.value) })}
        />
        <input
          className="border p-2"
          type="number"
          placeholder="Precio"
          value={nuevaVenta.precio}
          onChange={(e) => setNuevaVenta({ ...nuevaVenta, precio: parseFloat(e.target.value) })}
        /> */}
        {/* <input
          className="border p-2 col-span-2"
          type="date"
          value={nuevaVenta.fecha}
          onChange={(e) => setNuevaVenta({ ...nuevaVenta, fecha: e.target.value })}
        /> */}
      </div>

      {/* <button
        onClick={handleAgregarVenta}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Agregar Venta
      </button> */}

      {/* Filtros */}
      <div className="mb-4 flex gap-2">
        <input
          type="date"
          className="border p-2"
          value={filtro.desde}
          onChange={(e) => setFiltro({ ...filtro, desde: e.target.value })}
        />
        <input
          type="date"
          className="border p-2"
          value={filtro.hasta}
          onChange={(e) => setFiltro({ ...filtro, hasta: e.target.value })}
        />
      </div>

      {/* Reporte y gráfico */}
      <div id="reporte" className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Ventas por Producto</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={datosAgrupados}>
            <XAxis dataKey="producto" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ventas" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>

        {/* Tabla */}
        <table className="mt-6 w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Cliente</th>
              <th className="border p-2">Productos</th>
              <th className="border p-2">Cantidad</th>
              <th className="border p-2">Precio</th>
              <th className="border p-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {filtrarVentas.map((v, i) => (
              <tr key={i}>
                <td className="border p-2">{v.email_client}</td>
                <td className="border p-2">{v.productos.map((prod)=>(
                    <>
                    {JSON.parse(prod).nombre}
                    <br></br>
                    </>
                ))}</td>
                <td className="border p-2">{1}</td>
                <td className="border p-2">$ {v.total}</td>
                <td className="border p-2">{format(new Date(v.fecha), "dd/MM/yyyy")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={exportarPDF}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        Exportar a PDF
      </button>

    {/* <ErrorBoundary>
      {datosAgrupados.length > 0 && (
  <PDFDownloadLink
    document={<VentasPDF ventas={datosAgrupados} />}
    fileName="reporte-ventas.pdf"
  >
    {({ loading }) => (loading ? "Cargando PDF..." : "Descargar PDF")}
  </PDFDownloadLink>
)}


    </ErrorBoundary> */}
    </div>
    </div>
  );
}
