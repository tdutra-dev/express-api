import { promises as fs } from "fs";

const DATA_FILE = "./src/data/users.json";

// 🧠 Funzione helper per leggere i dati dal file
async function readData() {
  const data = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

// ✏️ Funzione helper per scrivere dati aggiornati nel file
async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// ✅ CRUD OPERATIONS

export async function getUsers() {
  return await readData();
}

export async function getUserById(id) {
  const users = await readData();
  return users.find((u) => u.id === id);
}

export async function addUser(user) {
  const users = await readData();
  const newUser = { id: Date.now(), ...user }; // id unico
  users.push(newUser);
  await writeData(users);
  return newUser;
}

export async function updateUser(id, newData) {
  const users = await readData();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...newData };
  await writeData(users);
  return users[index];
}

export async function deleteUser(id) {
  const users = await readData();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  const deleted = users.splice(index, 1)[0];
  await writeData(users);
  return deleted;
}
