import { useEffect, useState } from "react";
import Post from "./post";
import './IndexPage.css';

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/getPosts`, {
            method: 'GET'
        })
        .then(response => {
            response.json().then(Posts => {
                const postsWithLikes = Posts.map(post => ({
                    ...post,
                    likeCount: 0, // Initialize like count to 0 for each post
                }));
                setPosts(postsWithLikes);
            });
        })
        .catch(error => {
            console.error("Error fetching posts:", error);
        });
    }, []);

    // Function to handle search
    function handleSearch(search) {
        const searchResults = posts.filter(post =>
            post.Title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(searchResults);
    }

    // Function to handle like button click
    function handleLike(postId) {
        const updatedPosts = posts.map(post => {
            if (post._id === postId) {
                return { ...post, likeCount: post.likeCount + 1 }; // Increment like count
            }
            return post;
        });
        setPosts(updatedPosts);
    }

    // Sort posts based on like count in descending order
    const sortedPosts = [...(searchResults.length > 0 ? searchResults : posts)].sort((a, b) => b.likeCount - a.likeCount);

    return (
        <div>
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search (if no results match, it shows all posts)" 
                    value={searchText} 
                    onChange={(e) => { 
                        setSearchText(e.target.value); 
                        handleSearch(e.target.value);
                    }} 
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
