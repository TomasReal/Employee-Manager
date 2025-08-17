// import { RegisterForm } from "../components/register-form"

// export default function RegisterPage() {
//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gray-50">
//       <RegisterForm />
//     </main>
//   )
// }


// src/react-app/pages/Register.tsx
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../components/register-form';
export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      {/* Al terminar el registro => ir al Home */}
      <RegisterForm onSuccess={() => navigate('/', { replace: true })} />
    </div>
  );
}
