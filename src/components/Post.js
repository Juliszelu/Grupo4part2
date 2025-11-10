import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { FontAwesome5 } from '@expo/vector-icons';


export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false
    };
  }

  componentDidMount() {
    if (this.props.postData.data.likes.includes(auth.currentUser.email)) {
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

  comentar() {
    this.props.navegacion.navigate('Comentario', { data: this.props.postData });
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
          <View style={styles.likeRow}>
            {this.state.like ? (
              <Pressable style={[styles.buttonBase, styles.buttonFilled]} onPress={() => this.quitarLike()}>
                <Text style={[styles.buttonTextFilled]}>Quitar like</Text>
              </Pressable>
            ) : (
              <Pressable style={[styles.buttonBase, styles.buttonFilled]} onPress={() => this.darLike()}>
                <Text style={[styles.buttonTextFilled]}>Dar like</Text>
              </Pressable>
            )}
            <Text style={styles.likesPill}>{cantidad}</Text>
          </View>

          {this.props.profile !== true ? (
            <Pressable style={styles.commentButtonOutline} onPress={() => this.comentar()}>
              <FontAwesome5 name="comment-dots" size={15} color="#7A6555" style={{ marginRight: 8 }} />
              <Text style={styles.commentButtonOutlineText}>Comentar</Text>
            </Pressable>

          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#ECE7E1',
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  owner: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2B2621',
    marginBottom: 6,
  },
  description: {
    fontSize: 15.5,
    color: '#4B463F',
    lineHeight: 22,
    marginBottom: 14,
  },

  footer: {
    flexDirection: 'column',
    gap: 10,
  },

  likeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Botones base
  buttonBase: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Estilo botón lleno (like)
  buttonFilled: {
    backgroundColor: '#8C7A6B',
  },
  buttonTextFilled: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14.5,
    letterSpacing: 0.2,
  },

  // Estilo botón contorno (comentar)
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#8C7A6B',
  },
  buttonTextOutline: {
    color: '#8C7A6B',
    fontWeight: '700',
    fontSize: 14.5,
  },

  // contador al lado del like
  likesPill: {
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    color: '#7B695A',
    fontWeight: '700',
    borderWidth: 1,
    borderColor: '#E8DCD0',
  },
  commentButtonOutline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAF9F7",     
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.6,
    borderColor: "#B8A497",        
    width: "100%",
    marginTop: 12,
  },

  commentButtonOutlineText: {
    color: "#7A6555",              
    fontSize: 16,
    fontWeight: "700",
  },


});
