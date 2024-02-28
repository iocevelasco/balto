import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const APP_BASE_ROUTES_PATTERNS = {
  dashboard: "/",
  AdoptionForm: "/formulario-adoption",
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
        <Route path={APP_BASE_ROUTES_PATTERNS.dashboard} element={<Dashboard />} />
        <Route path={APP_BASE_ROUTES_PATTERNS.AdoptionForm} element={<AdoptionForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export {
  PublicApp as App,
}
