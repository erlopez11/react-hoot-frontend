import { useState } from 'react';

const CommentForm = (props) => {
    const [formData, setFormData] = useState({text: ''});

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //TODO: handleAddComment
        setFormData({text: ''});
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='text-input'>Your Comment:</label>
            <textarea
                required
                type='text'
                name='text'
                id='text-input'
                value={formData.text}
                onChange={handleChange}
            />
            <button type='submit'>Submit Comment</button>
        </form>
    );

};

export default CommentForm