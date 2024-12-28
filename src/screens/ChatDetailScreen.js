import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { chatData } from '.';
import MessageInput from '../components/MessageInput';

const ChatDetailScreen = ({ route }) => {
  const { chatId } = route.params;
  const chat = chatData.find((c) => c.id === chatId);

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.sender}>{item.sender}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={chat.imgUrl} style={styles.image} />
        <Text style={styles.name}>{chat.name}</Text>
      </View>
      <FlatList
        data={chat.chat}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <MessageInput chatId={chatId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sender: {
    fontWeight: 'bold',
  },
  message: {
    marginTop: 5,
  },
  timestamp: {
    marginTop: 5,
    fontSize: 12,
    color: 'gray',
  },
});

export default ChatDetailScreen;