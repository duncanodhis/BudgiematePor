import { supabase } from '../utils/supabase';  

// Service to manage messages and chats
class MessageService {
  // Send a message to a chat
  static async sendMessage(chatId, senderId, receiverId, message) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            chat_id: chatId,
            sender_id: senderId,
            receiver_id: receiverId,
            message: message,
            is_read: false,
          },
        ]);
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      return null;
    }
  }

  // Get messages from a chat
  static async getMessages(chatId) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('id, sender_id, receiver_id, message, timestamp, is_read')
        .eq('chat_id', chatId)
        .order('timestamp', { ascending: true });
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }

  // Mark a message as read
  static async markMessageAsRead(messageId) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId);
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      console.error('Error marking message as read:', error);
      return null;
    }
  }

  // Create a new chat session between two users
  static async createChat(user1_id, user2_id) {
    try {
      const { data, error } = await supabase
        .from('chats')
        .insert([{ user1_id, user2_id }])
        .single();
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      console.error('Error creating chat:', error);
      return null;
    }
  }

  // Get chat sessions between two users
  static async getChatSession(user1_id, user2_id) {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('id, user1_id, user2_id, created_at')
        .or(`user1_id.eq.${user1_id},user2_id.eq.${user2_id}`)
        .single();
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      console.error('Error fetching chat session:', error);
      return null;
    }
  }
}

export default MessageService;
