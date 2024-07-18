import { notification } from "antd";
import axios from "axios";

const getCurrentDate = () => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return currentDate.toLocaleDateString("en-US", options);
};

const calculateSubtotal = (dataSource: any) => {
  return dataSource
    .reduce((acc: any, item: any) => {
      const totalValue = parseFloat(item.Total.replace("$", "")) || 0;
      return acc + totalValue;
    }, 0)
    .toFixed(2);
};

const saveBillInfo = async (
  dataSource: any,
  client: any,
  facture: any,
  salesTax: any,
  totalValue: any
) => {
  try {
    const billInfo = {
      client: client?.firstName + " " + client?.lastName,
      factureNumber: facture,
      Date: getCurrentDate(),
      Subtotal: calculateSubtotal(dataSource),
      SalesTax: String(salesTax),
      TotalValue: totalValue,
    };

    await axios.post("http://localhost:3333/bills/create-bill-info", billInfo, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error saving bill info:", error);
  }
};

export const saveTable = async (
  dataSource: any,
  client: any,
  facture: any,
  salesTax: any,
  totalValue: any
) => {
  const factureNumber = facture;

  try {
    await axios.post(
      "http://localhost:3333/bills",
      {
        factureNumber,
        items: dataSource,
      },
      { withCredentials: true }
    );

    await saveBillInfo(dataSource, client, facture, salesTax, totalValue);
    notification.success({
      message: "Success",
      description: "Table saved successfully.",
    });
  } catch (error) {
    notification.error({
      message: "Error",
      description: "There was an error creating the Product. Please try again.",
    });
  }
};
