import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};
`;

export const WrapperCalendar = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};

  margin-top: ${RFValue(15)}px;

  padding: ${RFValue(26)}px ${RFValue(27)}px;
  width: 100%;

  border-top-left-radius: ${RFValue(50)}px;
  border-top-right-radius: ${RFValue(50)}px;
`;

export const ContainerButton = styled.View`
  justify-content: center;
  padding: 0 ${RFValue(15)}px;
  width: 100%;
  margin-top: ${RFValue(22)}px;
`;

export const TitleCalendar = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};

  margin: 0 auto ${RFValue(20)}px auto;
`;

export const ViewPickers = styled.View`
  /* width: 100%; */
  flex-direction: row;
  height: ${RFValue(40)}px;
`;
