import { useQuery, useMutation } from '@apollo/client';
import { GET_CHATS } from '../graphql/queries';
import { CREATE_CHAT } from '../graphql/mutations';

export default function ChatList({ onOpen }: { onOpen: (id: string)=>void }) {
  const { data, loading } = useQuery(GET_CHATS);
  const [createChat, { loading: creating }] = useMutation(CREATE_CHAT, {
    refetchQueries: [GET_CHATS]
  });

  return (
    <div style={{width:280, borderRight:'1px solid #eee', padding:12}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3>My Chats</h3>
        <button disabled={creating} onClick={()=>createChat().then(r=>onOpen(r.data.insert_chats_one.id))}>＋</button>
      </div>
      {loading ? <p>Loading…</p> : (
        <ul style={{listStyle:'none', padding:0}}>
          {data?.chats?.map((c:any)=>(
            <li key={c.id} style={{padding:'8px 6px', cursor:'pointer'}} onClick={()=>onOpen(c.id)}>
              <div>{c.title}</div>
              <small>{new Date(c.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
