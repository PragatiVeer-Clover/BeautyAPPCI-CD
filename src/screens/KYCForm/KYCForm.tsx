import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, StyleSheet, Text, Button, ScrollView } from 'react-native';

import { useTheme } from '@/theme';

import { CustomTextInput, SafeScreen } from '@/components/templates';
// import CustomTextInput from '@/components/templates/TextInput/TextInput';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

function KYCForm() {
  const { colors, fonts, gutters, layout } = useTheme();

  return (
    <SafeScreen>
      <ScrollView style={[gutters.padding_16]}>
        <Text style={[fonts.size_24, fonts.bold, gutters.marginBottom_24]}>
          KYC Form
        </Text>
        <CustomTextInput
          label="Full Name"
          placeholder="Enter your full name"
          //   value={name}
          //   onChangeText={setName}
          //   error={errors.name}
        />

        <Button title="Submit KYC" />
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default KYCForm;
