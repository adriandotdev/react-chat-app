
import { Outlet, Navigate, useLoaderData } from 'react-router-dom';
import axios from 'axios';

function NotPrivatePage() {

    const data = useLoaderData();

    if (!data)
        return <Outlet />

    return <Navigate to="/chats" replace={true} />
}

export const NonPrivateRouteVerifier = async () => {

    try {
        const response = await axios.post('http://localhost:3001/api/auth/verify', {}, { withCredentials: true });

        return response.data;
    }
    catch (err) {

        return null;
    }
}

export default NotPrivatePage