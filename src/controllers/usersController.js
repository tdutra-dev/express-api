import User from "../models/User.js";

// GET /api/users
export const listUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// GET /api/users/:id
export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user ? res.json(user) : res.status(404).json({ message: "Utente non trovato" });
  } catch (err) {
    res.status(400).json({ message: "ID non valido" });
  }
};

// POST /api/users
export const createUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ message: "Nome ed email obbligatori" });
  try {
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/users/:id
export const editUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    updated ? res.json(updated) : res.status(404).json({ message: "Utente non trovato" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/users/:id
export const removeUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    deleted ? res.json(deleted) : res.status(404).json({ message: "Utente non trovato" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// import { getUsers, getUserById, addUser, updateUser, deleteUser } from "../data/usersData.js";

// export const listUsers = async (req, res) => {
//   const users = await getUsers();
//   res.json(users);
// };

// export const getSingleUser = async (req, res) => {
//   const id = parseInt(req.params.id);
//   const user = await getUserById(id);
//   user ? res.json(user) : res.status(404).json({ message: "Utente non trovato" });
// };

// export const createUser = async (req, res) => {
//   const { name, email } = req.body;
//   if (!name || !email) {
//     return res.status(400).json({ message: "Nome ed email sono obbligatori" });
//   }

//   const newUser = await addUser({ name, email });
//   res.status(201).json(newUser);
// };

// export const editUser = async (req, res) => {
//   const id = parseInt(req.params.id);
//   const { name, email } = req.body;

//   if (!name && !email) {
//     return res.status(400).json({ message: "Inserisci almeno un campo da aggiornare" });
//   }

//   const updated = await updateUser(id, req.body);
//   updated ? res.json(updated) : res.status(404).json({ message: "Utente non trovato" });
// };

// export const removeUser = async (req, res) => {
//   const id = parseInt(req.params.id);
//   const deleted = await deleteUser(id);
//   deleted ? res.json(deleted) : res.status(404).json({ message: "Utente non trovato" });
// };