import React from 'react';
import {fetchAllTodo} from '../features/todo';
import {useDispatch, useSelector} from 'react-redux';
import {Button, StyleSheet, Text, View} from 'react-native';

export const ErrorUI = () => {
  const errorMessage = useSelector((state: any) => state.todo.error);
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.user.user.id);

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}> {errorMessage} </Text>
      <Button
        title="Retry"
        onPress={() => {
          dispatch(fetchAllTodo(userId));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 20,
    marginBottom: 35,
  },
});
