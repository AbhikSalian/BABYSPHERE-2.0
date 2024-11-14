// SensorDashboard.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import SensorGraph from './SensorGraph';
import { SensorData } from '../types/SensorData';

interface SensorDashboardProps {
  data: SensorData[];
}

const SensorDashboard: React.FC<SensorDashboardProps> = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null);

  const latestData = data[data.length - 1] || {};

  const openModal = (sensor: string) => {
    setSelectedSensor(sensor);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSensor(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} onPress={() => openModal('ambient_temperature')}>
        <Text>Ambient Temp: {latestData.ambient_temperature?.toFixed(2) ?? 'N/A'}°C</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => openModal('object_temperature')}>
        <Text>Object Temp: {latestData.object_temperature?.toFixed(2) ?? 'N/A'}°C</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => openModal('temperature')}>
        <Text>Temperature: {latestData.temperature?.toFixed(2) ?? 'N/A'}°C</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => openModal('humidity')}>
        <Text>Humidity: {latestData.humidity?.toFixed(2) ?? 'N/A'}%</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <SensorGraph data={data} selectedSensor={selectedSensor} />
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 150,
    padding: 20,
    margin: 10,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#333', // Dark background for contrast
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff5252',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SensorDashboard;