import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';

import { useTheme } from '@/theme';

type ButtonProps = {
  readonly title: string;
  readonly onPress: () => void;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly disabled?: boolean;
  readonly style?: ViewStyle;
  readonly textStyle?: TextStyle;
};
type ButtonSize = 'small' | 'medium' | 'large';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

function Button({
  disabled = false,
  onPress,
  size = 'medium',
  style,
  textStyle,
  title,
  variant = 'primary',
}: ButtonProps) {
  const { colors } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      alignItems: 'center',
      borderRadius: 8,
      justifyContent: 'center',
    };

    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      small: { paddingVertical: 8, paddingHorizontal: 16 },
      medium: { paddingHorizontal: 24, paddingVertical: 12 },
      large: { paddingVertical: 16, paddingHorizontal: 32 },
    };

    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: {
        backgroundColor: disabled ? colors.gray200 : colors.purple500,
      },
      secondary: {
        backgroundColor: disabled ? colors.gray100 : colors.gray400,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: disabled ? colors.gray200 : colors.purple500,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTextStyle = (): TextStyle => {
    const sizeTextStyles: Record<ButtonSize, TextStyle> = {
      large: { fontSize: 18 },
      medium: { fontSize: 16 },
      small: { fontSize: 14 },
    };

    const variantTextStyles: Record<ButtonVariant, TextStyle> = {
      outline: {
        color: disabled ? colors.gray200 : colors.purple500,
        fontWeight: '600',
      },
      primary: {
        color: disabled ? colors.gray400 : colors.gray50,
        fontWeight: '600',
      },
      secondary: {
        color: disabled ? colors.gray400 : colors.gray50,
        fontWeight: '600',
      },
    };

    return {
      ...sizeTextStyles[size],
      ...variantTextStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={[getButtonStyle(), style]}
    >
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;