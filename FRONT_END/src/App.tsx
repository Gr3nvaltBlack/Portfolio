import AppRouter, { AppRouterNotConnected } from './router/AppRouter.tsx'
import { UidContext } from './context/AuthContext.tsx'
import { TokenUser } from './services/authService.ts';
import { useEffect } from 'react'
import Cookies from "js-cookie"
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './actions/user.actions.ts';
import type { AppDispatch, RootState } from './redux/store.ts';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!Cookies.get('jwt')) return;

        const verifToken = await TokenUser();
        if (!verifToken || !verifToken.id) {
          return;
        }
        dispatch(getUser(verifToken.id));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <>
      <UidContext.Provider value={user?.id || null}>
        {user && user._id ? (
          <AppRouter />
        ) : (
          <AppRouterNotConnected />
        )}
      </UidContext.Provider>
    </>
  )
}

export default App
