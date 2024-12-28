import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { chatData } from '.';
import ChatItem from '../components/ChatItem';

const ChatScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <ChatItem
      chat={item}
      onPress={() => navigation.navigate('ChatDetail', { chatId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chatData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,  
  },
  listContent: {
    paddingBottom: 20,  
    paddingHorizontal: 10, 
  },
});

export default ChatScreen;
