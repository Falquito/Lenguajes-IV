import { useMemo } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { VentasPDF } from "./components/VentasPDF";

export const BotonDescargaPDF = ({ ventas }) => {
  const documentoPDF = useMemo(() => <VentasPDF ventas={ventas} />, [ventas]);

  if (ventas.length === 0) return null;

  return (
    <PDFDownloadLink document={documentoPDF} fileName="reporte-ventas.pdf">
      {({ loading }) =>
        loading ? "Generando PDF..." : "Descargar reporte en PDF"
      }
    </PDFDownloadLink>
  );
};
