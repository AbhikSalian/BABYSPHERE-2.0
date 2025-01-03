import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MenuProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  closeMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({ isDarkMode, toggleDarkMode, closeMenu }) => {
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
        <Ionicons name="close" size={24} color={isDarkMode ? "#A3D8F4" : "#8AA9B8"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={toggleDarkMode}>
        <Ionicons name={isDarkMode ? "sunny" : "moon"} size={24} color={isDarkMode ? "#A3D8F4" : "#8AA9B8"} />
        <Text style={[styles.menuItemText, isDarkMode && styles.darkMenuItemText]}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Text>
      </TouchableOpacity>
      {/* Add more menu items here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#8AA9B8',
  },
  darkMenuItemText: {
    color: '#A3D8F4',
  },
});

export default Menu;
