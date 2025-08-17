import { gql } from '@apollo/client';

export const MESSAGES_SUB = gql`
  subscription OnMessages($chat_id: uuid!) {
    messages(where: { chat_id: { _eq: $chat_id } }, order_by: { created_at: asc }) {
      id
      sender
      content
      created_at
    }
  }
`;
