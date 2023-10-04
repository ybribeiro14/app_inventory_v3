import { Text, TextProps, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface TextPropsSelectDate extends TextProps {
  empty: string;
}

export const Container = styled(TouchableOpacity)`
  margin-top: ${RFValue(15)}px;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${RFValue(4)}px;
`;

export const FormText = styled(Text)`
  padding: ${RFValue(16)}px;
  border-radius: 10px;
  border: 1px solid #9883bf;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(16)}px;

  ${(props: TextPropsSelectDate) =>
    !props.empty &&
    css`
      color: ${({ theme }) => theme.colors.placeholder};
    `}
`;
