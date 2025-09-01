//Adiel Sofia Mendelson 206352742
//Orly Wallela 206696775

const express = require("express");
const app = express();
const path = require("path");
const userRoutes = require("./routes/users");
const projectsRoutes = require("./routes/projects");
const functionRoutes = require("./routes/functions");
const postsRoutes = require("./routes/posts");
const eventsRoutes = require("./routes/events");
const picturesRoutes = require("./routes/pictures");
const filesRoutes = require("./routes/files");
const requestsRoutes = require("./routes/requests");
const port = 8801;
app.use("/uploads", express.static("uploads")); // Distributing uploaded files
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/user", userRoutes);
app.use("/project", projectsRoutes);
app.use("/function", functionRoutes);
app.use("/posts", postsRoutes);
app.use("/events", eventsRoutes);
app.use("/pictures", picturesRoutes);
app.use("/files", filesRoutes);
app.use("/requests", requestsRoutes);

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
