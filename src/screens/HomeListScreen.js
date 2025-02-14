import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';
import HomeItem from '../components/HomeItem';
import { fetchHomes } from '../api/mockData';

const HomeListScreen = ({ navigation }) => {
  const { data, isLoading, error } = useQuery('homes', fetchHomes);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HomeItem
            item={item}
            onPress={() => navigation.navigate('HomeDetail', { home: item })}
          />
        )}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default HomeListScreen;