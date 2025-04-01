import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { show } from '../../services/hootService'

const HootForm = (props) => {
    const { hootId } = useParams(); //pulls out id from url
    const [formData, setFormData] = useState({
        title: '',
        text: '',
        category: 'News',
    });

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (hootId) {
            props.handleUpdateHoot(hootId, formData);
        } else {
            props.handleAddHoot(formData);
        }
    };

    useEffect(() => {
        const fetchHoot = async () => {
            const hootData = await show(hootId);
            setFormData(hootData);//fill out form with hoot details so we can edit hoot
        }
        if (hootId) fetchHoot();
        //Clean Up Function: Clear data and set it back to initial state
        //Undo the effect after we navigate away from edit page (so it doesn't show in new form)
        return () => setFormData({
            title: '',
            text: '',
            category: 'News',
        });
    }, [hootId]); //only set form state to hoot when editing

    return (
        <main>
            <h1>{hootId ? 'Edit Hoot' : 'New Hoot'}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title-input'>Title</label>
                <input
                    required
                    type='text'
                    name='title'
                    id='title-input'
                    value={formData.title}
                    onChange={handleChange}
                />
                <label htmlFor='text-input'>Text</label>
                <textarea
                    required
                    type='text'
                    name='text'
                    id='text-input'
                    value={formData.text}
                    onChange={handleChange}
                 />
                 <label htmlFor='category-input'>Category</label>
                 <select
                    required
                    name='category'
                    id='category-input'
                    value={formData.category}
                    onChange={handleChange}
                 >
                    <option value="News">News</option>
                    <option value="Games">Games</option>
                    <option value="Music">Music</option>
                    <option value="Movies">Movies</option>
                    <option value="Sport">Sports</option>
                    <option value="Television">Television</option>
                 </select>
                 <button type='submit'>Submit</button>
            </form>
        </main>
    );

};

export default HootForm;