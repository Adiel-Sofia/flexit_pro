//Adiel Sofia Mendelson 206352742
//Orly Wallela 206696775

const express = require("express");
const app = express();

const userRoutes = require("./routes/users");
const projectsRoutes = require("./routes/projects");
const functionRoutes = require("./routes/functions");

const port = 8801;
app.use("/uploads", express.static("uploads")); // Distributing uploaded files
app.use(express.json());

app.use("/user", userRoutes);
app.use("/project", projectsRoutes);
app.use("/function", functionRoutes);

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
