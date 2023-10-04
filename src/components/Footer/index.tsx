import React from 'react';

import { Container, TextFooter } from './styles';
import { useAuth } from '../../hooks/auth';

export function Footer() {
  const { user } = useAuth();

  return (
    <Container>
      <TextFooter>{`Cliente: ${user.feature?.client}`}</TextFooter>
      <TextFooter>{`Modelo: ${user.feature?.model}`}</TextFooter>
      <TextFooter>{`Contagem atual: ${user.feature?.stat}`}</TextFooter>
      <TextFooter>Desenvolvido por SBS Solutions</TextFooter>
    </Container>
  );
}
