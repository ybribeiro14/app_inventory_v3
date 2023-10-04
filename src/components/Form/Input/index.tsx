import { Control, Controller } from 'react-hook-form';
import { TextInputProps, ActivityIndicator } from 'react-native';

import {
  Container,
  Label,
  Error,
  FormInput,
  WrapperInput,
  LoadingInput,
} from './styles';
import theme from '../../../styles/theme';

interface Props extends TextInputProps {
  control: Control | any;
  name: string;
  title?: string;
  error: string | undefined;
  loading?: boolean;
}

export function Input({
  name,
  control,
  title,
  error,
  loading,
  ...rest
}: Props) {
  return (
    <Container activeOpacity={1}>
      {title && <Label>{title}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <WrapperInput>
            {loading && (
              <LoadingInput>
                <ActivityIndicator size="large" color={theme.colors.header} />
              </LoadingInput>
            )}
            <FormInput
              {...rest}
              onChangeText={onChange}
              value={value}
              ref={ref}
              placeholderTextColor={theme.colors.placeholder}
            />
          </WrapperInput>
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
