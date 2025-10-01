import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
  NativeModules,
  PermissionsAndroid,
  DeviceEventEmitter,
} from 'react-native';

const { OTPModule } = NativeModules;

const OTP_LENGTH = 6;
const expectedOtp = '041600';
const length = 6;
const indexBox = length - 1;

function OTPScreen() {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const inputs = useRef<RNTextInput[]>([]);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    const requestSmsPermission = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        );
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS,
        );
      }
    };

    const subscription = DeviceEventEmitter.addListener(
      'OtpReceived',
      (receivedOtp: string) => {
        const otpArray = receivedOtp.split('');
        setOtp(otpArray);
        if (receivedOtp.length === length) {
          verifyOtp(receivedOtp);
        }
      },
    );

    requestSmsPermission();
    if (OTPModule) {
      console.log('OTPModules ==>', OTPModule);
      OTPModule.startListening();
    }

    return () => subscription.remove();
  }, []);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text) || text === '') {
      const updatedOtp = [...otp];
      updatedOtp[index] = text;
      setOtp(updatedOtp);

      // Move to next input if digit entered
      if (text && index < OTP_LENGTH - 1) {
        inputs.current[index + 1]?.focus();
      }

      // Move to previous input if cleared
      if (!text && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = () => {
    const code = otp.join('');
    if (code.length === OTP_LENGTH) {
      console.log('Entered OTP:', code);
      // 🔗 Call API or navigate
    } else {
      console.log('Please enter complete OTP');
    }
  };

  const verifyOtp = (enteredOtp: string) => {
    setLoading(true);
    setInvalid(false);

    // Run async timer so UI stays responsive
    setTimeout(() => {
      if (enteredOtp === expectedOtp) {
        setLoading(false);
        
        // onVerified();
      } else {
        setLoading(false);
        handleInvalidOtp();
      }
    }, 5000); // ⏳ 5 s loader before validation
  };

  const handleInvalidOtp = () => {
    setInvalid(true);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Enter OTP</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, idx) => (
          <TextInput
            key={idx}
            ref={(el) => (inputs.current[idx] = el!)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, idx)}
            autoFocus={idx === 0}
          />
        ))}
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  otpInput: {
    width: 50,
    height: 50,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 22,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#222',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OTPScreen;
