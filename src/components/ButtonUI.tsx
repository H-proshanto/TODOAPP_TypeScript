import React from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

export const ButtonUI = ({
  title,
  onPress,
  body,
  button,
  text,
}: {
  title?: string;
  onPress?: any;
  body?: object;
  button?: object;
  text?: object;
}) => {
  const isLoading = useSelector(
    (state: any) =>
      state.todo.status !== 'idle' || state.user.status !== 'idle',
  );

  return (
    <View style={body || styles.body}>
      <TouchableOpacity disabled={isLoading} onPress={() => onPress()}>
        <View style={button || styles.button}>
          {isLoading &&
          title !== 'Create New' &&
          title !== 'logout' &&
          title !== 'Edit' ? (
            <ActivityIndicator
              style={title === 'Next' ? styles.loginLoader : styles.text}
              color="#ffffff"
            />
          ) : (
            <Text style={text || styles.text}>{title}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    marginTop: 21,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 14,
    width: 100,
  },
  text: {
    color: 'white',
    fontSize: 14,
    padding: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginLoader: {
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 6,
    paddingLeft: 11,
    paddingRight: 11,
  },
});
