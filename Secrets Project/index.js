import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(checkUser);
function checkUser(req, res, next) {
  let password = req.body.password;
  if (password === "ILoveProgramming") {
    req.isUser = true;
  } else {
    req.isUser = false;
  }
  next();
}
app.post("/check", (req, res) => {
  if (req.isUser) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.send("<h1 style='color:red'>Wrong password</h1>");
  }
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.listen("3000", () => {
  console.log("App is listening on port 300");
});
