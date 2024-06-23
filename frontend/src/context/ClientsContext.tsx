// src/context/ClientsContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// Define the data type for the client
interface DataType {
  id: number;
  firstName: string;
  lastName: string;
  type: string;
  email: string;
  phone: string;
  address: string;
  note: string;
}

// Define the shape of the context value
interface ClientsContextType {
  clients: DataType[];
  setClients: React.Dispatch<React.SetStateAction<DataType[]>>;
  fetchClients: () => void;
}

// Create the context with a default value
const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

// Create a provider component
interface ClientsProviderProps {
  children: ReactNode;
}

export const ClientsProvider: React.FC<ClientsProviderProps> = ({ children }) => {
  const [clients, setClients] = useState<DataType[]>([]);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3333/clients", {
        withCredentials: true,
      });
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <ClientsContext.Provider value={{ clients, setClients, fetchClients }}>
      {children}
    </ClientsContext.Provider>
  );
};

// Custom hook to use the ClientsContext
export const useClients = () => {
  const context = useContext(ClientsContext);
  if (context === undefined) {
    throw new Error("useClients must be used within a ClientsProvider");
  }
  return context;
};
