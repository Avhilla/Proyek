import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/ProdukStyles.css'; // Tambahkan ini agar CSS diterapkan

function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [editData, setEditData] = useState({ id: '', nama: '', harga: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ambil data produk dari server
  useEffect(() => {
    axios.get('http://localhost:3001/produk')
      .then((response) => setProduk(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Hapus produk dari server dan UI
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/produk/${id}`)
      .then(() => {
        setProduk(produk.filter((p) => p.id !== id));
      })
      .catch(err => console.error(err));
  };

  // Buka modal edit dengan data yang dipilih
  const handleEdit = (item) => {
    setEditData(item);
    setIsModalOpen(true);
  };

  // Update produk di server dan UI
  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/produk/${editData.id}`, editData)
      .then(() => {
        setProduk(produk.map((p) => (p.id === editData.id ? editData : p)));
        setIsModalOpen(false);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h2 className="title">DAFTAR PRODUK</h2>  
      <ul className="produk-list">
        {produk.map((item) => (
          <li key={item.id} className="produk-item">
            <span>{item.nama} - Rp{item.harga}</span>
            <div className="button-group">
              <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal Edit Produk */}
      {isModalOpen && (
        <div className="modal">
          <h2>EDIT PRODUK</h2>
          <form onSubmit={handleUpdate} className="modal-form">
            <input
              type="text"
              value={editData.nama}
              onChange={(e) => setEditData({ ...editData, nama: e.target.value })}
              required
            />
            <input
              type="number"
              value={editData.harga}
              onChange={(e) => setEditData({ ...editData, harga: e.target.value })}
              required
            />
            <div className="modal-buttons">
              <button type="submit" className="update-btn">Update</button>
              <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProdukList;
