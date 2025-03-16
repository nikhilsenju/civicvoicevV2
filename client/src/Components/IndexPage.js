import { useEffect, useState } from "react";
import Post from "./post"; // Ensure correct import casing
import "./IndexPage.css"; // Add the unique styles for this page

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/getPosts`,
          {
            method: "GET",
          }
        );

        if (!response.ok) throw new Error("Failed to fetch posts");
        const Posts = await response.json();
        const postsWithLikes = Posts.map((post) => ({
          ...post,
          likeCount: post.likeCount || 0,
        }));
        setPosts(postsWithLikes);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (search) => {
    const results = posts.filter((post) =>
      post.Title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    handleSearch(e.target.value);
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/posts/${postId}/like`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) throw new Error("Failed to like post");
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return { ...post, likeCount: (post.likeCount || 0) + 1 };
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const sortedPosts = [
    ...(searchResults.length > 0 ? searchResults : posts),
  ].sort((a, b) => b.likeCount - a.likeCount);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="index-page-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
        />
        <div className="search"></div>
      </div>
      <div className="post-container">
        {sortedPosts.map((post) => (
          <Post key={post._id} {...post} onLike={() => handleLike(post._id)} />
        ))}
      </div>
    </div>
  );
}
