import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default class Post extends Component {
    
    agregarcomentario() {
        this.props.navigation.navigate('Comentario'); 
    }

  render() {
    const { postData } = this.props;
    console.log(postData)
    return (
      <View style={styles.card}>
        <Text style={styles.owner}>{postData.data.email}</Text>
        <Text style={styles.description}>{postData.data.text}</Text>
        <Text>
        cantidad de likes: {postData.data.likes.length}</Text>

        <Pressable 
          onPress={() => this.agregarcomentario()}
        >
          <Text style={styles.buttonText}>Comentar</Text>
        </Pressable>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  owner: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: '#374151',
  },
});
