import React from 'react';
import {TodoView} from './TodoView';
import {useSelector} from 'react-redux';
import {View, StyleSheet, FlatList} from 'react-native';

export const TodoList: React.FC<{navigation: any}> = ({navigation}) => {
  const {taskList} = useSelector((state: any) => state.todo);

  const renderItem = ({item}: any) => (
    <TodoView todo={item} navigation={navigation} />
  );

  return (
    <View style={styles.listContainer}>
      <FlatList data={taskList} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 0.9,
  },
});
