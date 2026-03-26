import { useAuth } from '@/core/auth/AuthContext';
import { useNavigate, useRouter } from '@tanstack/react-router';

export default function LogoutButton() {
  const { logoutAction, isLoggingOut } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();

  const onLogout = async () => {
    const result = await logoutAction();

    if (result.ok) {
      await router.invalidate();

      navigate({ to: '/explore', search: () => ({ q: '', p: 1 }) });
    }
  };

  return (
    <button
      type="button"
      disabled={isLoggingOut}
      className="py-2 px-4 bg-zinc-700 rounded cursor-pointer"
      onClick={onLogout}
    >
      Logout
    </button>
  );
}
