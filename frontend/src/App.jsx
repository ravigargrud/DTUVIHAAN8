import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import dotenv from "dotenv";
import DoctorLayout from "./pages/Doctor/DoctorLayout";
import PatientLayout from "./pages/Patient/PatientLayout";
import HomePage from "./pages/HomePage";
import Home from "./pages/Patient/Home";
import Patients from "./pages/Doctor/Patients";
import Appointments from "./pages/Doctor/Appointments";
import Dashboard from "./pages/Doctor/Dashboard";
import Book from "./pages/Patient/Book";
import About from "./pages/Patient/About";
import Contact from "./pages/Patient/Contact";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/user/patient",
      element: <PatientLayout />,
      children: [
        {
          path: "/user/patient/home",
          element: <Home />,
        },
        {
          path: "/user/patient/book",
          element: <Book />,
        },
        {
          path: "/user/patient/about",
          element: <About />,
        },
        {
          path: "/user/patient/contact",
          element: <Contact />,
        },
      ],
    },
    {
      path: "/user/doctor",
      element: <DoctorLayout />,
      children: [
        {
          path: "/user/doctor/",
          element: <Dashboard />,
        },
        {
          path: "/user/doctor/patients",
          element: <Patients />,
        },
        {
          path: "/user/doctor/appointments",
          element: <Appointments />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true, // Enables relative paths in nested routes
      v7_fetcherPersist: true, // Retains fetcher state during navigation
      v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
      v7_partialHydration: true, // Supports partial hydration for server-side rendering
      v7_skipActionErrorRevalidation: true, // Prevents revalidation when action errors occur
      v7_startTransition: true,
    },
  }
);

function App() {
  return (
    <Auth0Provider
      domain={`${import.meta.env.VITE_AUTH0_DOMAIN}`}
      clientId={`${import.meta.env.VITE_AUTH0_CLIENTID}`}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
    >
      <RouterProvider router={router}></RouterProvider>
    </Auth0Provider>
  );
}

export default App;
