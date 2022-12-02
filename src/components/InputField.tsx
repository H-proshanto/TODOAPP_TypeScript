import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

export const InputField = ({
  view,
  text,
  setter,
  placeholder,
  onBlur,
}: {
  view: string;
  text: string;
  setter: any;
  placeholder: string;
  onBlur: any;
}) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>{placeholder}</Text>
        <TextInput
          style={styles.inputText}
          placeholder={view === 'read' ? '' : `Enter ${placeholder} Here`}
          onChangeText={setter}
          editable={view === 'read' ? false : true}
          onBlur={onBlur}
          value={text}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 0.2,
  },
  inputText: {
    marginTop: 14,
    marginLeft: 28,
    marginRight: 28,
    borderWidth: 2,
    padding: 7,
    color: 'black',
  },
  inputTitle: {
    marginTop: 28,
    marginLeft: 28,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
