import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "@tamagui/core/reset.css";

import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "./tamagui.config";
import { Button, Text } from "tamagui";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import DashBoard from "./pages/DashBoard/DashBoard";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import PrivateRoute from "./Routes/PrivateRoute";
import AnonymousRoute from "./Routes/AnonymousRoute";

function App() {
  const queryClient = new QueryClient();
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route path="/sign-in" element={<SignIn />} />
            </Route>
            <Route element={<AnonymousRoute />}>
              <Route path="/dashboard" element={<DashBoard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}

export default App;
