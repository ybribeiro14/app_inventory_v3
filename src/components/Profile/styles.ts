import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-left: ${RFValue(10)}px;
`;

export const TextName = styled.Text`
  color: ${({ theme }) => theme.colors.text_header};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
`;

export const TextJob = styled.Text`
  color: ${({ theme }) => theme.colors.text_header};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
`;
