import { SafeScreen } from '@/components/templates';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { useUser } from '@/hooks';
import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

import { Button } from '@/components/atoms';
import countryCodes from '@/data/countryCodes.json';
import { RootScreenProps } from '@/navigation/types';
import axios from 'axios';

type Country = {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
};

function LoginWithMobile({
  navigation,
}: RootScreenProps<Paths.LoginWithMobile>) {
  const { useFetchOneQuery } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { colors, fonts, gutters, layout } = useTheme();
  const [currentId, setCurrentId] = useState(-1);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countryCodes[2],
  ); // Default to India
  const [phoneNumber, setPhoneNumber] = useState('+919167855471');
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const fetchOneUserQuery = useFetchOneQuery(currentId);
  const handleResetError = () => {
    void fetchOneUserQuery.refetch();
  };

  const handleLogin = async () => {
    if (!phoneNumber.trim()) {
      console.log('Please enter phone number');
      return;
    }
    navigation.navigate(Paths.OTPScreen);
    // setIsLoading(true);

    // try {
    //   const response = await axios.post(
    //     'http://192.168.22.107:3000/api/v1/mobile-auth/send-otp',
    //     {
    //       phone: selectedCountry.dialCode + phoneNumber.trim(),
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     },
    //   );

    //   console.log('OTP Response:', response.data);
    // } catch (error: any) {
    //   if (error.response) {
    //     // Server responded with an error
    //     console.error('Error Response:', error.response.data);
    //   } else if (error.request) {
    //     // No response received
    //     console.error('No Response:', error.request);
    //   } else {
    //     // Something went wrong in setting up request
    //     console.error('Axios Error:', error.message);
    //   }
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const selectCountry = (country: Country) => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
  };

  return (
    <SafeScreen
      isError={fetchOneUserQuery.isError}
      onResetError={handleResetError}
      style={{ backgroundColor: colors.black500 }}
    >
      <View style={[gutters.padding_24]}>
        <Text
          style={[
            fonts.bold,
            fonts.size_24,
            { color: colors.gray50 },
            gutters.marginBottom_32,
            { textAlign: 'center' },
          ]}
        >
          Login With Mobile Phone
        </Text>

        <View style={[gutters.marginBottom_24]}>
          <Text
            style={[
              fonts.size_16,
              { color: colors.gray200 },
              gutters.marginBottom_12,
            ]}
          >
            Phone Number
          </Text>

          <View style={styles.phoneInputContainer}>
            <TouchableOpacity
              onPress={() => {
                setShowCountryPicker(true);
              }}
              style={[styles.countryPicker, { borderColor: colors.gray400 }]}
            >
              <Text style={[fonts.size_16]}>{selectedCountry.flag}</Text>
              <Text style={[fonts.size_16, { color: colors.gray50 }]}>
                {selectedCountry.dialCode}
              </Text>
            </TouchableOpacity>

            <TextInput
              keyboardType="phone-pad"
              onChangeText={setPhoneNumber}
              placeholder="Enter phone number"
              placeholderTextColor={colors.gray400}
              style={[
                styles.phoneInput,
                { borderColor: colors.gray400, color: colors.gray50 },
              ]}
              value={phoneNumber}
            />
          </View>
        </View>

        <Button
          title={isLoading ? 'Sending...' : 'Send OTP'}
          onPress={handleLogin}
          variant="primary"
          size="large"
          disabled={isLoading}
          style={{ width: '100%' }}
        />

        <Modal
          visible={showCountryPicker}
          animationType="slide"
          onRequestClose={() => setShowCountryPicker(false)}
        >
          <View style={[{ flex: 1, backgroundColor: colors.black500 }]}>
            <View
              style={[
                gutters.padding_16,
                { borderBottomWidth: 1, borderBottomColor: colors.gray400 },
              ]}
            >
              <Text
                style={[fonts.bold, fonts.size_24, { color: colors.gray50 }]}
              >
                Select Country
              </Text>
            </View>

            <FlatList
              data={countryCodes}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.countryItem, gutters.padding_16]}
                  onPress={() => selectCountry(item)}
                >
                  <Text style={[fonts.size_24]}>{item.flag}</Text>
                  <Text
                    style={[
                      fonts.size_16,
                      { color: colors.gray50 },
                      gutters.marginLeft_12,
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[
                      fonts.size_16,
                      { color: colors.gray400 },
                      { marginLeft: 'auto' },
                    ]}
                  >
                    {item.dialCode}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  phoneInputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 8,
    minWidth: 100,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
});

export default LoginWithMobile;
