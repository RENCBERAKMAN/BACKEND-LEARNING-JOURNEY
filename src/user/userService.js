// Veritabanı yerine geçici örnek veri
const fakeUserList = [
  { id: 1, name: "Ahmet", role: "admin" },
  { id: 2, name: "Zeynep", role: "member" },
  { id: 3, name: "Kerem", role: "guest" },
];

// Veritabanı yerine fake veri gönder
async function fetchUserList() {
  try {
    return fakeUserList; // Veritabanı yerine geçici liste
  } catch (err) {
    console.error("Test kullanıcıları alınırken hata:", err);
    return [];
  }
}

// Yeni kullanıcı ekleme simülasyonu
async function createUser(data) {
  try {
    const newUser = {
      id: fakeUserList.length + 1,
      ...data,
    };
    fakeUserList.push(newUser);
    return newUser;
  } catch (err) {
    console.error("Kullanıcı eklenemedi:", err);
    throw err;
  }
}

module.exports = { fetchUserList, createUser };