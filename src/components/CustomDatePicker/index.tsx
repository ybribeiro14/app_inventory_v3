import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface CustomDatePickerProps {
  show: boolean;
  date: Date;
  onChange(event: DateTimePickerEvent, date: Date | undefined): void;
}

export function CustomDatePicker({
  date,
  show,
  onChange,
}: CustomDatePickerProps) {
  return (
    <>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
}
