import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ACTION_SEND_MESSAGE } from '../graphql/mutations';

export default function MessageInput({ chatId }: { chatId: string }) {
  const [text, setText] = useState('');
  const [sendAction, { loading }] = useMutation(ACTION_SEND_MESSAGE);

  const onSend = async () => {
    const content = text.trim();
    if (!content) return;
    setText('');
    // Single call to Action (n8n will insert user + bot messages)
    await sendAction({ variables: { chat_id: chatId, content }});
  };

  return (
    <div style={{display:'flex', gap:8, padding:8}}>
      <input
        value={text}
        onChange={e=>setText(e.target.value)}
        placeholder="Type a message…"
        onKeyDown={e=>{ if(e.key==='Enter') onSend(); }}
        style={{flex:1}}
      />
      <button onClick={onSend} disabled={loading}>Send</button>
    </div>
  );
}
