// Imports
import express from "express";
import userRoutes from "./routes/userRoutes.mjs";
import postRoutes from "./routes/postRoutes.mjs";

// Setups
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(JSON.stringify(req.body));
  }
  next();
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

// Global Err Handling
app.use((req, res) => {
  res.status(404).json({ msg: "Resource Not Found" });
});

app.use(function (err, req, res, next) {
  res.status(500).json({ msg: `❌ Error - ${err.message}` });
});

// Listener
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});