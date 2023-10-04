import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Yup from 'yup';

import { Container, HeaderTitle, Form, WrapperLogo } from './styles';
import LogoSvg from '../../assets/inventario.svg';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { useAuth } from '../../hooks/auth';
import theme from '../../styles/theme';

interface FormData {
  login: string;
  password: string;
}

const schema = Yup.object().shape({
  login: Yup.string().required('Login é obrigatório!'),
  password: Yup.string().required('Senha é obrigatória!'),
});

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState, setFocus } = useForm({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const { signIn } = useAuth();

  const handleLogin = useCallback(
    async (data: FormData) => {
      setLoading(true);
      try {
        await signIn({
          login: data.login,
          password: data.password,
        });

        setLoading(false);
      } catch (err) {
        console.log(err);
        Alert.alert(
          'Erro na autenticação',
          `Ocorreu um erro ao fazer o login, cheque as credenciais.`,
        );
      }
    },
    [signIn],
  );

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <Container>
          <WrapperLogo>
            <LogoSvg
              width={RFValue(150)}
              height={RFValue(150)}
              fill={theme.colors.header}
            />
          </WrapperLogo>

          <Form>
            <HeaderTitle>Inventário - Login</HeaderTitle>

            <Input
              name="login"
              error={errors.login && errors.login.message}
              control={control}
              placeholder="Escreva o seu login aqui"
              autoCorrect={false}
              autoCapitalize="none"
              onSubmitEditing={() => setFocus('password')}
              returnKeyType="next"
            />
            <Input
              name="password"
              error={errors.password && errors.password.message}
              control={control}
              secureTextEntry
              placeholder="Escreva a senha aqui"
              returnKeyType="send"
              onSubmitEditing={handleSubmit(handleLogin)}
            />

            <Button
              style={{
                marginTop: RFValue(26),
              }}
              title="Entrar"
              onPress={handleSubmit(handleLogin)}
              loading={loading}
              disabled={loading}
              buttonYesNo={3}
            />
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
