import { instance } from './instance';

export type SendOTPRequest = {
  phone: string;
};

export type SendOTPResponse = {
  success: boolean;
  message: string;
  otpId?: string;
};

export type VerifyOTPRequest = {
  phoneNumber: string;
  countryCode: string;
  otp: string;
  otpId: string;
};

export type VerifyOTPResponse = {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    phoneNumber: string;
  };
};

export const authService = {
  sendOTP: async (data: SendOTPRequest): Promise<SendOTPResponse> => {
    try {
      console.log('Sending OTP request:', data);
      console.log('API URL:', 'http://192.168.22.107:3000/api/v1/mobile-auth/send-otp');
      
      const response = await instance.post('api/v1/mobile-auth/send-otp', {
        json: data,
      });
      
      const result = await response.json<SendOTPResponse>();
      console.log('OTP Response:', result);
      return result;
    } catch (error) {
      console.error('OTP API Error:', error);
      throw error;
    }
  },

  verifyOTP: async (data: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
    return instance.post('api/v1/mobile-auth/verify-otp', {
      json: data,
    }).json<VerifyOTPResponse>();
  },
};