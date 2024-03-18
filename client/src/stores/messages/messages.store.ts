import { defineStore } from 'pinia';
import { MessagesInterface } from '~/interfaces/messages.interface';

export const useMessagesStore = defineStore('messages', {
  state: (): { messages: MessagesInterface[] } => ({
    messages: [],
  }),
  getters: {
    allMessages: (state) => state.messages,
  },
  actions: {
    addMessage(newMessage: MessagesInterface) {
      this.messages.push(newMessage);
    },
  },
});
