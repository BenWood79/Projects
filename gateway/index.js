const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();
app.use(cors());
app.use(express.json());


app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("index");
});

// Animal database (port 3001) - mount on /animals prefix
app.use(
  "/animals",
  proxy("http://localhost:3001", {
    changeOrigin: true,
    pathRewrite: {
      "^/animals": "",
    },
  })
);

// GoldMed app (port 3004) - mount on /goldmed prefix
app.use(
  "/goldmed",
  proxy("http://localhost:3004", {
    changeOrigin: true,
    pathRewrite: {
      "^/goldmed": "",
    },
  })
);

// Stock market app (port 3005) - mount on /stocks prefix
app.use(
  "/stocks",
  proxy("http://localhost:3005", {
    changeOrigin: true,
    pathRewrite: {
      "^/stocks": "",
    },
  })
);

// Theo shop app (port 3006) - mount on /shop prefix
app.use(
  "/shop",
  proxy("http://localhost:3006", {
    changeOrigin: true,
    pathRewrite: {
      "^/shop": "",
    },
  })
);

app.listen(8000, () => {
  console.log("Gateway is running on Port 8000");
});
