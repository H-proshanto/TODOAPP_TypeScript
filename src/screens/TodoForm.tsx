import React, {useEffect} from 'react';
import {InputField} from '../components/InputField';
import {ReadOnlyViewBtns} from '../components/ReadOnlyViewBtns';
import {useSelector} from 'react-redux';
import {StyleSheet, View, ScrollView, Text, Alert} from 'react-native';
import {Formik} from 'formik';

export const TodoForm: React.FC<{
  navigation: any;
  route: any;
}> = ({navigation, route}) => {
  const requestError = useSelector((state: any) => state.todo.error);
  const todo = route.params?.todo;
  const taskId = todo?.id || route.params.taskId;
  const view = route.params?.view;
  const status = todo?.is_completed;
  console.log(taskId);

  useEffect(() => {
    if (requestError.length) {
      Alert.alert('An issue occured', requestError, [
        {
          text: 'Okay',
        },
      ]);
    }
  }, [requestError]);

  const validate: any = (values: {title: string}) => {
    const errors: {title: string} = {title: ''};

    if (!values.title) {
      errors.title = 'Title is required';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{
        title: `${todo?.title || ''}`,
        description: `${todo?.description || ''}`,
      }}
      onSubmit={() => console.log('fired')}
      validate={validate}>
      {({handleChange, handleBlur, values, errors}) => (
        <View style={styles.container}>
          <ScrollView>
            <InputField
              view={view}
              text={values.title}
              setter={handleChange('title')}
              onBlur={handleBlur('title')}
              placeholder="Title"
            />
            {errors.title ? (
              <Text style={styles.errorMessage}>{errors.title}</Text>
            ) : (
              <></>
            )}
            <InputField
              view={view}
              text={values.description}
              setter={handleChange('description')}
              onBlur={handleBlur('description')}
              placeholder="Description"
            />
          </ScrollView>
          <ScrollView>
            <ReadOnlyViewBtns
              view={view}
              status={status}
              navigation={navigation}
              taskId={taskId}
              title={values.title}
              description={values.description}
            />
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 28,
    marginTop: 14,
  },
});
