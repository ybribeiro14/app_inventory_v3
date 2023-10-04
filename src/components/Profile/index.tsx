import React from 'react';

import { Container, TextName, TextJob } from './styles';
import { useAuth } from '../../hooks/auth';

export function Profile() {
  const { user } = useAuth();
  return (
    <Container>
      <TextName>{user.name}</TextName>
      <TextJob>{user.job}</TextJob>
    </Container>
  );
}
