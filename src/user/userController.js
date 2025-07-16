const { fetchUserList } = require("./userService");

const getUserList = (req, res) => {
  console.log("✅ getUserList fonksiyonu çağrıldı");
  const users = fetchUserList();
  res.json(users);
};

module.exports = { getUserList };