import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const WrapperHeader = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: ${RFValue(50)}px;
  width: 100%;
  padding: 0 ${RFValue(20)}px;
  background-color: ${({ theme }) => theme.colors.header};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.logout};
  font-size: ${RFValue(30)}px;
`;

export const LogoutButton = styled(TouchableOpacity)`
  background-color: transparent;
`;
