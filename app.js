const express = require("express");
const app = express();
const port = parseInt(process.env.PORT);
const doctorsRouter = require("./routers/doctorsRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const doctorsController = require("./controllers/doctorsController");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.get("/", (req, res) => {
  res.send("ok");
});

app.use("/api/doctors", doctorsRouter);

app.post("/api/doctors", doctorsController.storeDoctors);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
