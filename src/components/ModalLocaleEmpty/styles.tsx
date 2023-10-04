import { Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${RFValue(5)}px;
`;

export const Content = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background_primary};
  height: ${RFValue(300)}px;
  border-radius: ${RFValue(20)}px;
  padding: ${RFValue(5)}px;
  border: solid 5px ${({ theme }) => theme.colors.text};
  width: 100%;
`;

export const WhapperButton = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 ${RFValue(5)}px;
`;

export const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_700};
  font-size: ${RFValue(30)}px;
`;

export const TextMessage = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(20)}px;
  margin-top: ${RFValue(15)}px;
  margin-bottom: ${RFValue(40)}px;
  text-align: center;
`;
