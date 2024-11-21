const express = require("express");

const router = express.Router();

let animals = [
  {
    id: 1,
    nama: "kuda",
    habitat: "darat",
  },
  {
    id: 2,
    nama: "ikan",
    habitat: "air",
  },
];

// Get all animals
router.get("/", (req, res) => {
  res.json(animals);
});

// Add new animal
router.post("/", (req, res) => {
  const newAnimal = {
    id: animals.length + 1,
    nama: req.body.nama,
    habitat: req.body.habitat,
  };
  animals.push(newAnimal);
  res.status(201).json(newAnimal);
});

// Delete an animal
router.delete("/:id", (req, res) => {
  const animalIndex = animals.findIndex(
    (a) => a.id === parseInt(req.params.id)
  );
  if (animalIndex === -1)
    return res.status(404).json({ message: "Hewan tidak ditemukan" });

  const deletedAnimal = animals.splice(animalIndex, 1)[0];
  res
    .status(200)
    .json({ message: `Hewan '${deletedAnimal.nama}' telah dihapus` });
});

// Update an animal
router.put("/:id", (req, res) => {
  const animal = animals.find((a) => a.id === parseInt(req.params.id));
  if (!animal)
    return res.status(404).json({ message: "Hewan tidak ditemukan" });

  animal.nama = req.body.nama || animal.nama;
  animal.habitat = req.body.habitat || animal.habitat;

  res.status(200).json({
    message: `Hewan dengan ID ${animal.id} telah diperbarui`,
    updatedAnimal: animal,
  });
});

module.exports = router;
