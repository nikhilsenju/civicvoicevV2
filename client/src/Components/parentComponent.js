import React, { useState } from 'react';
import Post from './post'; // Import your Post component

const ParentComponent = ({ post }) => {
    const [likeCount, setLikeCount] = useState(post.likeCount); // Initialize with the current like count

    // Function to handle liking the post
    const handleLike = async () => {
        try {
            // Call the API to like the post
            console.log("nikhil");
            
            const response = await fetch(`posts/${post._id}/like`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to like the post');
            }

            const data = await response.json(); // Get the updated like count from the response
            setLikeCount(data.likeCount); // Update the local like count with the response
        } catch (error) {
            console.error("Error liking the post:", error);
            // Optionally handle the error in the UI (e.g., show a message)
        }
    };

    return (
        <Post 
            {...post} 
            likeCount={likeCount} // Pass the current like count to the Post component
            onLike={handleLike}   // Pass the handleLike function to the Post component
        />
    );
};

export default ParentComponent;
