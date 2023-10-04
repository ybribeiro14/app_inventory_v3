import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  align-items: center;
  justify-content: center;
`;

export const ViewModal = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const Icon = styled(MaterialCommunityIcons)`
  color: ${({ theme }) => theme.colors.background_primary};
  font-size: ${RFValue(300)}px;
`;

export const ScanHelper = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  justify-content: center;
  align-items: center;
`;

export const ButtonModalClose = styled(TouchableOpacity)`
  background-color: rgba(0, 0, 0, 0.5);
  padding: ${RFValue(10)}px;
  width: ${RFValue(70)}px;
  height: ${RFValue(70)}px;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 25px;
  bottom: 50px;
  border-radius: ${RFValue(35)}px;
`;

export const ButtonModalPen = styled(TouchableOpacity)`
  background-color: rgba(0, 0, 0, 0.5);
  padding: ${RFValue(10)}px;
  width: ${RFValue(70)}px;
  height: ${RFValue(70)}px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 25px;
  bottom: 50px;
  border-radius: ${RFValue(35)}px;
`;

export const TextModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.background_primary};
  position: absolute;
  top: 50px;
`;
