import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function MainScreen() {
  const [activeTab, setActiveTab] = useState('situation');
  const [formData, setFormData] = useState({
    whatHappened: '',
    whatIFelt: '',
    whatIDone: '',
    whatIWanted: '',
    whatIAvoided: '',
  });

  const router = useRouter();
  const { editIndex } = useLocalSearchParams();
  const isEditing = editIndex !== undefined;

  useEffect(() => {
    if (isEditing) {
      loadEventForEditing();
    }
  }, []);

  const loadEventForEditing = async () => {
    try {
      const events = await AsyncStorage.getItem('assertive_events');
      if (events) {
        const parsedEvents = JSON.parse(events);
        const index = parseInt(editIndex as string);
        if (parsedEvents[index]) {
          setFormData(parsedEvents[index]);
        }
      }
    } catch (error) {
      console.error('Error loading event for editing:', error);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['whatHappened', 'whatIFelt', 'whatIDone'];
    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        return false;
      }
    }
    return true;
  };

  const saveEvent = async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Please fill in at least the first three fields');
      return;
    }

    try {
      const existingEvents = await AsyncStorage.getItem('assertive_events');
      let events = existingEvents ? JSON.parse(existingEvents) : [];
      
      const eventToSave = {
        ...formData,
        createdAt: isEditing ? events[parseInt(editIndex as string)].createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (isEditing) {
        events[parseInt(editIndex as string)] = eventToSave;
      } else {
        events.unshift(eventToSave); // Add to beginning
      }

      await AsyncStorage.setItem('assertive_events', JSON.stringify(events));
      
      Alert.alert(
        'Success',
        isEditing ? 'Event updated successfully' : 'Event saved successfully',
        [
          {
            text: 'OK',
            onPress: () => router.push('/history')
          }
        ]
      );
    } catch (error) {
      console.error('Error saving event:', error);
      Alert.alert('Error', 'Failed to save event');
    }
  };

  const cancelAction = () => {
    if (isEditing) {
      router.back();
    } else {
      // Reset form
      setFormData({
        whatHappened: '',
        whatIFelt: '',
        whatIDone: '',
        whatIWanted: '',
        whatIAvoided: '',
      });
    }
  };

  const renderSituationTab = () => (
    <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>What happened?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Describe the situation..."
          value={formData.whatHappened}
          onChangeText={(text) => updateField('whatHappened', text)}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>What I felt?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Describe your feelings and bodily reactions..."
          value={formData.whatIFelt}
          onChangeText={(text) => updateField('whatIFelt', text)}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>What I've done?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Describe your actual behavior..."
          value={formData.whatIDone}
          onChangeText={(text) => updateField('whatIDone', text)}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>What I actually wanted?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="What were your true desires?"
          value={formData.whatIWanted}
          onChangeText={(text) => updateField('whatIWanted', text)}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>What I was trying to avoid?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="What were you trying to avoid? (conflict, intimacy, etc.)"
          value={formData.whatIAvoided}
          onChangeText={(text) => updateField('whatIAvoided', text)}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveEvent}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButton} onPress={cancelAction}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderAssertivenessPracticeTab = () => (
    <View style={styles.comingSoonContainer}>
      <Text style={styles.comingSoonText}>🔄 Coming Soon</Text>
      <Text style={styles.comingSoonSubtext}>
        Assertiveness practice exercises will be available here
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Let's figure it out</Text>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'situation' && styles.activeTab]}
            onPress={() => setActiveTab('situation')}
          >
            <Text style={[styles.tabText, activeTab === 'situation' && styles.activeTabText]}>
              Situation
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'practice' && styles.activeTab]}
            onPress={() => setActiveTab('practice')}
          >
            <Text style={[styles.tabText, activeTab === 'practice' && styles.activeTabText]}>
              Assertiveness practice
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'situation' ? renderSituationTab() : renderAssertivenessPracticeTab()}
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
    marginBottom: 20,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#009ECF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#FAFAFA',
    minHeight: 80,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#009ECF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '600',
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  comingSoonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#009ECF',
    marginBottom: 10,
  },
  comingSoonSubtext: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
});
