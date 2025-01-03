import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ParentInfo from './ParentInfo';
import BabyInfo from './BabyInfo';
import Settings from './system';

interface ProfileModalProps {
  isDarkMode: boolean;
  closeModal: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isDarkMode, closeModal }) => {
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <Ionicons name="close" size={24} color={isDarkMode ? "#A3D8F4" : "#8AA9B8"} />
      </TouchableOpacity>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <ParentInfo />
        <BabyInfo />
        <Settings />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});

export default ProfileModal;
