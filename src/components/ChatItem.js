import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatItem = ({ chat, onPress }) => {
  const isUnread = chat.unreadCount > 0;
  const messagePreview = chat.lastMessage.length > 40 
    ? `${chat.lastMessage.substring(0, 40)}...` 
    : chat.lastMessage;

  return (
    <TouchableOpacity 
      style={[styles.container, isUnread && styles.unreadContainer]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image 
          source={chat.imgUrl} 
          style={styles.image} 
        />
        {chat.isOnline && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={[styles.name, isUnread && styles.unreadText]}>
            {chat.name}
          </Text>
          <Text style={styles.timeSent}>{chat.timeSent}</Text>
        </View>

        <View style={styles.messageContainer}>
          <Text style={[styles.lastMessage, isUnread && styles.unreadText]}>
            {messagePreview}
          </Text>
          {isUnread && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{chat.unreadCount}</Text>
            </View>
          )}
        </View>

        {chat.typing && (
          <Text style={styles.typingText}>
            <Icon name="ellipsis-horizontal" size={16} color="#007AFF" /> typing...
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  unreadContainer: {
    backgroundColor: '#F8F8F8',
  },
  avatarContainer: {
    position: 'relative',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F0F0',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  unreadText: {
    fontWeight: '700',
    color: '#000000',
  },
  timeSent: {
    fontSize: 12,
    color: '#999999',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  badge: {
    backgroundColor: '#007AFF',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  typingText: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
  },
});

export default ChatItem;