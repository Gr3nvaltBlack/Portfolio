import AppRouter from './router/AppRouter.tsx'
import { UidContext } from './context/AuthContext.tsx'
import { TokenUser } from './services/authService.ts';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions.ts';
import type { AppDispatch } from './redux/store.ts';



function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const reqToken = async() => {
      try {
        const VerifToken = await TokenUser()
        if(!VerifToken) {
          return
        }
        setUid(VerifToken)
      } catch (error) {
        console.log(error);
      }
    }
    reqToken();

    if (uid) {
      dispatch(getUser(uid));
    }
    
  }, [uid, dispatch]);

  return (
    <>
      <UidContext value={uid}>
        <AppRouter />
      </UidContext>
    </>
  )
}

export default App
