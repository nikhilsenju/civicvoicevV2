import { useEffect, useState } from "react";
import Post from "./post"; // Ensure the correct casing in the import
import './IndexPage.css';

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/getPosts`, {
                    method: 'GET'
                });
                
                if (!response.ok) throw new Error('Failed to fetch posts'); // Error handling
                const Posts = await response.json();
                // Map posts directly with existing like count from backend
                const postsWithLikes = Posts.map(post => ({
                    ...post,
                    likeCount: post.likeCount || 0, // Use existing like count or default to 0
                }));
                setPosts(postsWithLikes);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchPosts();
    }, []);

    // Function to handle search
    const handleSearch = (search) => {
        const results = posts.filter(post =>
            post.Title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(results);
    };

    // Debounce search input
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        handleSearch(e.target.value);
    };

    // Function to handle like button click
    const handleLike = async (postId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts/${postId}/like`, {
                method: 'PUT'
            });

            if (!response.ok) throw new Error('Failed to like post');
            // Update local state
            const updatedPosts = posts.map(post => {
                if (post._id === postId) {
                    return { ...post, likeCount: (post.likeCount || 0) + 1 }; // Increment like count
                }
                return post;
            });
            setPosts(updatedPosts);
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    // Sort posts based on like count in descending order
    const sortedPosts = [...(searchResults.length > 0 ? searchResults : posts)].sort((a, b) => b.likeCount - a.likeCount);

    if (loading) {
        return <div>Loading posts...</div>; // Loading indicator
    }

    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search (if no results match, it shows all posts)"
                    value={searchText}
                    onChange={handleSearchChange} // Use the debounced function
                />
            </div>
            <div>
                {sortedPosts.map(post => (
                    <Post
                        key={post._id}
                        {...post}
                        onLike={() => handleLike(post._id)} // Pass like handler to each post
                    />
                ))}
            </div>
        </div>
    );
}
