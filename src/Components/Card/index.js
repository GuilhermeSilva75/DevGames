import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Card({ data, color }) {

  const navigation = useNavigation()
  return (
    <View style={styles.Container}>
      <TouchableOpacity style={[styles.Botao, {backgroundColor: color ? `${color}` : '#64748B'}]}
      onPress={() => navigation.navigate('Categories', data)}
      >
        <Text style={{color: '#FFF'}}>{data.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Botao: {
    height: 36,
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#64748B',
    marginTop: 18
  }
})