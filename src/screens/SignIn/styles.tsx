import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.header};
`;

export const WrapperLogo = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(50)}px;
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};

  margin: ${RFValue(14)}px auto ${RFValue(41)}px auto;
`;

export const Form = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};

  margin-top: ${RFValue(15)}px;

  padding: ${RFValue(26)}px ${RFValue(27)}px;
  width: 100%;

  border-top-left-radius: ${RFValue(50)}px;
  border-top-right-radius: ${RFValue(50)}px;
`;
