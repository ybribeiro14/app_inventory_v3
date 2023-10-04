import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.header};
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};

  margin: 0 auto 0 auto;
`;

export const TextDescription = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};

  margin: ${RFValue(5)}px auto 0 auto;
`;

export const Form = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};

  padding: ${RFValue(15)}px ${RFValue(27)}px ${RFValue(50)}px ${RFValue(27)}px;
  width: 100%;

  margin-top: ${RFValue(15)}px;

  border-top-left-radius: ${RFValue(50)}px;
  border-top-right-radius: ${RFValue(50)}px;
  border-bottom-right-radius: ${RFValue(50)}px;
  border-bottom-left-radius: ${RFValue(50)}px;
`;

export const WrapperLoading = styled.View`
  flex: 1;
  position: absolute;
  top: 50%;
  left: 50%;
`;
