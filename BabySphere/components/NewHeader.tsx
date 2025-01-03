import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProfileModal from './ProfileModal';

interface NewHeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const NewHeader: React.FC<NewHeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  return (
    <View style={[styles.header, isDarkMode && styles.darkHeader]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>BabySphere</Text>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={toggleDarkMode}>
          <Ionicons 
            name={isDarkMode ? "sunny" : "moon"} 
            size={24} 
            color={isDarkMode ? "#A3D8F4" : "#8AA9B8"} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => setIsProfileModalVisible(true)}
        >
          <Ionicons 
            name="person-circle-outline" 
            size={24} 
            color={isDarkMode ? "#A3D8F4" : "#8AA9B8"} 
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isProfileModalVisible}
        onRequestClose={() => setIsProfileModalVisible(false)}
      >
        <ProfileModal 
          isDarkMode={isDarkMode}
          closeModal={() => setIsProfileModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#A3D8F4',
  },
  darkHeader: {
    backgroundColor: '#1E1E1E',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8AA9B8',
  },
  darkTitle: {
    color: '#A3D8F4',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 5,
    marginRight: 10,
  },
  profileButton: {
    padding: 5,
  },
});

export default NewHeader;
