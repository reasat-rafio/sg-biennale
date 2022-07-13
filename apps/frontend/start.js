const exec = require("child_process").exec;

exec("PATH=/opt/plesk/node/16/bin:$PATH; yarn run start", function (err, stdout, stderr) {
  if (err) {
    console.log(err);
    // handle error
  }
  console.log(stdout);
});
