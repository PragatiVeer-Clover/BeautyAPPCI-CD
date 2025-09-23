import { useMutation } from '@tanstack/react-query';
import { authService, SendOTPRequest, VerifyOTPRequest } from '@/services/auth';

export const useAuth = () => {
  const sendOTPMutation = useMutation({
    mutationFn: (data: SendOTPRequest) => authService.sendOTP(data),
    onSuccess: (data) => {
      console.log('OTP sent successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to send OTP:', error);
    },
  });

  const verifyOTPMutation = useMutation({
    mutationFn: (data: VerifyOTPRequest) => authService.verifyOTP(data),
    onSuccess: (data) => {
      console.log('OTP verified successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to verify OTP:', error);
    },
  });

  return {
    sendOTP: sendOTPMutation.mutate,
    verifyOTP: verifyOTPMutation.mutate,
    sendOTPStatus: {
      isLoading: sendOTPMutation.isPending,
      isError: sendOTPMutation.isError,
      isSuccess: sendOTPMutation.isSuccess,
      error: sendOTPMutation.error,
      data: sendOTPMutation.data,
    },
    verifyOTPStatus: {
      isLoading: verifyOTPMutation.isPending,
      isError: verifyOTPMutation.isError,
      isSuccess: verifyOTPMutation.isSuccess,
      error: verifyOTPMutation.error,
      data: verifyOTPMutation.data,
    },
  };
};