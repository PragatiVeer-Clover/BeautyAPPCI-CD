/* eslint-disable react/require-default-props */
import { forwardRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { useTheme } from '@/theme';

type CustomTextInputProps = {
  readonly label?: string;
  readonly error?: string;
  readonly containerStyle?: object;
} & TextInputProps;

const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  ({ containerStyle, error, label, style, ...props }, reference) => {
    const { colors, fonts, gutters } = useTheme();

    return (
      <View style={[styles.container, containerStyle]}>
        {typeof label === 'string' && label.length > 0 && (
          <Text
            style={[
              gutters.marginBottom_12,
              fonts.size_16,
              { color: colors.black500 },
            ]}
          >
            {label}
          </Text>
        )}

        <TextInput
          placeholderTextColor={colors.purple500}
          ref={reference}
          style={[styles.input, error && { borderColor: 'red' }, style]}
          {...props} 
        />

        {typeof error === 'string' && error.length > 0 && (
          <Text style={{ color: colors.red500 }}>{error}</Text>
        )}
      </View>
    );
  },
);

CustomTextInput.displayName = 'CustomTextInput';

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
    color: 'red',
  },
});
