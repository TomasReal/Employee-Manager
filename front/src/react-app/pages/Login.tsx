import { LoginForm } from "../components/login-form";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginForm onSuccess={() => navigate('/', { replace: true })} />
    </div>
  )
}
