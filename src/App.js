import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Main } from "./pages/Main";
import OrderDetail from "./pages/OrderDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/orderDetail/:orderId" element={<OrderDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
