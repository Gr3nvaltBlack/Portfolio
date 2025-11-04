import AppRouter from './router/AppRouter.tsx'
import { UidContext } from './context/AuthContext.tsx'
import { TokenUser } from './services/authService.ts';
import { useEffect, useState } from 'react'



function App() {
  const [uid, setUid] = useState('');

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
  }, [uid]);

  return (
    <>
      <UidContext value={uid}>
        <AppRouter />
      </UidContext>
    </>
  )
}

export default App
