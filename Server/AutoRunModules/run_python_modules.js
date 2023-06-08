const config = require("../config.json");
const spawn = require("child_process").spawn;
const result_ = spawn("python", ["Save_SISEDATA.py", config.PASSWORD]);

result_.stdout.on("data", (result) => {
  console.log(result.toString());
});

result_.stderr.on("data", function (data) {
  console.log("에러발생");
  console.log(data.toString());
});
