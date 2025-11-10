import "./auth.css";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { LoginUser } from "../services/authService";
import ShinyText from "../components/ShinyText/ShinyText";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e: any) => {
    e.preventDefault();
    setErrorMsg('');

    console.log('Début handleLogin avec:', { email, password });
    try {
      const resp = await LoginUser(email, password);
      console.log('Réponse LoginUser:', resp);
      if (!resp) {
        console.log('Aucune réponse reçue');
        setErrorMsg('Aucune connexion au serveur');
        return;
      }

      const data = resp.data ?? resp;
      const status = resp.status ?? data?.status;
      const message = (data?.message ?? data?.error ?? '').toString().toLowerCase();

      // Email introuvable / utilisateur inexistant
      if (
        status === 404 ||
        message.includes('email')
      ) {
        setErrorMsg("Email n'existe pas");
        return;
      }

      // Mot de passe incorrect
      if (
        status === 401 ||
        message.includes('password') ||
        message.includes('mot de passe') ||
        data?.error === 'INVALID_PASSWORD'
      ) {
        setErrorMsg('Mot de passe incorrect');
        return;
      }

      // Succès : token ou statut 200
      if (status === 200 || data?.token || resp.token || resp.success) {
        window.location.href = '/';
        return;
      }

      // Cas par défaut (réponse inattendue)
      setErrorMsg('Erreur lors de la connexion');
    } catch (err: any) {
      // Pas de réponse du serveur (erreur réseau)
      if (!err?.response) {
        setErrorMsg('Aucune connexion au serveur');
        return;
      }

      const msg = (err.response?.data?.message ?? err.message ?? '').toString().toLowerCase();
      if (msg.includes('password') || msg.includes('mot de passe')) {
        setErrorMsg('Mot de passe incorrect');
      } else if (msg.includes('email') || msg.includes('user') || msg.includes('utilisateur')) {
        setErrorMsg("Email n'existe pas");
      } else {
        setErrorMsg('Erreur lors de la connexion');
      }
    }
  };
// ...existing code...

  return (
    <>
      <div className="container">
        <form action="" onSubmit={handleLogin}>
          <ShinyText text="Login" className="title" />

          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <MdEmail className="icon" />
          </div>
          {errorMsg && <p className="error-Msg">{errorMsg}</p>}

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <FaLock className="icon" />
          </div>
          <div className="create-account">
            <p>
              Don't have an account?
              <a href="./Register">Sign up</a>
            </p>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
