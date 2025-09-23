/* eslint-disable unicorn/consistent-function-scoping */
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

import { useUser } from '@/hooks';
import { useTheme } from '@/theme';

import { SafeScreen } from '@/components/templates';

const { width, height } = Dimensions.get('window');

function OnboardingScreen() {
  const { useFetchOneQuery } = useUser();
  const { colors, gutters, layout, fonts } = useTheme();

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
    // Navigate to Home or Auth flow
    console.log('✅ Finished onboarding');
  };

  return (
    <SafeScreen
      isError={fetchOneUserQuery.isError}
      onResetError={handleResetError}
    >
      <SwiperFlatList
        showPagination
        paginationActiveColor={colors.red500}
        paginationDefaultColor={colors.gray200}
        paginationStyleItem={{ borderRadius: 5, height: 10, width: 10 }}
      >
        {/* Slide 1 */}
        <View style={[styles.slide]}>
          <Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>
            Welcome to React Native BeautySnap
          </Text>
        </View>

        {/* Slide 2 */}
        <View style={[styles.slide]}>
          <Text style={styles.text}>🔵 Splash Screen 2</Text>
        </View>

        {/* Slide 3 */}
        <View style={[styles.slide]}>
          <Text style={styles.text}>🟣 Splash Screen 3</Text>
          <Button onPress={finishOnboarding} title="Get Started" />
        </View>
      </SwiperFlatList>

      {/* Loader & Error UI
      {isFetching && (
        <ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
      )}
      {isError && (
        <Text style={[fonts.size_16, { color: colors.red500 }]}>
          Oops! Something went wrong.
        </Text>
      )} */}
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
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default OnboardingScreen;
