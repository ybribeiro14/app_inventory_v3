import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useState, useContext } from 'react';
import { Alert } from 'react-native';

import api from '../services/api';
import { User } from '../utils/types';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  login: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   async function loadStorageData(): Promise<void> {
  //     const [token, user] = await AsyncStorage.multiGet([
  //       '@Invetory:token',
  //       '@Invetory:user',
  //     ]);

  //     if (token[1] && user[1]) {
  //       setData({ token: token[1], user: JSON.parse(user[1]) });
  //       api.defaults.headers.Authorization = `Bearer ${token[1]}`;
  //     }

  //     setLoading(false);
  //   }

  //   loadStorageData();
  // });

  const signIn = useCallback(async ({ login, password }: SignInCredentials) => {
    const response = await api.post('sessions', {
      login,
      password,
    });
    const { token, user } = response.data;

    if (user.job !== 'Conferente') {
      Alert.alert('Atenção', 'Usuário informado não é um conferente');
      setLoading(false);
      return;
    }

    if (!user.feature) {
      Alert.alert(
        'Erro na autenticação',
        'Usuário informado não está vinculado a um inventário',
      );
      setLoading(false);
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    // await AsyncStorage.multiSet([
    //   ['@Invetory:token', token],
    //   ['@Invetory:user', JSON.stringify(user)],
    // ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Invetory:token', '@Invetory:user']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
