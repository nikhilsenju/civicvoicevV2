import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './post.css';

const Post = (props) => {
    function handleLike(event) {
        event.stopPropagation();  // Prevent navigation to the post
        event.preventDefault();   // Prevent the link from being followed
        props.onLike();           // Call the like handler passed via props
    }

    return (
        <div className='container'>
            <Link to={`/${props._id}`}>
                <div className='post'>
                    {/* Like button and count positioned on the upper right side */}
                    <div className='like-section'>
                        <button onClick={handleLike} className="like-button">Like</button>
                        <p className="like-count">Likes: {props.likeCount}</p>
                    </div>

                    <div className='image'>
                        <img src={props.Cover} alt='' />
                    </div>
                    <div className='Content'>
                        <h1>{props.Title}</h1>
                        <div className='info'>
                            <div className='author'>by {props.Author.username}</div>
                            &nbsp; &nbsp;
                            <time>{format(new Date(props.updatedAt), 'MMM d yyyy')}</time>
                        </div>
                        <p>{props.Summary}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Post;
