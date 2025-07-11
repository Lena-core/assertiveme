import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';

interface Event {
  whatHappened: string;
  whatIFelt: string;
  whatIDone: string;
  whatIWanted: string;
  whatIAvoided: string;
  createdAt: string;
  updatedAt: string;
}

export default function HistoryScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      loadEvents();
    }, [])
  );

  const loadEvents = async () => {
    try {
      setLoading(true);
      const storedEvents = await AsyncStorage.getItem('assertive_events');
      if (storedEvents) {
        const parsedEvents = JSON.parse(storedEvents);
        setEvents(parsedEvents);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error('Error loading events:', error);
      Alert.alert('Error', 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (index: number) => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedEvents = events.filter((_, i) => i !== index);
              await AsyncStorage.setItem('assertive_events', JSON.stringify(updatedEvents));
              setEvents(updatedEvents);
            } catch (error) {
              console.error('Error deleting event:', error);
              Alert.alert('Error', 'Failed to delete event');
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const truncateText = (text: string, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const renderEventCard = ({ item, index }: { item: Event; index: number }) => (
    <View style={styles.eventCard}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Text style={styles.bellIcon}>🔔</Text>
        </View>
        <Text style={styles.eventDate}>{formatDate(item.createdAt)}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteEvent(index)}
        >
          <Text style={styles.deleteButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.eventPreview}>
          {truncateText(item.whatHappened || 'No description available')}
        </Text>
      </View>
      
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.push({ pathname: '/', params: { editIndex: index.toString() } })}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📝</Text>
      <Text style={styles.emptyTitle}>No events yet</Text>
      <Text style={styles.emptySubtitle}>
        Start by describing a situation where you experienced complex feelings.
      </Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => router.push('/')}
      >
        <Text style={styles.startButtonText}>Create First Event</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>New</Text>
      </View>

      {events.length > 0 && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.addButtonText}>+ Add New Event</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderEventCard}
          contentContainerStyle={events.length === 0 ? styles.emptyList : styles.listContent}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#009ECF',
    marginBottom: 20,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#009ECF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyList: {
    flexGrow: 1,
  },
  eventCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    marginRight: 12,
  },
  bellIcon: {
    fontSize: 20,
  },
  eventDate: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  deleteButton: {
    padding: 4,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  cardContent: {
    marginBottom: 16,
  },
  eventPreview: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  editButton: {
    backgroundColor: '#009ECF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#009ECF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
