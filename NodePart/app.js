const express = require("express");
const app = express();

const userRoutes = require("./routes/users");
const port = 8801;
app.use("/uploads", express.static("uploads")); // Distributing uploaded files
app.use(express.json());

app.use("/user", userRoutes);
app.use((err, req, res, next) => {
  console.error(err); // Log error
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
