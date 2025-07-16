// Geçici örnek veri — veritabanı olmadan çalışır
const fakeUserList = [
  { id: 1, name: "Ahmet", role: "admin" },
  { id: 2, name: "Zeynep", role: "member" },
  { id: 3, name: "Kerem", role: "guest" },
];

async function fetchUserList() {
  return fakeUserList;
}

async function createUser(data) {
  const newUser = {
    id: fakeUserList.length + 1,
    ...data,
  };
  fakeUserList.push(newUser);
  return newUser;
}

module.exports = { fetchUserList, createUser };