import { SafeScreen } from '@/components/templates';
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useUser } from '@/hooks';
import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/atoms';

function LoginWithMobile() {
  const { useFetchOneQuery } = useUser();
  const { colors, fonts, gutters, layout } = useTheme();
  const [currentId, setCurrentId] = useState(-1);

  const { isError, isFetching } = useQuery({
    queryFn: () => Promise.resolve(true),
    queryKey: ['startup'],
  });

  const fetchOneUserQuery = useFetchOneQuery(currentId);
  const handleResetError = () => {
    void fetchOneUserQuery.refetch();
  };

  return (
    <SafeScreen
      isError={fetchOneUserQuery.isError}
      onResetError={handleResetError}
      style={{ backgroundColor: colors.black500 }}
    >
      <View
        style={[layout.justifyCenter, layout.itemsCenter, gutters.margin_16]}
      >
        <Text style={[fonts.bold, fonts.size_24, { color: colors.gray400 }]}>
          Login With Mobile Phone
        </Text>
        
        <View style={[gutters.marginTop_24, gutters.gap_16]}>
         
          <Button
            title="Secondary Button"
            onPress={() => console.log('Secondary pressed')}
            variant="secondary"
            size="medium"
          />
          
          <Button
            title="Outline Button"
            onPress={() => console.log('Outline pressed')}
            variant="outline"
            size="small"
          />
        </View>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default LoginWithMobile;
