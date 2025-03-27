import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [editData, setEditData] = useState({ id: "", nama: "", harga: "" });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newProduk, setNewProduk] = useState({ nama: "", harga: "" });
  const formRef = useRef(null);

  // Fetch data produk dari backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/produk")
      .then((response) => setProduk(response.data))
      .catch((error) => {
        console.error(error);
        toast.error("Gagal memuat data produk!");
      });
  }, []);

  // Hapus produk dengan konfirmasi
  const handleDelete = (id, namaProduk) => {
    const isConfirmed = window.confirm(`Apakah Anda yakin ingin menghapus produk "${namaProduk}"?`);
    if (!isConfirmed) return; // Jika pengguna menekan "Cancel", tidak terjadi apa-apa

    axios
      .delete(`http://localhost:3001/produk/${id}`)
      .then(() => {
        setProduk(produk.filter((p) => p.id !== id));
        toast.success("Produk berhasil dihapus!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Gagal menghapus produk!");
      });
  };

  // Edit produk
  const handleEdit = (item) => {
    setEditData(item);
    setIsEditOpen(true);
    setTimeout(() => formRef.current.scrollIntoView({ behavior: "smooth" }), 100);
  };

  // Update produk
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/produk/${editData.id}`, editData)
      .then(() => {
        setProduk(produk.map((p) => (p.id === editData.id ? editData : p)));
        setIsEditOpen(false);
        toast.success("Produk berhasil diperbarui!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Gagal memperbarui produk!");
      });
  };

  // Tambah produk
  const handleAdd = (e) => {
    e.preventDefault();
    
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menambahkan produk ini?");
    if (!isConfirmed) return; // Jika user memilih "Batal", tidak ada aksi
    
    axios.post('http://localhost:3001/produk', newProduk)
      .then((response) => {
        setProduk([...produk, response.data]);
        setNewProduk({ nama: '', harga: '' });
        alert("Produk berhasil ditambahkan!"); // Notifikasi sukses
      })
      .catch(err => {
        console.error(err);
        alert("Gagal menambahkan produk!"); // Notifikasi gagal
      });
  };
    
  return (
    <div className="container mt-4">
      {/* Notifikasi Toastify */}
      <ToastContainer />

      {/* Card Tambah Produk */}
      <div className="card p-4 mb-4 shadow-sm">
        <h4 className="fw-bold">Tambah Produk</h4>
        <form onSubmit={handleAdd}>
          <div className="mb-2">
            <label className="fw-bold">Nama Produk:</label>
            <input
              type="text"
              className="form-control"
              value={newProduk.nama}
              onChange={(e) => setNewProduk({ ...newProduk, nama: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <label className="fw-bold">Harga:</label>
            <input
              type="number"
              className="form-control"
              value={newProduk.harga}
              onChange={(e) => setNewProduk({ ...newProduk, harga: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>

      {/* Card Daftar Produk */}
      <div className="card p-4 mb-4 shadow-sm">
        <h4 className="fw-bold text-center">Daftar Produk</h4>
        {produk.length === 0 ? (
          <p className="text-center text-muted">Tidak ada produk.</p>
        ) : (
          produk.map((item) => (
            <div key={item.id} className="card shadow-sm p-3 mb-2 d-flex flex-row justify-content-between align-items-center">
              <span className="fw-bold">{item.nama} - Rp{item.harga}</span>
              <div>
                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id, item.nama)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Card Form Edit Produk */}
      {isEditOpen && (
        <div className="card p-4 mt-4 shadow-sm" ref={formRef}>
          <h4 className="fw-bold text-center">Edit Produk</h4>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="fw-bold">Nama Produk:</label>
              <input
                type="text"
                value={editData.nama}
                onChange={(e) => setEditData({ ...editData, nama: e.target.value })}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="fw-bold">Harga:</label>
              <input
                type="number"
                value={editData.harga}
                onChange={(e) => setEditData({ ...editData, harga: e.target.value })}
                className="form-control"
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">Simpan</button>
              <button type="button" className="btn btn-secondary" onClick={() => setIsEditOpen(false)}>Batal</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProdukList;
