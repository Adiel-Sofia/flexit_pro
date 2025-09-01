import React, { useEffect, useState } from "react";
import Blog from "../blog/Blog";
import classes from "./blogList.module.css";
import axios from "axios";
import { IoAddCircle } from "react-icons/io5";

const BlogList = (props) => {
  const { functionId } = props;
  const [postsData, setPostsData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [authorName, setAuthorName] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.userName : null;
  });
  function getBlogData() {
    const functionToSend = { functionId };

    axios
      .post("/posts", functionToSend)
      .then((res) => {
        // נקבל [{postId:1}, {postId:2} ...]
        const postsIds = res.data.map((row) => row.postId);

        if (postsIds.length > 0) {
          axios
            .post("/posts/data", { postsIds })
            .then((result) => {
              setPostsData(result.data); // עכשיו זה מערך של הפוסטים עצמם
            })
            .catch((error) => {
              console.error("Error in /posts/data:", error);
            });
        } else {
          // אם אין פוסטים בכלל – ננקה את הרשימה
          setPostsData([]);
        }
      })
      .catch((error) => {
        console.error("Error in /posts:", error);
      });
  }
  useEffect(() => {
    getBlogData();
  }, [functionId]);
  const handleSave = () => {
    const postToSave = {
      functionId: functionId,
      title: editedTitle,
      content: editedContent,
    };

    axios
      .put("/posts/add", postToSave)
      .then((result) => {
        console.log(result.data);
        getBlogData();
      })
      .catch((error) => {
        console.error("Error in /posts/data:", error);
      });
    setIsAdding(false);
  };
  return (
    <div className={classes.bloglist_container}>
      <div className={classes.bloglist_header}>
        <div>Blog Posts</div>
        <div>
          <IoAddCircle onClick={() => setIsAdding(true)} />
        </div>
      </div>
      {postsData.map((post) => (
        <Blog
          getBlogData={getBlogData}
          key={post.postId}
          postId={post.postId}
          title={post.title}
          author={authorName}
          date={post.postDate.split("T")[0]}
          content={post.content}
        />
      ))}
      {isAdding && (
        <div className={classes.modalOverlay}>
          <div className={classes.modal}>
            <h2>Edit Blog</h2>
            <label>Title:</label>
            <input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />

            <label>Content:</label>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />

            <div className={classes.modalButtons}>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsAdding(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
