const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();
app.use(cors());
app.use(express.json());

// Proxy everything to the animal service running on port 3001
app.use("/", proxy("http://localhost:3001", {
    proxyReqPathResolver: (req) => req.originalUrl, // keep the original path intact
  })
);

app.listen(8000, () => {
  console.log("Gateway is running on Port 8000");
});
