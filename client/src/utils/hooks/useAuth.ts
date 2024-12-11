import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = (redirectTo: string = '/login', validateAdmin: boolean = false) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/auth/validate', {
        credentials: 'include',
      });
      const data = await response.json();

      if (!data.isAuthenticated || (validateAdmin && !data.isAdmin)) {
        router.push(redirectTo);
      }
    };

    checkAuth();
  }, [redirectTo, validateAdmin, router]);
};
