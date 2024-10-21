import Post from '../models/post.js'; // Adjust the path according to your project structure

export const likePost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId); // Use the correct model name
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.likeCount += 1; // Increment the like count
        await post.save(); // Save the updated post

        res.status(200).json({ likeCount: post.likeCount }); // Return the updated like count
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
