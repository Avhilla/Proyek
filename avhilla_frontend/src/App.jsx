import React, { useState, useEffect } from "react";
import TambahProduk from "./components/TambahProduk";
import ProdukList from "./components/ProdukList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/ProdukStyles.css";

function App() {
  const [products, setProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const deleteProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="app-container">
      <h2 className="text-center fw-bold">Aplikasi E-Commerce Sederhana</h2>
      <p className="text-center text-muted">Kelola produk dengan mudah dan cepat</p>
      <button onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Komponen lainnya */}
    </div>

      {/* Tambah Produk */}
      <div className="tambah-produk">
        <TambahProduk addProduct={addProduct} />
      </div>

      {/* Daftar Produk */}
      <div className="daftar-produk">
        <ProdukList products={products} deleteProduct={deleteProduct} />
      </div>
    </div>
    
  );
}

export default App;
