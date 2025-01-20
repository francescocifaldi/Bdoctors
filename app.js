const express = require("express");
const app = express();
const port = parseInt(process.env.PORT);
const doctorsRouter = require("./routers/doctorsRouter");
const cors = require("cors");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.get("/", (req, res) => {
  res.send("ok");
});

app.use("/api/doctors", doctorsRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
