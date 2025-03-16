import { Link, useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "./ViewPost.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function ViewPost() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null); // Change to null initially
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { userInfo } = useContext(UserContext);
  const Navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/getPosts/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((Post) => {
        setPostInfo(Post);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [id, submitting]);

  // If postInfo is not loaded yet, show a loading state
  if (!postInfo) return <div>Loading...</div>;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/getPosts/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: userInfo?.username, content: comment }),
        }
      );
      const updatedPost = await response.json();
      setPostInfo(updatedPost);
      setSubmitting(true);
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  }

  async function deletePost() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/deletePost/${id}`
      );
      const result = await response.json();
      if (result === "ok") {
        Navigate("/");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  }

  return (
    <div className="box1">
      <div className="Container">
        <div className="Title">
          <h1>{postInfo.Title}</h1>
        </div>
        <div>
          by{" "}
          <Link to={`/userposts/${postInfo.Author?.username}`}>
            <span className="author">@{postInfo.Author?.username}</span>
          </Link>
        </div>
        {/* Ensure userInfo and postInfo.Author are both loaded */}
        {userInfo &&
          postInfo.Author &&
          userInfo.username === postInfo.Author.username && (
            <div className="buttons">
              <Link to={`/editPost/${postInfo._id}`}>
                <button className="btn">Edit</button>
              </Link>
              &nbsp;&nbsp;&nbsp;
              <button onClick={deletePost} className="btn">
                Delete
              </button>
            </div>
          )}
        <div className="image">
          <img src={postInfo.Cover} alt="" />
        </div>
        <div className="Content">
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: postInfo.Content }}
          ></div>
        </div>
        <div>
          <h2>Comments [{postInfo.Comments?.length}]</h2>
        </div>
        <div className="CommentContainer">
          {postInfo.Comments?.length > 0 &&
            postInfo.Comments.map((Comment) => (
              <div key={Comment.id} className="SingleComment">
                <div className="CommentInfo">
                  {" "}
                  <span className="user">{Comment.user} : </span>{" "}
                  <span className="CommentDate">
                    {format(new Date(Comment.createdAt), "MMM d yyyy")}
                  </span>{" "}
                </div>{" "}
                <span>{Comment.content}</span>
                <hr />
              </div>
            ))}
        </div>

        {userInfo?.username && (
          <div className="Comments">
            <form onSubmit={handleSubmit}>
              <input
                required="true"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                type="text"
                placeholder="Add a comment.."
                value={comment}
              />
              <button className="btn">Add Comment</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
