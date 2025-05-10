import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Users() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);

    const pageChange = () => {
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get(`https://reqres.in/api/users?page=${page}`);
                setData(response.data);
            } catch (error) {
                setError('Error fetching data');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchdata(); // ✅ Call it
    }, [page]);

    return (
        <div className='p-4'>
            {loading && <p>Loading...</p>}
            {error && <p className='text-red-500'>{error}</p>}

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {data.map((user) => (
                    <div key={user.id} className='border rounded-lg p-4 shadow-lg flex flex-col items-center'>
                        <img className='w-24 h-24 rounded-full mb-2' src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                        <h2 className='text-lg font-bold'>{user.first_name} {user.last_name}</h2>
                        <p className='text-gray-600'>{user.email}</p>
                    </div>
                ))}
            </div>

            <div className='flex justify-center mt-4'>
                <button className='bg-blue-600 text-white px-4 py-2 rounded' onClick={pageChange}>Next</button>
            </div>
        </div>
    );
}

export default Users;
