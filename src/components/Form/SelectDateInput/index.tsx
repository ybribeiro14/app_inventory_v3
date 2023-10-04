import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, Label, FormText } from './styles';

interface Props extends TextInputProps {
  children: string;
  title?: string;
  onPress?: () => void;
}

export function SelectDateInput({ children, title, onPress, ...rest }: Props) {
  return (
    <Container>
      {title && <Label>{title}</Label>}
      <FormText {...rest} onPress={onPress} empty={children}>
        {children || 'Clique para selecionar a data'}
      </FormText>
    </Container>
  );
}
