import React, {useEffect} from 'react';
import {ButtonUI} from '../components/ButtonUI';
import {login, resetStatus} from '../features/user';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {Formik} from 'formik';

export const Home: React.FC<{navigation: any}> = ({navigation}) => {
  const error = useSelector((state: any) => state.user.error);
  const userStatus = useSelector((state: any) => state.user.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userStatus === 'error') {
      Alert.alert('An issue occured', error, [
        {
          text: 'Okay',
        },
      ]);
    }

    if (userStatus === 'resolved') {
      navigation.reset({
        index: 0,
        routes: [{name: 'DashBoard'}],
      });
      dispatch(resetStatus());
    }
  }, [userStatus]);

  const validate: any = (values: {username: string}) => {
    const errors: any = {};

    if (!values.username) {
      errors.username = 'username is required';
    } else if (values.username.length > 5) {
      errors.username = "username can't be larger than 5 characters";
    }

    return errors;
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{username: ''}}
        onSubmit={values => dispatch(login(values.username))}
        validate={validate}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Simple ToDo</Text>
            </View>
            <View style={styles.loginTextContainer}>
              <TextInput
                style={styles.loginInput}
                placeholder="Your Name"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                editable={userStatus === 'running' ? false : true}
              />
              {errors.username ? (
                <Text style={styles.errorMessage}>{errors.username}</Text>
              ) : (
                <></>
              )}
            </View>
            <ButtonUI
              title="Next"
              body={styles.loginContainer}
              button={styles.loginButton}
              text={styles.loginText}
              onPress={errors.username ? null : handleSubmit}
            />
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 0.2,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: 42,
  },
  loginTextContainer: {
    flex: 0.2,
    marginTop: 21,
    marginBottom: 7,
  },
  loginInput: {
    marginTop: 35,
    marginLeft: 28,
    marginRight: 28,
    borderWidth: 2,
    padding: 7,
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    padding: 7,
    marginLeft: 21,
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: 7,
  },
  loginButton: {
    backgroundColor: 'purple',
    paddingLeft: 100,
    paddingRight: 100,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    padding: 5,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
