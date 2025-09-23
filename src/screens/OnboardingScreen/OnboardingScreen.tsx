import type { RootScreenProps } from '@/navigation/types';

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

import { useUser } from '@/hooks';
import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

import { AssetByVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';

const { height, width } = Dimensions.get('window');

function OnboardingScreen({
  navigation,
}: RootScreenProps<Paths.OnboardingScreen>) {
  const { useFetchOneQuery } = useUser();
  const { colors, fonts, gutters, layout } = useTheme();

  const { isError, isFetching } = useQuery({
    queryFn: () => Promise.resolve(true),
    queryKey: ['startup'],
  });

  const [currentId, setCurrentId] = useState(-1);
  const fetchOneUserQuery = useFetchOneQuery(currentId);

  const handleResetError = () => {
    void fetchOneUserQuery.refetch();
  };

  const finishOnboarding = () => {
    navigation.navigate(Paths.KYCForm);
  };

  return (
    <SafeScreen
      isError={fetchOneUserQuery.isError}
      onResetError={handleResetError}
    >
      <SwiperFlatList
        paginationActiveColor={colors.red500}
        paginationDefaultColor={colors.gray200}
        paginationStyleItem={{ borderRadius: 5, height: 10, width: 10 }}
        showPagination
      >
        {/* Slide 1 */}
        <View style={[styles.slide, { backgroundColor: colors.purple100 }]}>
          <View style={[gutters.paddingTop_80]}>
            <AssetByVariant
              path="girl"
              resizeMode="cover"
              style={{ height: 300, width: 300 }}
            />
          </View>
          <Text style={[fonts.size_32, fonts.gray800, fonts.bold]}>
            Welcome to React Native BeautySnap
          </Text>
        </View>

        {/* Slide 2 */}
        <View style={[styles.slide, { backgroundColor: colors.purple100 }]}>
          <Text style={styles.text}>🔵 Splash Screen 2</Text>
        </View>

        {/* Slide 3 */}
        <View style={[styles.slide, { backgroundColor: colors.purple100 }]}>
          <Text style={styles.text}>🟣 Splash Screen 3</Text>
          <Button onPress={finishOnboarding} title="Get Started" />
        </View>
      </SwiperFlatList>
      Loader & Error UI
      {isFetching ? (
        <ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
      ) : undefined}
      {isError ? (
        <Text style={[fonts.size_16, { color: colors.red500 }]}>
          Oops! Something went wrong.
        </Text>
      ) : undefined}
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  slide: {
    alignItems: 'center',
    backgroundColor: '#000000',
    height, // Full screen height
    justifyContent: 'center',
    padding: 20,
    width,
  },
  text: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default OnboardingScreen;
