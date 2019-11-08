const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const users = require("./users.json");

const app = new express();

const port = process.env.VULNLOGIN_PORT || 80;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  if (!users.hasOwnProperty(req.cookies.user)) {
    console.log("Invalid or no cookie! Redirecting user to login page.");
    return res.redirect("/login");
  }
  
  console.log("Valid cookie, showing dashboard.");
  res.render("dashboard", {
    cookies: req.cookies
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login", {
    user: req.cookies.user
  });
});

app.post("/login", (req, res) => {
  // Sanitize inputs
  var username = req.body.username.trim();
  var password = req.body.password;

  console.log(`Login Attempt - ${username}, ${password}`);

  if (!users.hasOwnProperty(username)) {
    return res.render("login", {
      error: "Invalid username"
    });
  }

  var user = users[username];

  if (user.password != password) {
    return res.render("login", {
      error: "Invalid password"
    });
  }

  res.cookie("user", username, {
    maxAge: 900000
  });
  return res.redirect("/");
});

app.use("/", express.static("assets"));

app.listen(port, () => {
  console.log(`VulnLogin listening on port ${port}!`);
});