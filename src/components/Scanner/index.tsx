import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

import { Container } from './styles';

interface ScannerProps {
  onCodeScanned(type: string, data: string): void;
}

export function Scanner({ onCodeScanned }: ScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
    setScanned(true);
    onCodeScanned(type, data);
  };

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Container>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </Container>
  );
}
