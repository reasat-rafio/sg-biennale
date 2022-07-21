// smee io
const SmeeClient = require("smee-client");

const smee = new SmeeClient({
  source: "https://smee.io/uLUJvpIxZjvLLj7C",
  target:
    "https://staging.singaporebiennale.org/modules/git/public/web-hook.php?uuid=23c06c15-780d-1618-8c40-a4536b16e221",
  logger: console,
});

smee.start();
