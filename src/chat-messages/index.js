import { useState, useEffect } from 'react';
import { Map, List } from 'immutable';

export const useChatMessages = () => {
  const [messages, setMessages] = useState(List());

  useEffect(() => {
    fetch('http://localhost:8000/messages')
      .then(response => response.json())
      .then(data => setMessages(List(data)))
  }, []);

  const addMessage = (message) => {
    setMessages(messages.push(Map(message)));
  }

  const removeMessage = (messageId) => {
    setMessages(messages.filterNot(m => m.get('id') === messageId));
  }

  const getMessages = () => {
    return messages.toJS();
  }

  return { addMessage, removeMessage, getMessages };
}
