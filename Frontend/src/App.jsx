import React from "react";
import EmailBuilder from "./components/EmailBuilder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <EmailBuilder />
      <ToastContainer/>
    </div>
  );
}

export default App;
