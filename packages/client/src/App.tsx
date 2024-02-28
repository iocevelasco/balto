import React from 'react';
import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css'

const APP_BASE_ROUTES_PATTERNS = {
  dashboard: "/dashboard/*",
  form: "/form/*",
};

const Dashboard = React.lazy(() =>
  import("./ui/screens/Dashboard").then((m) => ({
    default: m.Dashboard,
  }))
);

const AdoptionForm = React.lazy(() =>
  import("./ui/screens/AdoptionForm").then((m) => ({
    default: m.AdoptionForm,
  }))
);

const PublicApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/adociones" element={<AdoptionForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export {
  PublicApp as App,
}
