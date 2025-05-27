const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();

router.post("/", (req, res) => {
  const userData = req.body;
  let userIn = null;

  const query = "SELECT * FROM users";
  db.query(query, [], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    //dealing with results
    for (let i = 0; i < results.length; i++) {
      if (
        results[i].email === userData.email &&
        results[i].password === userData.password
      ) {
        console.log("found");
        userIn = results[i];
      }
    }

    res.json(userIn);
  });
  // const users = [
  //   {
  //     name: "adiel",
  //     email: "adiel13150@gmail.com",
  //     password: "123456",
  //     image_src: "/uploads/woman.png",
  //   },
  //   {
  //     name: "Orly",
  //     email: "orly@gmail.com",
  //     password: "1234567",
  //     image_src: "/uploads/woman.png",
  //   },
  // ];

  // for (let i = 0; i < users.length; i++) {
  //   if (
  //     users[i].email === userData.email &&
  //     users[i].password === userData.password
  //   ) {
  //     console.log("found");
  //     userIn = users[i];
  //   }
  // }
  // console.log("sending ");

  // res.json(userIn);
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
