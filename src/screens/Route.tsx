import React from 'react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export const Route: React.FC<{navigation: any}> = ({navigation}) => {
  const {user} = useSelector((state: any) => state.user);

  useEffect(() => {
    setTimeout(selectRoute, 700);
  });

  const selectRoute = () => {
    if (user.id !== null) {
      navigation.reset({
        index: 0,
        routes: [{name: 'DashBoard'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.loader} size={50} color="#e5dfdf" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444444',
  },
  loader: {
    flex: 0.8,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
