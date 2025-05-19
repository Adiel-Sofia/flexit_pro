const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const persons = [
    {
      name: "Dana",
      image_src: "/uploads/man.png",
    },
    {
      name: "Yossi",
      image_src: "/uploads/man.png",
    },
  ];

  res.json(persons);
});
// router.get("/:id", (req, res) => {
//   const article = {
//     id: 1,
//     title: "Understanding JavaScript",
//     content:
//       "JavaScript is a versatile programming language used for both front-end and back-end development.",
//     img: "https://loremflickr.com/200/200?random=1",
//   };
//   res.json(article);
// });

router.delete("/:id", (req, res) => {
  res.json({ message: "article deleted!" });
});
module.exports = router;
