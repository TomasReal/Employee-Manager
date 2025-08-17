import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthed } from '@/shared/auth';

export default function RequireAuth() {
    const location = useLocation();
    if (!isAuthed()) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return <Outlet />;
}
