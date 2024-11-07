import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { RootLayout } from "./pages/RootLayout";
import { Product } from "./pages/Product/Product";
import { Clients } from "./pages/Clients/Clients";
import { Administration } from "./pages/Administration/Administration";
import { ForOFor } from "./pages/ForOFor";
import { Billing } from "./pages/Product/Billing";
import { BillTable } from "./pages/Bills/BillTable";
import { CalendarPage } from "./pages/Calendar/CalendarPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/" element={<RootLayout />}>
          <Route path="" element={<Clients />} />
          <Route path="Calendar" element={<CalendarPage />} />
          <Route path="Product" element={<Product />} />
          <Route path="Product/Billing/:facture" element={<Billing />} />
          <Route path="Product/:facture" element={<BillTable />} />
          <Route path="Clients" element={<Clients />} />
          <Route path="Administration" element={<Administration />} />
        </Route>
        <Route path="*" element={<ForOFor />} />{" "}
        {/* Catch-all route for 404 outside the RootLayout */}
      </Routes>
    </Router>
  );
}

export default App;
