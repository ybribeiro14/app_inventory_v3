import { Picker } from '@react-native-picker/picker';
import { getMonth, getYear } from 'date-fns';
import React, { useState, useEffect } from 'react';
import {
  Calendar as CustomCalendar,
  DateObject,
  LocaleConfig,
} from 'react-native-calendars';

import {
  Container,
  TitleCalendar,
  ContainerButton,
  WrapperCalendar,
  ViewPickers,
} from './styles';
import { Button } from '../Form/Button';
import { Header } from '../Header';

const months = [
  {
    label: 'Janeiro',
    value: 1,
  },
  {
    label: 'Fevereiro',
    value: 2,
  },
  {
    label: 'Março',
    value: 3,
  },
  {
    label: 'Abril',
    value: 4,
  },
  {
    label: 'Maio',
    value: 5,
  },
  {
    label: 'Junho',
    value: 6,
  },
  {
    label: 'Julho',
    value: 7,
  },
  {
    label: 'Agosto',
    value: 8,
  },
  {
    label: 'Setembro',
    value: 9,
  },
  {
    label: 'Outubro',
    value: 10,
  },
  {
    label: 'Novembro',
    value: 11,
  },
  {
    label: 'Dezembro',
    value: 12,
  },
  {
    label: 'Fevereiro',
    value: 2,
  },
];

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  dayNames: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ],
  dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'],
  today: 'Hoje',
};

interface CalendarProps {
  selectDate: (date: DateObject) => void;
  closeModal(): void;
}

LocaleConfig.defaultLocale = 'pt-br';
export function Calendar({ selectDate, closeModal }: CalendarProps) {
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<number>();
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const getYears = () => {
      const currentYear = getYear(new Date());
      const currentMonth = getMonth(new Date());
      const minYear = currentYear - 20;
      const maxYear = currentYear + 100;

      const arrayYears = [];
      for (let index = minYear; index <= maxYear; index++) {
        arrayYears.push(index);
      }

      setYears(arrayYears);
      setSelectedYear(currentYear);
      setSelectedMonth(currentMonth + 1);
    };

    getYears();
  }, []);

  // const handleChangeYearMonth = useCallback((item, type) => {}, []);
  return (
    <Container>
      <Header />

      <WrapperCalendar>
        <TitleCalendar>Selecione a Data</TitleCalendar>
        <ViewPickers>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={itemValue => setSelectedMonth(itemValue)}
            style={{ width: '50%' }}
          >
            {months.map(month => (
              <Picker.Item
                key={month.value}
                label={month.label}
                value={month.value}
              />
            ))}
          </Picker>
          <Picker
            selectedValue={selectedYear}
            onValueChange={itemValue => setSelectedYear(itemValue)}
            style={{ width: '50%' }}
          >
            {years.map(year => (
              <Picker.Item key={year} label={String(year)} value={year} />
            ))}
          </Picker>
        </ViewPickers>

        <CustomCalendar
          onDayPress={day => selectDate(day)}
          hideArrows
          renderHeader={date => {
            <></>;
          }}
          onPre
        />
        <ContainerButton>
          <Button
            title="Sair"
            onPress={closeModal}
            loading={false}
            buttonYesNo={3}
          />
        </ContainerButton>
      </WrapperCalendar>
    </Container>
  );
}
