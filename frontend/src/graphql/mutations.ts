import { gql } from '@apollo/client';

export const CREATE_CHAT = gql`
  mutation CreateChat {
    insert_chats_one(object: { user_id: "x-hasura-uid-will-be-overridden" }) {
      id
    }
  }
`;

export const ACTION_SEND_MESSAGE = gql`
  mutation SendMessage($chat_id: uuid!, $content: String!) {
    sendMessage(chat_id: $chat_id, content: $content) {
      ok
      bot_reply
    }
  }
`;

export const INSERT_USER_MESSAGE = gql`
  mutation InsertUserMessage($chat_id: uuid!, $content: String!) {
    insert_messages_one(object: { chat_id: $chat_id, sender: "user", content: $content }) {
      id
    }
  }
`;
