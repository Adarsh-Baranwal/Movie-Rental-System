const config = require("config");

module.exports = function () {
  //console.log("hellolo");
  // let x = config.get("jwtprivatekey");
  //console.log(x);
  // console.log(config.get("jwtprivatekey"));
  if (!config.has("jwtprivatekey")) {
    throw new Error("FATAL ERROR:aaa jwtPrivateKey is not defined.");
  }
};
