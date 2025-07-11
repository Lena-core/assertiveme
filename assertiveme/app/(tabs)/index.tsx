import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function HomeScreen() {
  const [event, setEvent] = useState('');
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { editIndex } = useLocalSearchParams();

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (editIndex !== undefined && events.length > 0) {
      const index = parseInt(editIndex as string);
      if (index >= 0 && index < events.length) {
        setEvent(events[index]);
      }
    }
  }, [editIndex, events]);

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

  const saveEvent = async () => {
    if (!event.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, опишите событие');
      return;
    }

    try {
      let updated = [...events];
      if (editIndex !== undefined) {
        const index = parseInt(editIndex as string);
        updated[index] = event.trim();
      } else {
        updated.push(event.trim());
      }
      
      await AsyncStorage.setItem('events', JSON.stringify(updated));
      setEvent('');
      
      Alert.alert(
        'Успешно!', 
        editIndex !== undefined ? 'Событие обновлено' : 'Событие сохранено',
        [
          {
            text: 'ОК',
            onPress: () => {
              if (editIndex !== undefined) {
                router.back();
              } else {
                router.push('/(tabs)/explore');
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error saving event:', error);
      Alert.alert('Ошибка', 'Не удалось сохранить событие');
    }
  };

  const clearForm = () => {
    setEvent('');
    if (editIndex !== undefined) {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {editIndex !== undefined ? 'Редактировать событие' : 'Новое событие'}
        </Text>
        <Text style={styles.subtitle}>Опиши что произошло</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Описание события:</Text>
        <TextInput
          value={event}
          onChangeText={setEvent}
          placeholder="Что произошло?"
          style={styles.input}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={saveEvent}>
            <Text style={styles.saveButtonText}>
              {editIndex !== undefined ? 'Обновить' : 'Сохранить'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cancelButton} onPress={clearForm}>
            <Text style={styles.cancelButtonText}>
              {editIndex !== undefined ? 'Отмена' : 'Очистить'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          💡 Записывайте важные моменты и события вашей жизни
        </Text>
      </View>
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
    marginBottom: 30,
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
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e1e8ed',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    minHeight: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#7f8c8d',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#e8f4fd',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  infoText: {
    fontSize: 14,
    color: '#2c3e50',
    fontStyle: 'italic',
  },
});
