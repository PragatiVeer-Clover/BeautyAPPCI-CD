import type { Paths } from '@/navigation/paths';
import type { StackScreenProps } from '@react-navigation/stack';

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type RootStackParamList = {
  [Paths.Example]: undefined;
  [Paths.OnboardingScreen]:undefined;
  [Paths.Startup]: undefined;
  [Paths.KYCForm]: undefined;
  [Paths.LoginWithMobile]: undefined;
  [Paths.OTPScreen]: {
    mobile: string;
    onVerified: () => void;
  };
};
