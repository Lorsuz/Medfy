import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '@redux/store';
import { FC, useEffect } from 'react';

interface WithAuthProps {
  adminOnly?: boolean;
}

const withAuth = (Component: FC, { adminOnly = false }: WithAuthProps) => {
  return (props: any) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/login'); // Redirecione para login se o usuário não estiver autenticado
      } else if (adminOnly && !user.isAdmin) {
        router.push('/'); // Redirecione para a página inicial se não for admin
      }
    }, [user, adminOnly, router]);

    if (!user || (adminOnly && !user.isAdmin)) {
      return null; // Ou algum carregamento
    }

    // return <Component {...props} />;
  };
};

export default withAuth;
