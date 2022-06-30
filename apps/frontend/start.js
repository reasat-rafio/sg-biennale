const exec = require("child_process").exec;

exec("yarn run start", function (err, stdout, stderr) {
  if (err) {
    console.log(err);
    // handle error
  }
  console.log(stdout);
});
