import React from 'react';
import { ModalProps, Modal } from 'react-native';

import {
  Container,
  Content,
  Title,
  TextMessage,
  WhapperButton,
} from './styles';
import { Button } from '../Form/Button';

interface Props extends ModalProps {
  title: string;
  message: string;
  closeModal(): void;
}

export function ModalLocaleEmpty({
  title,
  message,
  closeModal,
  ...rest
}: Props) {
  return (
    <Modal {...rest}>
      <Container>
        <Content>
          <Title>{title}</Title>
          <TextMessage>{message}</TextMessage>

          <WhapperButton>
            <Button
              title="Cancelar"
              onPress={closeModal}
              loading={false}
              buttonYesNo={2}
            />
            <Button
              title="Gerar Localizador"
              onPress={() => console.log('Gerar')}
              loading={false}
              buttonYesNo={1}
            />
          </WhapperButton>
        </Content>
      </Container>
    </Modal>
  );
}
