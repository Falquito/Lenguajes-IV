// VentasPDF.jsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Estilos del PDF
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  title: { fontSize: 16, marginBottom: 10, textAlign: "center" },
  table: { display: "table", width: "auto", marginTop: 10 },
  row: { flexDirection: "row", borderBottom: "1px solid #ccc", padding: 5 },
  cell: { flex: 1, padding: 2 },
  header: { fontWeight: "bold", backgroundColor: "#eee" },
});

export function VentasPDF({ ventas }) {
    console.log(ventas)
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Reporte de Ventas por Producto</Text>

        <View style={styles.table}>
          <View style={[styles.row, styles.header]}>
            <Text style={styles.cell}>Producto</Text>
            <Text style={styles.cell}>Total Vendido ($)</Text>
          </View>

          {ventas.map((venta, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.cell}>{venta.producto || "N/A"}</Text>
              <Text style={styles.cell}>${venta.ventas.toFixed(2) || 0}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
