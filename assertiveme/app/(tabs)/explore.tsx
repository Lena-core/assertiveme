import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  RefreshControl 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ExploreScreen() {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      loadEvents();
    }, [])
  );

  const loadEvents = async () => {
    try {
      const json = await AsyncStorage.getItem('events');
      if (json) {
        const parsed = JSON.parse(json);
        setEvents(parsed);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEvents();
    setRefreshing(false);
  };

  const editEvent = (index: number) => {
    router.push({
      pathname: '/(tabs)/',
      params: { editIndex: index.toString() }
    });
  };

  const deleteEvent = (index: number) => {
    Alert.alert(
      'Удалить событие',
      'Вы уверены, что хотите удалить это событие?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            try {
              const updated = events.filter((_, i) => i !== index);
              await AsyncStorage.setItem('events', JSON.stringify(updated));
              setEvents(updated);
            } catch (error) {
              console.error('Error deleting event:', error);
              Alert.alert('Ошибка', 'Не удалось удалить событие');
            }
          },
        },
      ]
    );
  };

  const clearAllEvents = () => {
    Alert.alert(
      'Очистить всю историю',
      'Вы уверены, что хотите удалить все события? Это действие нельзя отменить.',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Очистить всё',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('events');
              setEvents([]);
            } catch (error) {
              console.error('Error clearing events:', error);
              Alert.alert('Ошибка', 'Не удалось очистить историю');
            }
          },
        },
      ]
    );
  };

  const formatDate = (index: number) => {
    // Simple date formatting - you could enhance this with actual timestamps
    const now = new Date();
    const date = new Date(now.getTime() - (events.length - index - 1) * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderEventItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity 
      style={styles.eventItem}
      onPress={() => editEvent(index)}
      activeOpacity={0.7}
    >
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventDate}>
            {formatDate(index)}
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteEvent(index)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <IconSymbol name="trash" size={18} color="#e74c3c" />
          </TouchableOpacity>
        </View>
        <Text style={styles.eventText} numberOfLines={3}>
          {item}
        </Text>
        <View style={styles.eventFooter}>
          <Text style={styles.editHint}>Нажмите для редактирования</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <IconSymbol name="note.text" size={80} color="#bdc3c7" />
      <Text style={styles.emptyTitle}>Пока нет событий</Text>
      <Text style={styles.emptySubtitle}>
        Добавьте ваше первое событие на вкладке "Дом"
      </Text>
      <TouchableOpacity 
        style={styles.addFirstButton}
        onPress={() => router.push('/(tabs)/')}
      >
        <Text style={styles.addFirstButtonText}>Добавить событие</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>История событий</Text>
        <Text style={styles.subtitle}>
          Всего событий: {events.length}
        </Text>
      </View>

      {events.length > 0 && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.push('/(tabs)/')}
          >
            <IconSymbol name="plus" size={16} color="#ffffff" />
            <Text style={styles.addButtonText}>Добавить новое</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={clearAllEvents}
          >
            <IconSymbol name="trash" size={16} color="#e74c3c" />
            <Text style={styles.clearButtonText}>Очистить всё</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={events}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderEventItem}
        style={styles.list}
        contentContainerStyle={events.length === 0 ? styles.emptyList : styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#27ae60',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  clearButton: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  clearButtonText: {
    color: '#e74c3c',
    fontWeight: '600',
    fontSize: 14,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyList: {
    flexGrow: 1,
  },
  eventItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  deleteButton: {
    padding: 4,
  },
  eventText: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 22,
    marginBottom: 8,
  },
  eventFooter: {
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 8,
  },
  editHint: {
    fontSize: 12,
    color: '#95a5a6',
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#95a5a6',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  addFirstButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  addFirstButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
