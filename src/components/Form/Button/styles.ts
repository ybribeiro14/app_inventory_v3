import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface ButtonProps extends TouchableOpacityProps {
  buttonYesNo: number;
}

export const Container = styled(TouchableOpacity)`
  padding: 15px 0;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  ${(props: ButtonProps) => {
    if (props.buttonYesNo === 1) {
      return css`
        background-color: ${({ theme }) => theme.colors.background_secondary};
        width: 47%;
      `;
    }
    if (props.buttonYesNo === 2) {
      return css`
        background-color: ${({ theme }) => theme.colors.error};
        width: 47%;
      `;
    }
    return css`
      background-color: ${({ theme }) => theme.colors.background_secondary};
    `;
  }}
`;
export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(16)}px;

  color: ${({ theme }) => theme.colors.text};
`;
