import { useState } from 'react';
import ChatList from '../components/ChatList';
import ChatView from '../components/ChatView';
import { useAuthenticationStatus, useSignOut } from '@nhost/react';

export default function ChatPage() {
  const [active, setActive] = useState<string>('');
  const { isAuthenticated } = useAuthenticationStatus();
  const { signOut } = useSignOut();

  if (!isAuthenticated) return <div>Please sign in first.</div>;

  return (
    <div style={{height:'100vh', display:'flex'}}>
      <ChatList onOpen={setActive} />
      {active ? <ChatView chatId={active} /> : <div style={{flex:1, display:'grid', placeItems:'center'}}>Select or create a chat</div>}
      <button onClick={()=>signOut()} style={{position:'fixed', top:10, right:10}}>Sign out</button>
    </div>
  );
}
