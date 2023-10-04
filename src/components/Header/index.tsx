import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { WrapperHeader, Icon, LogoutButton } from './styles';
import LogoSvg from '../../assets/inventario.svg';
import { useAuth } from '../../hooks/auth';
import theme from '../../styles/theme';
import { Profile } from '../Profile';

export function Header() {
  const { signOut } = useAuth();

  const handleSingOut = useCallback(async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que quer sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => signOut() },
      ],
      { cancelable: false },
    );
  }, [signOut]);

  return (
    <WrapperHeader>
      <LogoSvg
        width={RFValue(45)}
        height={RFValue(45)}
        fill={theme.colors.header}
      />
      <Profile />
      <LogoutButton onPress={() => handleSingOut()}>
        <Icon name="power" />
      </LogoutButton>
    </WrapperHeader>
  );
}
