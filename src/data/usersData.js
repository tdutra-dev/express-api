// Finto "database" in memoria
let users = [
  { id: 1, name: "Tendresse", email: "tendresse@example.com" },
  { id: 2, name: "Paolo", email: "paolo@example.com" },
  { id: 3, name: "Samuel", email: "samuel@example.com" },
  { id: 4, name: "Matteo", email: "matteo@example.com" },
];

// Funzioni helper per leggere e modificare i dati
export const getUsers = () => users;
export const getUserById = (id) => users.find((u) => u.id === id);
export const addUser = (user) => {
  user.id = users.length + 1;
  users.push(user);
  return user;
};
export const updateUser = (id, newData) => {
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...newData };
    return users[index];
  }
  return null;
};
export const deleteUser = (id) => {
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  return null;
};