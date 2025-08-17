 
-- Users come from Nhost Auth; Hasura gets x-hasura-user-id in JWT.

create table public.chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text generated always as (
    'Chat ' || to_char(created_at, 'YYYY-MM-DD HH24:MI')
  ) stored,
  created_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid not null references public.chats(id) on delete cascade,
  sender text not null check (sender in ('user','bot')),
  content text not null,
  created_at timestamptz not null default now()
);

-- Helpful index for realtime/order
create index on public.messages (chat_id, created_at);

-- RLS: use JWT claims from Hasura/Nhost
-- Enable RLS
alter table public.chats enable row level security;
alter table public.messages enable row level security;

-- Policies
-- Only owner can select/modify their chats
create policy chats_owner_select on public.chats
  for select using (user_id = (current_setting('hasura.user', true))::uuid);

create policy chats_owner_ins on public.chats
  for insert with check (user_id = (current_setting('hasura.user', true))::uuid);

create policy chats_owner_upd on public.chats
  for update using (user_id = (current_setting('hasura.user', true))::uuid);

create policy chats_owner_del on public.chats
  for delete using (user_id = (current_setting('hasura.user', true))::uuid);

-- Messages are visible only if the chat belongs to the user
create policy messages_owner_select on public.messages
  for select using (
    exists (select 1 from public.chats c
            where c.id = messages.chat_id
              and c.user_id = (current_setting('hasura.user', true))::uuid)
  );

create policy messages_owner_ins on public.messages
  for insert with check (
    exists (select 1 from public.chats c
            where c.id = messages.chat_id
              and c.user_id = (current_setting('hasura.user', true))::uuid)
  );

create policy messages_owner_upd on public.messages
  for update using (
    exists (select 1 from public.chats c
            where c.id = messages.chat_id
              and c.user_id = (current_setting('hasura.user', true))::uuid)
  );

create policy messages_owner_del on public.messages
  for delete using (
    exists (select 1 from public.chats c
            where c.id = messages.chat_id
              and c.user_id = (current_setting('hasura.user', true))::uuid)
  );
