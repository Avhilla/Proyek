import React, { useState, useEffect } from "react";
import TambahProduk from "./components/TambahProduk";
import ProdukList from "./components/ProdukList";
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
      <h1>SELAMAT DATANG DI E-COMMERCE SEDERHANA</h1>
      <button onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

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
