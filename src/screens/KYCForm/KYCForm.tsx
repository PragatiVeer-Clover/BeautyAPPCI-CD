import React, { FC } from 'react';
import { View, StyleSheet,Text } from 'react-native';

interface Props {}

const KYCForm: FC<Props> = () => {
  return (
            <View style={styles.container}>
            <Text> Hello Typescript KYCForm</Text>
         </View>
)
};

const styles = StyleSheet.create({
 container:{},
});

export default KYCForm;