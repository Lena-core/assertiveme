import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet
} from 'react-native';

const Stack = createNativeStackNavigator();

function FormScreen({ navigation, route }) {
  const [event, setEvent] = useState('');
  const [events, setEvents] = useState([]);
  const editIndex = route.params?.editIndex ?? null;

  useEffect(() => {
    AsyncStorage.getItem('events').then(json => {
      if (json) {
        const parsed = JSON.parse(json);
        setEvents(parsed);
        if (editIndex !== null) setEvent(parsed[editIndex]);
      }
    });
  }, []);

  const saveEvent = async () => {
    let updated = [...events];
    if (editIndex !== null) {
      updated[editIndex] = event;
    } else {
      updated.push(event);
    }
    await AsyncStorage.setItem('events', JSON.stringify(updated));
    navigation.navigate('History');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Опиши событие:</Text>
      <TextInput
        value={event}
        onChangeText={setEvent}
        placeholder="Что произошло?"
        style={styles.input}
      />
      <Button title="Сохранить" onPress={saveEvent} />
    </View>
  );
}

function HistoryScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const load = async () => {
      const json = await AsyncStorage.getItem('events');
      if (json) setEvents(JSON.parse(json));
    };
    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>История:</Text>
      <FlatList
        data={events}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Form', { editIndex: index })}
            style={styles.item}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Добавить новое" onPress={() => navigation.navigate('Form')} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Form">
        <Stack.Screen name="Form" component={FormScreen} options={{ title: 'Новое событие' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'История' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 22, marginBottom: 12 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 12, borderRadius: 5,
  },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#ddd' },
});
