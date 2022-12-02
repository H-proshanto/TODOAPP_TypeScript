import React, {useEffect} from 'react';
import {ButtonUI} from './ButtonUI';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Keyboard, StyleSheet, View} from 'react-native';
import {
  resetErrorMessage,
  resetStatus,
  uploadUpdatedTask,
  uploadTask,
  deleteTask,
} from '../features/todo';

export const ReadOnlyViewBtns: React.FC<{
  navigation: any;
  view: string;
  status: boolean;
  taskId: number;
  title: string;
  description: string;
}> = ({navigation, view, status, taskId, title, description}) => {
  const userId = useSelector((state: any) => state.user.user.id);
  const dispatch = useDispatch();
  const requestStatus = useSelector((state: any) => state.todo.status);
  const error = useSelector((state: any) => state.todo.error);

  useEffect(() => {
    if (requestStatus === 'error') {
      Alert.alert('An issue occured', error, [
        {
          text: 'Okay',
        },
      ]);
      dispatch(resetStatus());
      dispatch(resetErrorMessage());
    }

    if (requestStatus === 'resolved') {
      navigation.pop();
      setTimeout(() => dispatch(resetStatus()), 200);
    }
  }, [requestStatus]);

  const isValidTitle = () => {
    if (title === '') {
      return false;
    }

    return true;
  };

  const confimationWindow = () => {
    Alert.alert('Are you sure you want to delete this task', '', [
      {
        text: 'Confirm',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteTask({taskId, userId}));
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  };

  return (
    <>
      {view === 'read' ? (
        <View style={styles.buttonContainer}>
          {status ? (
            <></>
          ) : (
            <ButtonUI
              title={'Edit'}
              onPress={() => {
                console.log(taskId);
                navigation.navigate('TodoForm', {taskId, view: 'update'});
              }}
            />
          )}
          <ButtonUI
            title={'Delete'}
            button={styles.deleteButton}
            onPress={() => {
              confimationWindow();
            }}
          />
        </View>
      ) : view === 'update' ? (
        <View style={styles.buttonContainer}>
          <ButtonUI
            title={'Update'}
            onPress={() => {
              if (!isValidTitle()) {
                return;
              }
              dispatch(uploadUpdatedTask({userId, taskId, title, description}));
              Keyboard.dismiss();
            }}
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <ButtonUI
            title={'Create'}
            onPress={() => {
              if (!isValidTitle()) {
                return;
              }

              Keyboard.dismiss();
              dispatch(uploadTask({userId, title, description}));
            }}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0.7,
    marginTop: 35,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  deleteButton: {
    backgroundColor: 'crimson',
    borderRadius: 14,
    width: 100,
  },
});
