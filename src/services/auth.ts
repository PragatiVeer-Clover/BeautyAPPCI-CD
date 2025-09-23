import { instance } from './instance';

export type SendOTPRequest = {
  phoneNumber: string;
  countryCode: string;
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
    return instance.post('api/v1/mobile-auth/send-otp', {
      json: data,
    }).json<SendOTPResponse>();
  },

  verifyOTP: async (data: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
    return instance.post('api/v1/mobile-auth/verify-otp', {
      json: data,
    }).json<VerifyOTPResponse>();
  },
};