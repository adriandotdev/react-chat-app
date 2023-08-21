
import { Navigate } from 'react-router-dom';

function IndexPage() {
    return (
        <Navigate to="/login" replace={true} />
    )
}

export default IndexPage