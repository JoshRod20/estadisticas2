import { StyleSheet, View, Dimensions, Alert, Button } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { jsPDF } from "jspdf";
import * as FileSystem from "expo-file-system"; // Manejo de archivos
import * as Sharing from "expo-sharing"; // Para compartir archivos

export default function GraficoGeneros({ dataGeneros }) {

  const generarPDF = async () => {
    try {
      const doc = new jsPDF();

      doc.text("Reporte de Géneros", 10, 10);

      dataGeneros.forEach((genero, index) => {
        doc.text(`${genero.name}: ${genero.population}`, 10, 20 + index * 10);
      });

      // Generar el PDF como base64
      const pdfBase64 = doc.output("datauristring").split(",")[1];

      // Definir la ruta temporal para el archivo PDF en el sistema de archivos del dispositivo
      const fileUri = `${FileSystem.documentDirectory}reporte_géneros.pdf`;

      // Guardar el archivo PDF
      await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Compartir el archivo PDF
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error("Error al generar o compartir el PDF: ", error);
      Alert.alert("Error", "No se pudo generar o compartir el PDF.");
    }
  };

  let screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <PieChart
        data={dataGeneros}
        width={screenWidth - screenWidth * 0.1}
        height={300}
        chartConfig={{
          color: (opacity = 1) => `rgba(102, 204, 255, ${opacity})`,
        }}
        accessor={"population"}
        paddingLeft={45}
        backgroundColor={"transparent"}
        style={{
          borderRadius: 10,
        }}
      />
      {/* Botón para generar y compartir PDF */}
      <Button title="Generar y Compartir PDF" onPress={generarPDF} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
