import React from "react";
import Sidebar from "./Dashboard/Sidebar";
import { Route, Routes } from "react-router-dom";
import "./Dashboard/dashboard.css";
import Statistics from "./Dashboard/pages/Statistics";
import Calendar from "./Dashboard/pages/Calendar";
import ClientsList from "./Dashboard/pages/ClientsList";
import VisitHistory from "./Dashboard/pages/VisitHistory";
import ServicesCatalog from "./Dashboard/pages/ServicesCatalog";
import IncomeReports from "./Dashboard/pages/IncomeReports";
import SalesStatistics from "./Dashboard/pages/SalesStatistics";
import ManagePromotions from "./Dashboard/pages/ManagePromotions";
import AddDiscount from "./Dashboard/pages/AddDiscount";
import ProfileSettings from "./Dashboard/pages/ProfileSettings";
import Employees from "./Dashboard/pages/Employees";
import Logout from "./Dashboard/pages/Logout";
import Navbar from "./Dashboard/Navbar";


const Dashboard = () => {
  return (
      <div className="min-w-screen min-h-screen relative bg-slate-100">
      <Sidebar></Sidebar>
      
      <div className={`px-10 py-7 `}>
      <div className="pb-5"> <Navbar></Navbar> </div>
        <Routes>
          <Route path="/" element={<Statistics />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/clients-list" element={<ClientsList />} />
          <Route path="/visit-history" element={<VisitHistory />} />
          <Route path="/services-catalog" element={<ServicesCatalog />} />
          <Route path="/income-reports" element={<IncomeReports />} />
          <Route path="/sales-statistics" element={<SalesStatistics />} />
          <Route path="/manage-promotions" element={<ManagePromotions />} />
          <Route path="/add-discount" element={<AddDiscount />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
