import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin: ${RFValue(15)}px auto ${RFValue(15)}px auto;
  align-items: center;
  width: 100%;
`;

export const TextFooter = styled.Text`
  color: ${({ theme }) => theme.colors.text_header};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
`;
