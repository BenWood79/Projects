const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/animals", proxy("http://localhost:8001"));
app.use("/ecommerce/backend", proxy("http://localhost:8002"));
app.use("/ecommerce/frontend", proxy("http://localhost:8003"));
app.use("/goldmed", proxy("http://localhost:8004"));
app.use("/stockMarket", proxy("http://localhost:8005"));
app.use("/theTheoShop", proxy("http://localhost:8006"));
app.listen(8000, () => {
  console.log("Gateway is running on Port 8000");
});
