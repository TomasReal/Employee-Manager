import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/react-app/components/Button';
import { clearToken } from '@/shared/auth';
import { notify } from '@/shared/notify';

export function LogoutButton() {
    const navigate = useNavigate();

    function handleLogout() {
        clearToken();
        notify.info('Logged out');
        navigate('/login', { replace: true });
    }

    return (
        <Button variant="secondary" onClick={handleLogout} icon={<LogOut className="w-4 h-4" />}>
            Logout
        </Button>
    );
}
