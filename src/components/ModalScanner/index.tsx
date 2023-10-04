import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Modal } from 'react-native';

import {
  Container,
  ViewModal,
  Icon,
  ScanHelper,
  ButtonModalClose,
  ButtonModalPen,
  TextModal,
} from './styles';
import { Scanner } from '../Scanner';

interface Props {
  modalVisible: boolean;
  closeModal(): void;
  handleWriteInput(): void;
  onCodeScanned(type: string, data: string): void;
  typeInput: string;
}

export function ModalScanner({
  modalVisible,
  closeModal,
  onCodeScanned,
  handleWriteInput,
  typeInput,
}: Props) {
  return (
    <Container>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => closeModal()}
      >
        <ViewModal>
          <Scanner onCodeScanned={onCodeScanned} />
          <TextModal>{`Bipe o ${typeInput}... `}</TextModal>
          <ScanHelper>
            <Icon name="scan-helper" />
          </ScanHelper>
          <ButtonModalClose onPress={() => closeModal()}>
            <FontAwesome name="close" size={50} color="white" />
          </ButtonModalClose>
          <ButtonModalPen onPress={() => handleWriteInput()}>
            <FontAwesome name="pencil" size={50} color="white" />
          </ButtonModalPen>
        </ViewModal>
      </Modal>
    </Container>
  );
}
