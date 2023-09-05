import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import EditPage from "./Components/EditPage";
import { TransactionProvider } from "./Context/context";
import "./App.css"

function App() {
  return (
    <TransactionProvider>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"></link>
      <Routes>
        <Route path="/" element={<Home />} /> 

        <Route path="/edit" element={<EditPage />} />
           
       
      </Routes>
    </TransactionProvider>
  );
}

export default App;
