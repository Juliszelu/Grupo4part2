import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false
    };
  }

  componentDidMount() {
    if (
      this.props.postData &&
      this.props.postData.data &&
      this.props.postData.data.likes &&
      auth.currentUser &&
      this.props.postData.data.likes.includes(auth.currentUser.email)
    ) {
      this.setState({ like: true });
    }
  }

  darLike() {
    db.collection('posts')
      .doc(this.props.postData.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then(() => this.setState({ like: true }))
      .catch(e => console.log(e));
  }

  quitarLike() {
    db.collection('posts')
      .doc(this.props.postData.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
      .then(() => this.setState({ like: false }))
      .catch(e => console.log(e));
  }

  render() {
    const data = this.props.postData.data;
    const email = data.email;
    const texto = data.texto;
    const cantidad = data.likes.length;

    return (
      <View style={styles.card}>
        <Text style={styles.owner}>{email}</Text>
        <Text style={styles.description}>{texto}</Text>

        <View style={styles.footer}>
          {this.state.like ? (
            <Pressable style={styles.buttonLike} onPress={() => this.quitarLike()}>
              <Text style={styles.buttonText}>Quitar like</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.buttonLike} onPress={() => this.darLike()}>
              <Text style={styles.buttonText}>Dar like</Text>
            </Pressable>
          )}
          <Text style={styles.likesCount}>{cantidad}</Text>
        </View>
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
    marginBottom: 12
  },
  owner: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4
  },
  description: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 10
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonLike: {
    backgroundColor: '#8C7A6B',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600'
  },
  likesCount: {
    color: '#5E4E3A',
    fontSize: 16,
    fontWeight: '600'
  }
});
