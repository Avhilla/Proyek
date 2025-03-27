import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Tambahkan Bootstrap

function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [editData, setEditData] = useState({ id: '', nama: '', harga: '' });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newProduk, setNewProduk] = useState({ nama: '', harga: '' });
  const formRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:3001/produk')
      .then((response) => setProduk(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/produk/${id}`)
      .then(() => {
        setProduk(produk.filter((p) => p.id !== id));
      })
      .catch(err => console.error(err));
  };

  const handleEdit = (item) => {
    setEditData(item);
    setIsEditOpen(true);
    setTimeout(() => formRef.current.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/produk/${editData.id}`, editData)
      .then(() => {
        setProduk(produk.map((p) => (p.id === editData.id ? editData : p)));
        setIsEditOpen(false);
      })
      .catch(err => console.error(err));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/produk', newProduk)
      .then((response) => {
        setProduk([...produk, response.data]);
        setNewProduk({ nama: '', harga: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">DAFTAR PRODUK</h2>  

      {/* Form Tambah Produk */}
      <form onSubmit={handleAdd} className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Nama Produk"
            value={newProduk.nama}
            onChange={(e) => setNewProduk({ ...newProduk, nama: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            placeholder="Harga"
            value={newProduk.harga}
            onChange={(e) => setNewProduk({ ...newProduk, harga: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">Tambah</button>
        </div>
      </form>

      {/* Tabel Daftar Produk */}
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {produk.map((item) => (
            <tr key={item.id}>
              <td>{item.nama}</td>
              <td>Rp{item.harga}</td>
              <td>
                <button className="btn btn-success me-2" onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form Edit Produk */}
      {isEditOpen && (
        <div className="card p-3 mt-4" ref={formRef}>
          <h4 className="text-center">Edit Produk</h4>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Nama Produk:</label>
              <input
                type="text"
                value={editData.nama}
                onChange={(e) => setEditData({ ...editData, nama: e.target.value })}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Harga:</label>
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
