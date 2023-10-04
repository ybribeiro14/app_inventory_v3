import React from 'react';
import { TouchableOpacityProps, ActivityIndicator } from 'react-native';

import { Container, ButtonText } from './styles';
import theme from '../../../styles/theme';

interface Props extends TouchableOpacityProps {
  title: string;
  loading: boolean;
  buttonYesNo: number;
}

export function Button({ title, loading, buttonYesNo, ...rest }: Props) {
  return (
    <Container {...rest} buttonYesNo={buttonYesNo}>
      <ButtonText>
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.header} />
        ) : (
          title
        )}
      </ButtonText>
    </Container>
  );
}
