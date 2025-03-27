import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./../assets/ProdukStyles.css"; // Import CSS agar styling tetap berlaku

function TambahProduk() {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset error message
    setErrorNama("");
    setErrorHarga("");

    // Validasi input
    if (!namaProduk.trim()) {
      setErrorNama("Nama Produk tidak boleh kosong");
      return;
    }
    if (!hargaProduk.trim()) {
      setErrorHarga("Harga tidak boleh kosong");
      return;
    }

    // Jika valid, tambahkan produk
    onTambah({ nama: namaProduk, harga: hargaProduk });
    
    // Reset form setelah submit
    setNamaProduk("");
    setHargaProduk("");
  };

}

export default TambahProduk;
