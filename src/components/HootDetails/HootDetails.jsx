import { useState, useEffect, useContext } from 'react';
import CommentForm from '../CommentForm/CommentForm';
//import * as hootService from '../../services/hootService';
import { show, createComment, deleteComment} from '../../services/hootService'; //best way to import 
import { UserContext } from '../../contexts/UserContext';
import { useParams, Link } from 'react-router';


const HootDetails = (props) => {
    const [hoot, setHoot] = useState(null);//null so can do conditional render if no hootdetails 
    //access the user using useContext hook & context provider
    const { user } = useContext(UserContext); 
    const { hootId } = useParams();

    const handleAddComment = async (commentFormData) => {
        const newComment = await createComment(hootId, commentFormData);
        setHoot({...hoot, comments: [...hoot.comments, newComment]});
    };

    const handleDeleteComment = async (commentId) => {
        console.log(commentId);
        const deletedComment = await deleteComment(hootId, commentId);
        setHoot({...hoot, comments: hoot.comments.filter((comment) => comment._id !== commentId)});
    };

    useEffect(() => {
        const fetchHoot = async () => {
            const hootData = await show(hootId);
            setHoot(hootData)
        };
        fetchHoot(); //this will run when effect function runs
        //the effect function runs when we have a hootId
    }, [hootId]);

    if (!hoot) return <main>Loading...</main>//show loading while hoot gets hootData

    return (
        <main>
            <section>
                <header>
                    <p>{hoot.category.toUpperCase()}</p>
                    <h1>{hoot.title}</h1>
                    <p>
                        {`${hoot.author.username} posted on ${new Date(hoot.createdAt).toLocaleDateString()}`}
                    </p>
                    {hoot.author._id === user._id && (
                        <>
                            <Link to={`/hoots/${hootId}/edit`}>Edit</Link>
                            <button onClick={() => props.handleDeleteHoot(hootId)}>
                                Delete
                            </button>
                        </>
                    )}
                </header>
                <p>{hoot.text}</p>
            </section>
            <section>
                <h2>Comments</h2>
                <CommentForm handleAddComment={handleAddComment} />
                {!hoot.comments.length && <p>There are no comments.</p>}

                {hoot.comments.map((comment) => (
                    <article key={comment._id}>
                        <header>
                            <p>
                                {`${comment.author.username} posted on ${new Date(comment.createdAt).toLocaleDateString()}`}
                            </p>
                            {comment.author._id === user._id && (
                                <>
                                    <Link>Edit</Link>
                                    <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                                </>
                            )}
                        </header>
                        <p>{comment.text}</p>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default HootDetails;