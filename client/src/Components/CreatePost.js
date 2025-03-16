import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !summary || !content) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setIsLoading(true);

    const formData = new FormData();
    formData.set("Title", title);
    formData.set("Summary", summary);
    formData.set("File", file);
    formData.set("Content", content);

    const token = localStorage.getItem("Authtoken");
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/newpost`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();
    setIsLoading(false);

    if (result === "ok") {
      setTitle("");
      setSummary("");
      setContent("");
      setFile(null);
      Navigate("/");
    } else {
      alert("Error! fill all fields");
    }
  }

  return (
    <div className="createpost fade-in">
      <h1>Create a Post</h1>
      {error && <div className="error-message">{error}</div>}
      <form className="fade-in">
        <input
          type="text"
          required
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          value={title}
          className="hover-scale"
        />
        <input
          type="text"
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summary"
          value={summary}
          className="hover-scale"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="hover-scale"
        />
        <h3>Content</h3>
        <ReactQuill
          onChange={(Content) => setContent(Content)}
          className="QuillContent"
          theme="snow"
          value={content}
        />
        <button onClick={handleSubmit} className="Btn " disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
