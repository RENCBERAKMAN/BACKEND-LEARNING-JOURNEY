function fetchUserList() {
  // Geçici örnek veri
  const users = [
    { id: 1, name: "Ahmet", role: "admin" },
    { id: 2, name: "Zeynep", role: "member" },
    { id: 3, name: "Kerem", role: "guest" },
  ];
  return users;
}

module.exports = { fetchUserList };