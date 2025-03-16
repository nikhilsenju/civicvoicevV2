import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./post.css";
import { useState } from "react";

const Post = (props) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likeCount);
  const [showFullContent, setShowFullContent] = useState(false);

  async function handleLike(event) {
    event.stopPropagation();
    event.preventDefault();

    if (!liked) {
      setLiked(true);
      setLikeCount(likeCount + 1);
      await props.onLike(props._id);
    } else {
      setLiked(false);
    }
  }
  const toggleContent = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setShowFullContent(!showFullContent);
  };

  const maxCharacters = 100;
  return (
    <div className="container">
      <Link to={`/${props._id}`}>
        <div className="post">
          <div className="image">
            <img src={props.Cover} alt="Post cover" />
          </div>
          <div className="Content">
            <h1 className="heading">
              <span className="underline--magical">{props.Title}</span>
            </h1>
            <div className="info">
              <div className="author">
                by {props.Author?.username || "Unknown Author"}
              </div>
              &nbsp;&nbsp;
              <time>{format(new Date(props.updatedAt), "MMM d, yyyy")}</time>
            </div>
            <p>
              {showFullContent
                ? props.Summary
                : props.Summary.slice(0, maxCharacters) +
                  (props.Summary.length > maxCharacters ? "..." : "")}
              {props.Summary.length > maxCharacters && (
                <span onClick={toggleContent} className="read-more">
                  {showFullContent ? " Show Less" : " Read More"}
                </span>
              )}
            </p>
          </div>
          <div className="like-section">
            <div className="heart-container" onClick={handleLike}>
              <div className={`heart ${liked ? "is-active" : ""}`}></div>
            </div>
            <p className="like-count">Likes: {likeCount}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Post;
