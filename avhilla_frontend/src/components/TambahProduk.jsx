import React, { useState } from "react";
import axios from "axios";
import "./../assets/ProdukStyles.css"; // Import CSS agar styling tetap berlaku

function TambahProduk() {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi input
    if (!nama || !harga) {
      setError("Nama dan Harga wajib diisi");
      return;
    }
    setError("");

    axios
      .post("http://localhost:3001/produk", { nama, harga })
      .then((res) => {
        console.log("Produk berhasil ditambah:", res.data);
        setNama("");
        setHarga("");
      })
      .catch((err) => {
        console.error("Error menambah produk:", err);
      });
  };

  return (
    <div className="form-container">
    <h2 className="judul-form">TAMBAH PRODUK</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Produk: </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label>Harga: </label>
          <input
            type="number"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}

export default TambahProduk;
