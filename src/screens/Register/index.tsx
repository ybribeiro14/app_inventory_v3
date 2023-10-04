import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Keyboard,
  Platform,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Container, HeaderTitle, Form, TextDescription } from './styles';
import { CustomDatePicker } from '../../components/CustomDatePicker';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { SelectDateInput } from '../../components/Form/SelectDateInput';
import { Header } from '../../components/Header';
import { ModalLocaleEmpty } from '../../components/ModalLocaleEmpty';
import { ModalScanner } from '../../components/ModalScanner';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface ListEansType {
  countNumber: number;
  eans: string[];
  users: string[];
}

interface InputsEditing {
  [key: string]: boolean;
}

interface TranslateNames {
  [key: string]: string;
}

interface PayloadRegister {
  locator: string;
  ean: string;
  amount: number;
  lot?: string;
  serial?: string;
}

export function Register() {
  const [loading, setLoading] = useState(false);
  const [loadingCheckingLocator, setLoadingCheckingLocator] = useState(false);
  const [loadingCheckingEan, setLoadingCheckingEan] = useState(false);
  const [description, setDescription] = useState<string>('');
  const [listEanBipsLocator, setListEanBipsLocator] = useState<ListEansType>({
    countNumber: 0,
    eans: [],
    users: [],
  });
  const [modalScannerOpen, setModalScannerOpen] = useState(false);
  const [modalLocatorEmpty, setModalLocatorEmpty] = useState(false);
  const [dateSelected, setDateSelected] = useState<string>('');
  const [dateSelectedISO, setDateSelectedISO] = useState<Date | null>(null);
  const [inputNameBip, setInputNameBip] = useState<string>('');
  const [inputEditing, setInputEditing] = useState<InputsEditing>({
    locator: false,
    ean: false,
    lot: false,
    serial: false,
  });

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { user, signOut } = useAuth();

  const translateNames: TranslateNames = {
    locator: 'Localizador',
    ean: 'EAN',
    lot: 'Lote',
    serial: 'Serial',
  };

  const {
    control,
    handleSubmit,
    formState,
    setFocus,
    getValues,
    setValue,
    setError,
    clearErrors,
    reset,
  } = useForm();

  const { errors } = formState;

  const closeModalEmptyLocale = useCallback(async () => {
    setValue('locator', '', { shouldDirty: false });
    setModalLocatorEmpty(false);
  }, [setValue]);

  const openModalScanner = useCallback(
    async (inputName: string) => {
      if (loadingCheckingEan || loadingCheckingLocator) return;
      if (!inputEditing[inputName]) {
        setInputNameBip(inputName);
        setModalScannerOpen(true);
      }
    },
    [inputEditing, loadingCheckingEan, loadingCheckingLocator],
  );

  const closeModalScanner = useCallback(async () => {
    Keyboard.dismiss();

    setModalScannerOpen(false);
  }, []);

  const selectDate = useCallback(
    (event: DateTimePickerEvent, selectedDate: Date) => {
      try {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        setDateSelected(format(selectedDate, 'dd/MM/yyyy'));
      } catch (error) {
        console.log(error);
      }
    },
    [setShowDatePicker, setDate, setDateSelected, date],
  );

  const checkLocale = useCallback(async () => {
    try {
      if (loadingCheckingLocator) {
        return;
      }
      const locator = getValues('locator');
      setError('locator', {});
      setInputEditing(oldValue => ({
        ...oldValue,
        locator: false,
      }));
      if (locator) {
        setLoadingCheckingLocator(true);

        const response = await api.post('check_locator', {
          idInventory: user.id_feature,
          locator,
          user: user.login,
        });
        if (response.data.statusCode !== 200) {
          if (response.data.statusCode === 500 && user.feature?.empty_locator) {
            setLoadingCheckingLocator(false);
            setModalLocatorEmpty(true);
          } else {
            setLoadingCheckingLocator(false);

            setValue('locator', '', { shouldDirty: false });
            setError('locator', {
              type: 'manual',
              message: response.data.error,
            });
          }
        } else {
          clearErrors('locator');
          if (user.feature?.model === 2) {
            setListEanBipsLocator(response.data);
          }
          // if (
          //   atualLocator &&
          //   user.feature?.model === 3 &&
          //   locator !== atualLocator
          // ) {
          //   setChangeLocator(true);
          //   handleShow();
          //   return;
          // }
          setLoadingCheckingLocator(false);
          setFocus('ean');
        }
      } else {
        setError('locator', {
          type: 'manual',
          message: 'Localizador não pode ser vazio.',
        });
        setLoadingCheckingLocator(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Request failed with status code 401') {
          signOut();
        }
      } else {
        console.error('Unknown error :', error);
      }

      setLoadingCheckingLocator(false);
    }
  }, [
    getValues,
    user,
    setError,
    setFocus,
    setValue,
    clearErrors,
    signOut,
    loadingCheckingLocator,
  ]);

  const checkEan = useCallback(async () => {
    if (loadingCheckingEan) {
      return;
    }
    setLoadingCheckingEan(true);
    setDescription('');
    setError('ean', {});
    setInputEditing(oldValue => ({
      ...oldValue,
      ean: false,
    }));

    const ean = getValues('ean');
    if (ean.length > 14) {
      setLoadingCheckingEan(false);

      setValue('ean', '', { shouldDirty: false });
      setError('ean', {
        type: 'manual',
        message: 'EAN inválido, possui mais que 14 dígitos!',
      });
      // setFocus('ean');
      return;
    }

    if (!ean) {
      setLoadingCheckingEan(false);
      return;
    }

    let nextFocusInput;
    if (user.feature?.model !== 3) {
      if (user.feature?.model === 2 && listEanBipsLocator) {
        // Verificar se o EAN já foi contando neste local, nesta contagem. Correr array de EAN's se encontrar o EAN não permitir continuar;
        const eanFind = listEanBipsLocator.eans.find(eanBip => {
          return eanBip === ean;
        });
        console.log('eanFind', eanFind);
        if (eanFind) {
          setLoadingCheckingEan(false);

          setValue('ean', '', { shouldDirty: false });
          setError('ean', {
            type: 'manual',
            message: `O EAN ${ean} já possui um registro neste local na atual contagem. Não é permitido registrá-lo novamente.`,
          });
          // setFocus('ean');
          return;
        }
      }

      if (!user.feature?.validate_ean) {
        clearErrors('ean');
        // NÃO VALIDA O EAN
        nextFocusInput = user.feature?.collect_lot
          ? 'lot'
          : user.feature?.collect_serial
          ? 'serial'
          : 'amount';

        setLoadingCheckingEan(false);
        setFocus(nextFocusInput);

        return;
      }
      if (ean) {
        const response = await api.post('check_ean', {
          ean,
          id_feature: user.id_feature,
        });

        if (response.data.statusCode !== 200) {
          setLoadingCheckingEan(false);

          setValue('ean', '', { shouldDirty: false });
          setError('ean', {
            type: 'manual',
            message: response.data.error,
          });
          // setFocus('ean');
        } else {
          setLoadingCheckingEan(false);

          const desc = `${response.data.cod_product} - ${response.data.description}`;
          setDescription(desc);

          nextFocusInput = user.feature?.collect_lot
            ? 'lot'
            : user.feature?.collect_serial
            ? 'serial'
            : 'amount';

          setFocus(nextFocusInput);
        }
      } else {
        setDescription('');
      }
    }
    //   else if (locator === '') {
    //   locatorRef.current.focus();
    //   setEan('');
    //   toast.error('Informe o localizador.');
    // } else if (ean !== '') {
    //   if (user.feature?.same_ean) {
    //     const eanDifferent =
    //       listEans.length > 0
    //         ? listEans.filter(eanList => eanList.ean !== ean)
    //         : false;
    //     if (eanDifferent && eanDifferent.length !== 0) {
    //       setShowAlertEan(true);
    //       setEan('');
    //       return;
    //     }
    //   } else {
    //     const payload = {
    //       ean,
    //       id_feature: user.id_feature,
    //       locator,
    //     };

    //     const response = await api.post('check_ean_locator', payload);

    //     if (response.data.statusCode !== 200) {
    //       setEan('');
    //       toast.error(response.data.error);
    //       return;
    //     }
    //   }

    //   await dispatch(insertEanList(ean, locator));
    //   setEan('');
    // }
  }, [
    getValues,
    listEanBipsLocator,
    setError,
    setFocus,
    setValue,
    user,
    loadingCheckingEan,
    clearErrors,
  ]);

  const onCodeScanned = useCallback(
    async (type: string, data: string) => {
      setValue(inputNameBip, data, { shouldDirty: false });
      setModalScannerOpen(false);
      if (inputNameBip === 'locator') {
        checkLocale();
      } else if (inputNameBip === 'ean') {
        checkEan();
      } else {
        setFocus('serial');
      }

      setInputNameBip('');
    },
    [inputNameBip, setValue, checkLocale, checkEan, setFocus],
  );

  const handleWriteInput = useCallback(async () => {
    setModalScannerOpen(false);

    const inputs: InputsEditing = inputEditing;
    inputs[inputNameBip] = true;
    setInputEditing(inputs);
    setFocus(inputNameBip);
  }, [inputEditing, inputNameBip, setFocus]);

  const handleRegister = async (formData: PayloadRegister) => {
    try {
      const valuesVerify = Object.values(formData);
      valuesVerify.forEach(value => {
        if (!value) {
          throw new Error('Favor informar todos os campos');
        }
      });

      setLoading(true);
      const response = await api.post(`register`, {
        id_inventory: user.id_feature,
        user: user.login,
        ...formData,
        date_validate: dateSelectedISO || null,
      });
      console.log('response', JSON.stringify(response.data, null, 2));
      if (response.data.statusCode && response.data.statusCode !== 200) {
        Alert.alert('Erro ao tentar registrar', response.data.error);
        setLoading(false);
        return;
      }

      reset();
      setDateSelected('');
      setDateSelectedISO(null);
      setInputEditing({
        locator: false,
        ean: false,
        lot: false,
        serial: false,
      });
      setInputNameBip('');
      setLoading(false);
      setDescription('');
      Alert.alert('Sucesso', 'Registro realizado com sucesso');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro ao tentar registrar', error.message);
      } else {
        Alert.alert('Erro ao tentar registrar');
      }
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <Container>
          <Header />

          <Form>
            <HeaderTitle>Registrar</HeaderTitle>

            <Input
              title="Localizador"
              name="locator"
              error={errors.locator && String(errors.locator.message)}
              control={control}
              autoCorrect={false}
              autoCapitalize="none"
              onSubmitEditing={() => checkLocale()}
              returnKeyType="next"
              onBlur={inputEditing.locator ? () => checkLocale() : undefined}
              loading={loadingCheckingLocator}
              editable={!loadingCheckingLocator && !loadingCheckingEan}
              onFocus={() => openModalScanner('locator')}
              showSoftInputOnFocus={inputEditing.locator}
              placeholder={
                inputEditing.locator
                  ? 'Digite o localizador'
                  : 'Clique para bipar o localizador'
              }
            />
            <Input
              title="Ean"
              name="ean"
              error={errors.ean && String(errors.ean.message)}
              control={control}
              autoCorrect={false}
              autoCapitalize="none"
              onSubmitEditing={() => checkEan()}
              returnKeyType="next"
              onBlur={inputEditing.ean ? () => checkEan() : undefined}
              keyboardType="numeric"
              loading={loadingCheckingEan}
              editable={!loadingCheckingLocator && !loadingCheckingEan}
              onFocus={() => openModalScanner('ean')}
              showSoftInputOnFocus={inputEditing.ean}
              placeholder={
                inputEditing.ean ? 'Digite o EAN' : 'Clique para bipar o EAN'
              }
            />

            {description !== '' && (
              <TextDescription>{`Descrição: ${description}`}</TextDescription>
            )}

            {user.feature?.collect_lot && (
              <Input
                title="Lote"
                name="lot"
                error={errors.login && String(errors.login.message)}
                control={control}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                editable={!loadingCheckingLocator && !loadingCheckingEan}
                onFocus={() => openModalScanner('lot')}
                showSoftInputOnFocus={inputEditing.lot}
                placeholder={
                  inputEditing.lot
                    ? 'Digite o lote'
                    : 'Clique para bipar o lote'
                }
              />
            )}
            {user.feature?.collect_serial && (
              <Input
                title="Serial"
                name="serial"
                error={errors.login && String(errors.login.message)}
                control={control}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                editable={!loadingCheckingLocator && !loadingCheckingEan}
                onFocus={() => openModalScanner('serial')}
                showSoftInputOnFocus={inputEditing.serial}
                placeholder={
                  inputEditing.serial
                    ? 'Digite o serial'
                    : 'Clique para bipar o serial'
                }
              />
            )}
            {user.feature?.collect_date && (
              <SelectDateInput
                title="Data de Validade"
                returnKeyType="next"
                onPress={() => setShowDatePicker(true)}
                placeholder="Clique para selecionar a data"
              >
                {dateSelected}
              </SelectDateInput>
            )}
            <CustomDatePicker
              date={date}
              show={showDatePicker}
              onChange={selectDate}
            />

            <Input
              title="Quantidade"
              name="amount"
              error={errors.login && String(errors.login.message)}
              control={control}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="numeric"
              editable={!loadingCheckingLocator && !loadingCheckingEan}
              placeholder="Digite a quantidade"
            />

            <Button
              style={{
                marginTop: RFValue(26),
              }}
              title="Registrar"
              onPress={handleSubmit(handleRegister)}
              loading={loading}
              disabled={loading || loadingCheckingLocator || loadingCheckingEan}
              buttonYesNo={3}
            />
          </Form>

          <Footer />
        </Container>
      </ScrollView>
      <ModalLocaleEmpty
        visible={modalLocatorEmpty}
        title="Localizador Vazio"
        transparent
        animationType="fade"
        message="Este localizador não foi encontrado na base do inventário, deseja
              incluir como um Localizador Vazio?"
        closeModal={closeModalEmptyLocale}
      />
      <ModalScanner
        modalVisible={modalScannerOpen}
        closeModal={closeModalScanner}
        onCodeScanned={onCodeScanned}
        handleWriteInput={handleWriteInput}
        typeInput={translateNames[inputNameBip]}
      />
    </KeyboardAvoidingView>
  );
}
