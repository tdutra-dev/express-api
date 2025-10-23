import { getUsers, getUserById, addUser, updateUser, deleteUser } from "../data/usersData.js";

export const listUsers = (req, res) => {
  res.json(getUsers());
};

export const getSingleUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = getUserById(id);
  user ? res.json(user) : res.status(404).json({ message: "Utente non trovato" });
};

export const createUser = (req, res) => {
  const newUser = addUser(req.body);
  res.status(201).json(newUser);
};

export const editUser = (req, res) => {
  const id = parseInt(req.params.id);
  const updated = updateUser(id, req.body);
  updated ? res.json(updated) : res.status(404).json({ message: "Utente non trovato" });
};

export const removeUser = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = deleteUser(id);
  deleted ? res.json(deleted) : res.status(404).json({ message: "Utente non trovato" });
};