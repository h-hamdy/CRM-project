// import jsPDF from "jspdf";
// import { useClients } from "../../context/ClientsContext";
// import { useParams } from "react-router";


// const getCurrentDate = () => {
//     const currentDate = new Date();
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return currentDate.toLocaleDateString("en-US", options);
//   };

// export const GeneratePDF = () => {
// 	const { clients } = useClients();
// 	const client = clients.find((client) => client.id === Number(id));

// 	const { facture } = useParams<{ facture: string }>();
// 	const id = facture ? facture[0] : '';





//     const doc = new jsPDF();

//     doc.setFontSize(25);
//     doc.setFont("helvetica", "bold");

//     // Center the text horizontally
//     const textWidth =
//       (doc.getStringUnitWidth("Mapira") * 25) / doc.internal.scaleFactor;
//     const pageWidth = doc.internal.pageSize.width;
//     const xPosition = (pageWidth - textWidth) / 2;

//     // Add the centered text
//     doc.text("Mapira", xPosition, 22);

//     const startX = 23;
//     let startY = 40; // Initial startY position

//     doc.setFontSize(11);

//     doc.rect(startX, startY, 160, 20); // Outer rectangle

//     doc.line(startX + 80, startY, startX + 80, startY + 20);

//     // Facture N and its value (left side)
//     doc.setFont("helvetica", "bold");
//     doc.text("Facture N :", startX + 5, startY + 8);
//     doc.setFont("helvetica", "light"); // Set font to Helvetica Light
//     doc.text(facture ?? "", startX + 30, startY + 8); // Adjusted startX for value

//     doc.setFont("helvetica", "bold"); // Set font back to Helvetica (normal)
//     doc.text("Date :", startX + 5, startY + 15);
//     doc.setFont("helvetica", "light"); // Set font to Helvetica Light
//     doc.text(getCurrentDate(), startX + 30, startY + 15); // Adjusted startX for value

//     doc.setFont("helvetica", "bold"); // Set font back to Helvetica (normal)
//     doc.text("Client Name :", startX + 85, startY + 12);

//     doc.setFont("helvetica", "light"); // Set font to Helvetica Light
//     doc.text(
//       (client?.firstName ?? "") + " " + (client?.lastName ?? ""),
//       startX + 115,
//       startY + 12
//     );
//     // Adjust startY for the main table (autoTable)
//     startY = startY + 40; // Add spacing after the initial structured content

//     // Define table column titles and rows
//     const columns = [
//       "QTE",
//       "DÉSIGNATION",
//       "Tarif Taxable",
//       "Tarif Non Taxable",
//       "Total",
//     ];
//     const rows = dataSource.map((item: any) => [
//       item.Qte,
//       item.Title,
//       item.Tarif !== undefined ? item.Tarif : "-",
//       item.TarifN !== undefined ? item.TarifN : "-",
//       item.Total,
//     ]);

//     let tarif_sum = 0;

//     // Calculate subtotal
//     const Tarif_N_sum = dataSource.reduce((sum: any, item: any) => {
//       const tarif = item.Tarif ? parseFloat(item.Tarif) : 0;
//       const tarifN = item.TarifN ? parseFloat(item.TarifN) : 0;
//       const qte = item.Qte ? parseFloat(item.Qte) : 1;
//       tarif_sum += tarif * qte;
//       return sum + tarifN * qte;
//     }, 0);

//     // Define tax and total
//     const salesTax = 10; // Example tax rate (adjust as needed)
//     const tax = (tarif_sum * salesTax) / 100;
//     const total = Tarif_N_sum + tarif_sum + tax;
//     const subtotal = Tarif_N_sum + tarif_sum;

//     // Add main table with spacing
//     doc.autoTable({
//       head: [columns],
//       body: rows,
//       startY: startY, // Adjust startY to add spacing
//     });

//     // Get the final Y position after the main table
//     const finalY = (doc as any).lastAutoTable.finalY + 10;

//     // Define summary table columns and rows
//     const summaryColumns = ["", "Amount"];
//     const summaryRows = [
//       ["Subtotal:", `$${subtotal.toFixed(2)}`],
//       ["TVA:", `$${tax.toFixed(2)}`],
//       ["Total:", `$${total.toFixed(2)}`],
//     ];

//     // Add summary table
//     doc.autoTable({
//       head: [summaryColumns],
//       body: summaryRows,
//       startY: finalY + 20, // Add additional spacing after the main table
//       theme: "plain",
//       headStyles: { fontStyle: "bold" },
//       bodyStyles: { fontSize: 12 },
//       styles: { halign: "right" },
//     });

//     // Save the PDF
//     doc.save("Mapira-Devis.pdf");
//   };