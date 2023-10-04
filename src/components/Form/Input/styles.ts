import { TextInput, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

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

export const FormInput = styled(TextInput)`
  padding: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(16)}px;
  border-radius: 10px;
  width: 100%;
`;

export const WrapperInput = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid #29292e;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background_primary};
  padding-right: ${RFValue(40)}px;
`;

export const LoadingInput = styled.View`
  position: absolute;
  bottom: 20%;
  right: 10px;
`;
