import React from 'react';
import {clearList} from '../features/todo';
import {logout} from '../features/user';
import {ButtonUI} from './ButtonUI';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';

export const HeaderUI: React.FC<{navigation: any}> = ({navigation}) => {
  const {user} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const clearAllData = () => {
    setTimeout(() => dispatch(logout()), 480);
    dispatch(clearList());
  };

  return (
    <View style={styles.userInfo}>
      <Text style={styles.username}>{`Mr.${user.username}`}</Text>
      <ButtonUI
        title={'logout'}
        body={styles.logoutBody}
        button={styles.logoutButton}
        text={styles.logoutText}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
          clearAllData();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  username: {
    fontWeight: 'bold',
    fontSize: 21,
    alignSelf: 'center',
  },
  userInfo: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  logoutBody: {
    alignSelf: 'center',
    marginLeft: 7,
    marginRight: 7,
    marginTop: 3,
  },
  logoutButton: {
    borderRadius: 14,
    backgroundColor: '#03396c',
    padding: 5,
    width: 45,
  },
  logoutText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
});
