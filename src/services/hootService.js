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

export{ index }; //named export syntax used to export multiple fns from a module