import { useQuery, useSubscription } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';
import { MESSAGES_SUB } from '../graphql/subscriptions';
import MessageInput from './MessageInput';

export default function ChatView({ chatId }: { chatId: string }) {
  useQuery(GET_MESSAGES, { variables: { chat_id: chatId } }); // warm cache
  const { data } = useSubscription(MESSAGES_SUB, { variables: { chat_id: chatId } });

  return (
    <div style={{flex:1, display:'flex', flexDirection:'column', height:'100%'}}>
      <div style={{flex:1, padding:12, overflowY:'auto'}}>
        {(data?.messages ?? []).map((m:any)=>(
          <div key={m.id} style={{margin:'8px 0', textAlign:m.sender==='user'?'right':'left'}}>
            <div style={{
              display:'inline-block', padding:'8px 10px', borderRadius:10,
              background:m.sender==='user'?'#DCF8C6':'#F1F1F1'
            }}>{m.content}</div>
            <div><small>{new Date(m.created_at).toLocaleTimeString()}</small></div>
          </div>
        ))}
      </div>
      <MessageInput chatId={chatId} />
    </div>
  );
}
