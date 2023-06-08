const CryptoPassword = (password) => {
  const crypto = require("crypto");
  const first = crypto.createHash("sha1").update(password).digest("binary");
  const second = crypto.createHash("sha1").update(first).digest("hex");
  return "*" + second.toUpperCase();
};
module.exports = CryptoPassword;
