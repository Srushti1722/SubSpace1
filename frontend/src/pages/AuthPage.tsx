import { useAuthenticationStatus, useSignInEmailPassword, useSignUpEmailPassword } from '@nhost/react';
import { useState } from 'react';

export default function AuthPage() {
  const { isAuthenticated } = useAuthenticationStatus();
  const { signInEmailPassword, isLoading: signingIn, error: signInErr } = useSignInEmailPassword();
  const { signUpEmailPassword, isLoading: signingUp, error: signUpErr } = useSignUpEmailPassword();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');

  if (isAuthenticated) return <div>Logged in. Go to chats.</div>;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) await signUpEmailPassword(email, password);
    else await signInEmailPassword(email, password);
  };

  return (
    <div style={{maxWidth:420, margin:'40px auto'}}>
      <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button disabled={signingIn||signingUp} type="submit">{isSignup?'Create account':'Sign in'}</button>
      </form>
      {(signInErr||signUpErr) && <p style={{color:'crimson'}}>{(signInErr||signUpErr)?.message}</p>}
      <button onClick={()=>setIsSignup(s=>!s)}>{isSignup?'Have an account? Sign in':'New here? Sign up'}</button>
    </div>
  );
}
