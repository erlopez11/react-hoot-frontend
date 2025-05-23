const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/hoots`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                //Don't forget space between colon and Bearer (else will lead to error)
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        });
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

const show = async (hootId) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

const create = async (hootFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hootFormData),
        });
        return res.json();
    } catch (error) {
        console.error(error);
        
    }
};

const deleteHoot = async (hootId) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }, 
        });
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

const updateHoot = async (hootId, hootFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hootFormData),
        });
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

const createComment = async (hootId, commentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}/comments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentFormData),
        });
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

const deleteComment = async (hootId, commentId) => {
    try {
        console.log(hootId);
        console.log(commentId);
        const res = await fetch(`${BASE_URL}/${hootId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

export{ 
    index, 
    show, 
    create, 
    createComment, 
    deleteHoot,
    updateHoot,
    deleteComment,
}; //named export syntax used to export multiple fns from a module