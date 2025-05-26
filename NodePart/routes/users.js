const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const userData = req.body;
  console.log("adiel2");
  let userIn = [];
  const users = [
    {
      name: "adiel",
      email: "adiel13150@gmail.com",
      password: "123456",
      image_src: "/uploads/woman.png",
    },
    {
      name: "Orly",
      email: "orly@gmail.com",
      password: "1234567",
      image_src: "/uploads/woman.png",
    },
  ];
  console.log(userData);
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email === userData.email &&
      users[i].password === userData.password
    ) {
      console.log("found");
      userIn = users[i];
    }
  }
  console.log("sending ");

  res.json(userIn);
  // res.json(users);
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
