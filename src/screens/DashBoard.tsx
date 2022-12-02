import React, {useEffect, useState} from 'react';
import {ButtonUI} from '../components/ButtonUI';
import {TodoList} from '../components/TodoList';
import {ErrorUI} from '../components/ErrorUI';
import {fetchAllTodo, resetStatus} from '../features/todo';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

export const DashBoard = ({navigation}: {navigation: any}) => {
  const requestStatus = useSelector((state: any) => state.todo.status);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state: any) => state.user.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTodo(userId));
  }, []);

  useEffect(() => {
    if (requestStatus === 'resolvedFetchAllTodo') {
      dispatch(resetStatus());
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [requestStatus]);

  if (requestStatus === 'error') {
    return <ErrorUI />;
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={49} style={styles.loader} color="#89CFF0" />
      ) : (
        <>
          <View style={styles.dashboard}>
            <Text style={styles.dashboardText}>My ToDos</Text>
            <View style={styles.CreateTodoFormButton}>
              <ButtonUI
                title={'Create New'}
                button={styles.dashboardButton}
                text={styles.dashboardBtnText}
                onPress={() => {
                  navigation.navigate('TodoForm');
                }}
              />
            </View>
          </View>
          <TodoList navigation={navigation} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dashboard: {
    flex: 0.1,
    flexDirection: 'row',
  },
  CreateTodoFormButton: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginRight: 7,
  },
  dashboardText: {
    marginLeft: 7,
    fontWeight: 'bold',
    fontSize: 21,
    marginTop: 21,
  },
  loader: {
    marginTop: 91,
    alignSelf: 'center',
  },
  dashboardButton: {
    backgroundColor: 'white',
    width: 100,
  },
  dashboardBtnText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'right',
    textDecorationLine: 'underline',
    marginRight: 7,
  },
});
