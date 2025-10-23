import { getUsers, getUserById, addUser, updateUser, deleteUser } from "../data/usersData.js";

export const listUsers = async (req, res) => {
  const users = await getUsers();
  res.json(users);
};

export const getSingleUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await getUserById(id);
  user ? res.json(user) : res.status(404).json({ message: "Utente non trovato" });
};

export const createUser = async (req, res) => {
  const newUser = await addUser(req.body);
  res.status(201).json(newUser);
};

export const editUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const updated = await updateUser(id, req.body);
  updated ? res.json(updated) : res.status(404).json({ message: "Utente non trovato" });
};

export const removeUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = await deleteUser(id);
  deleted ? res.json(deleted) : res.status(404).json({ message: "Utente non trovato" });
};