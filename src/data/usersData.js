import { promises as fs } from "fs";

const DATA_FILE = "./src/data/users.json";

// 🧠 Lettura sicura del file
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("❌ Errore durante la lettura del file:", err.message);
    // Se il file non esiste, inizializza con un array vuoto
    if (err.code === "ENOENT") {
      await fs.writeFile(DATA_FILE, "[]");
      return [];
    }
    throw err;
  }
}

// ✏️ Scrittura sicura nel file
async function writeData(data) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("❌ Errore durante la scrittura del file:", err.message);
    throw err;
  }
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
  const newUser = { id: Date.now(), ...user };
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