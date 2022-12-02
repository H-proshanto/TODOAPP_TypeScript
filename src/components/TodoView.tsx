import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetErrorMessage,
  resetStatus,
  toggleCompletion,
} from '../features/todo';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';

export const TodoView = ({todo, navigation}: {todo: any; navigation: any}) => {
  const {
    id,
    title,
    is_completed,
    created_at,
  }: {id: number; title: string; is_completed: boolean; created_at: string} =
    todo;
  const [isMarking, setisMarking] = useState(false);
  const userId = useSelector((state: any) => state.user.user.id);
  const requestStatus = useSelector((state: any) => state.todo.status);
  const error = useSelector((state: any) => state.todo.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (requestStatus === 'toggleError') {
      Alert.alert('An issue occured, Please try again', error, [
        {
          text: 'Okay',
        },
      ]);
      setisMarking(false);
      dispatch(resetStatus());
      dispatch(resetErrorMessage());
    }

    if (requestStatus === 'resolvedToggle') {
      setisMarking(false);
      dispatch(resetStatus());
      dispatch(resetErrorMessage());
    }
  }, [requestStatus]);

  return (
    <View style={styles.todoConatainer}>
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={() => {
          navigation.navigate('TodoForm', {
            view: 'read',
            todo,
          });
        }}>
        <Text
          style={
            is_completed ? styles.completedTaskText : styles.pendingTaskText
          }>
          {title}
        </Text>
      </TouchableOpacity>
      <Text style={styles.timeStamp}>{created_at.slice(0, 10)}</Text>

      {is_completed ? (
        <View style={styles.updateBtn} />
      ) : (
        <TouchableOpacity
          style={styles.updateBtn}
          onPress={() => {
            navigation.navigate('TodoForm', {todo, view: 'update'});
          }}>
          <Image source={require('../icons/edit.png')} />
        </TouchableOpacity>
      )}

      {isMarking ? (
        <ActivityIndicator size={24} color="black" />
      ) : (
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => {
            setisMarking(true);
            dispatch(
              toggleCompletion({taskId: id, status: is_completed, userId}),
            );
          }}>
          {is_completed ? (
            <Image source={require('../icons/checkmark.png')} />
          ) : (
            <></>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 0.8,
    borderRadius: 8,
    padding: 10,
  },
  todoConatainer: {
    margin: 21,
    borderRadius: 15,
    backgroundColor: '#eeeeee',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  checkbox: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: 'orange',
    borderRadius: 12,
  },
  updateBtn: {
    height: 35,
    width: 35,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  timeStamp: {
    alignSelf: 'center',
    fontSize: 10,
    color: 'grey',
    fontStyle: 'italic',
    marginRight: 7,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textAlign: 'left',
  },
  pendingTaskText: {
    textAlign: 'left',
  },
  pending: {},
});
