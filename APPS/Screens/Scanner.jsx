import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileView from '../Components/ProfileView';
import { getAllKeys, getData, storeData } from '../Constants/StorageHelper';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    const saveScannedData = async (data) => {
      setIsLoading(true);
      try {
        let id = getData("Id");
        id=parseInt(id)+1;
        convertString(data);
        storeData(""+id,JSON.stringify(data));
      } catch (error) {
        console.error('Error saving scanned data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (scannedData) {
      saveScannedData(scannedData);
    }
  }, [scannedData]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
      const parsedData = JSON.parse(data);
      setScannedData(parsedData);
    } catch (error) {
      Alert.alert('Invalid QR Code', 'The scanned QR code is not valid JSON.');
      setScanned(false); // Allow to scan again
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
    setScannedData(null);
  };

  const renderCamera = () => (
    <View style={styles.cameraContainer}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.camera}
      />
    </View>
  );

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  if (scannedData) {
    return <ProfileView data={scannedData} onBack={handleScanAgain} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code Scanner</Text>
      <Text style={styles.paragraph}>Scan the QR to get the details</Text>
      {renderCamera()}
      {isLoading && <ActivityIndicator size="large" color="blue" style={styles.loadingText} />}
      <TouchableOpacity
        style={[styles.button, scanned && { backgroundColor: 'gray' }]}
        onPress={handleScanAgain}
        disabled={!scanned} // Disable button when scanning is active
      >
        <Text style={styles.buttonText}>{scanned ? 'Scan Again' : 'Scanning...'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
  loadingText: {
    marginBottom: 20,
    fontSize: 16,
    color: 'gray',
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
