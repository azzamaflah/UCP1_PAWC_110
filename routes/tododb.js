const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Mendapatkan semua data binatang
router.get("/", (req, res) => {
  db.query("SELECT * FROM binatang", (err, results) => {
    if (err) return res.status(500).send("Internal Server Error");
    res.json(results);
  });
});

// Mendapatkan data binatang berdasarkan ID
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM binatang WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).send("Internal Server Error");
      if (results.length === 0)
        return res.status(404).send("Binatang tidak ditemukan");
      res.json(results[0]);
    }
  );
});

// Menambahkan data binatang baru
router.post("/", (req, res) => {
  const { nama, habitat } = req.body;
  if (!nama || !habitat) {
    return res.status(400).send("Nama dan habitat tidak boleh kosong");
  }

  db.query(
    "INSERT INTO binatang (nama, habitat) VALUES (?, ?)",
    [nama, habitat],
    (err, results) => {
      if (err) return res.status(500).send("Internal Server Error");
      const newAnimal = { id: results.insertId, nama, habitat };
      res.status(201).json(newAnimal);
    }
  );
});

// Memperbarui data binatang
router.put("/:id", (req, res) => {
  const { nama, habitat } = req.body;
  db.query(
    "UPDATE binatang SET nama = ?, habitat = ? WHERE id = ?",
    [nama, habitat, req.params.id],
    (err, results) => {
      if (err) return res.status(500).send("Internal Server Error");
      if (results.affectedRows === 0)
        return res.status(404).send("Binatang tidak ditemukan");
      res.json({ id: req.params.id, nama, habitat });
    }
  );
});

// Menghapus data binatang
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM binatang WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).send("Internal Server Error");
      if (results.affectedRows === 0)
        return res.status(404).send("Binatang tidak ditemukan");
      res.status(204).send(); // No content
    }
  );
});

module.exports = router;
