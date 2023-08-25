import axios from 'axios';

import { Outlet, Navigate, useLoaderData } from 'react-router-dom';

function PrivatePage() {

    const isVerified = useLoaderData();

    if (isVerified) {
        return <Outlet />
    }

    return <Navigate to="/" replace={true} />
}

export const PrivateRouteVerifier = async () => {

    try {
        const response = await axios.post('http://localhost:3001/api/auth/verify', {}, { withCredentials: true });

        return response.data;
    }
    catch (err) {

        return null;
    }
}

export default PrivatePage

