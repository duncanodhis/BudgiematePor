import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Animated, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MessageInput = ({ chatId, onSend }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSend = () => {
    if (message.trim()) {
      animateButton();
      onSend?.(message);
      setMessage('');
      inputRef.current?.blur();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TouchableOpacity style={styles.attachButton}>
          <Icon name="attach" size={24} color="#666" />
        </TouchableOpacity>
        
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={1000}
          blurOnSubmit={false}
        />

        <TouchableOpacity style={styles.emojiButton}>
          <Icon name="happy" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.sendButtonContainer, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity
          style={[styles.sendButton, message.trim() ? styles.sendButtonActive : null]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Icon 
            name="send" 
            size={24} 
            color={message.trim() ? "#FFFFFF" : "#CCCCCC"}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 12,
    minHeight: 48,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
  },
  attachButton: {
    padding: 4,
  },
  emojiButton: {
    padding: 4,
  },
  sendButtonContainer: {
    marginLeft: 8,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#007AFF',
  },
});

export default MessageInput;