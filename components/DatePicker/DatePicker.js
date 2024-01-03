import React, { useState, useCallback } from "react";
import { TextInput } from "react-native-paper";
import DatePickerModal from "react-native-paper-dates";
import { ViewStyle } from "react-native";

const DatePicker = ({
  calendarIcon = "calendar",
  iconSize = 24,
  iconColor,
  disabled = false,
  testID = "date-picker",
  iconStyle,
  ...props
}) => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const onDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const onConfirm = useCallback((selectedDate) => {
    setDate(selectedDate);
    setVisible(false);
  }, []);

  return (
    <>
      <TextInput
        {...props}
        value={date.toDateString()}
        disabled={disabled}
        right={
          <TextInput.Icon
            name={calendarIcon}
            size={iconSize}
            color={iconColor}
            disabled={disabled}
            onPress={() => setVisible(true)}
            /*       style={iconStyle as StyleProp<ViewStyle>} */
            testID={`${testID}-icon`}
          />
        }
      />

      <DatePickerModal
        mode="single"
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        date={date}
        // Add other props as required
      />
    </>
  );
};

export default DatePicker;
