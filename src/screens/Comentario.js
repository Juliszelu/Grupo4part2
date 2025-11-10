import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

export default class Comentario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentario: "",
      listacomentarios: this.props.route.params.data.data.comentarios
    };
  }

  comentar() {
    let info = {
      texto: this.state.comentario,
      user: auth.currentUser.email
    };
    db.collection('posts')
      .doc(this.props.route.params.data.id)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion(info)
      })
      .then(() => {
        let nuevaLista = [...this.state.listacomentarios, info];
        this.setState({ comentario: "", listacomentarios: nuevaLista });
      })
      .catch(e => console.log(e));
  }

  render() {
    let data = this.props.route.params.data;

    return (
      <View style={styles.card}>
        <Text style={styles.owner}>{data.data.email}</Text>
        <Text style={styles.description}>Posteo:{data.data.texto}</Text>

        <View style={styles.footer}>
          <Text Castyle={styles.likesCount}>Cantidad de likes: {data.data.likes.length}</Text>
        </View>

        {this.state.listacomentarios.length == 0 ? (
          <Text style={styles.noComments}>No hay ningún comentario</Text>
        ) : (
          <FlatList
            data={this.state.listacomentarios}
            renderItem={({ item }) => (
              <View style={styles.commentBox}>
                <Text style={styles.commentUser}>{item.user}</Text>
                <Text style={styles.commentText}>{item.texto}</Text>
              </View>
            )}
          />
        )}

        <View style={styles.commentSection}>
          <TextInput
            style={styles.input}
            placeholder='Comentario'
            onChangeText={text => this.setState({ comentario: text })}
            value={this.state.comentario}
          />

          <Pressable style={styles.buttonLike} onPress={() => this.comentar()}>
            <Text style={styles.buttonText}>Comentar</Text>
          </Pressable>
          <Pressable style={styles.buttonSecondary} onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.buttonSecondaryText}>Volver a Home</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { height: 2 },
  },

  owner: {
    fontSize: 17,
    fontWeight: "700",
    color: "#8C7A6B",
    marginBottom: 6
  },

  description: {
    fontSize: 15,
    color: "#6A5F55",
    marginBottom: 14,
    backgroundColor: "#F9F3EC",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E8DCD1"
  },

  footer: {
    flexDirection: "row",
    marginBottom: 16
  },

  likesCount: {
    fontSize: 15,
    fontWeight: "600",
    color: "#7F6A5C",
  },

  noComments: {
    marginTop: 10,
    fontSize: 14,
    color: "#8C7A6B",
    fontStyle: "italic"
  },


  commentBox: {
    padding: 12,
    backgroundColor: "#FAF4EE",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6D8CC",
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { height: 1 },
  },

  commentUser: {
    fontWeight: "700",
    fontSize: 14,
    color: "#8C7A6B",
    marginBottom: 3
  },

  commentText: {
    fontSize: 14,
    color: "#5A524A",
    lineHeight: 18
  },


  commentSection: {
    marginTop: 22,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D4C4B5",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#FFF",
    marginBottom: 12,
    fontSize: 15
  },

  buttonLike: {
    backgroundColor: "#8C7A6B",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { height: 2 },
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  },

  buttonSecondary: {
    backgroundColor: "#E7D8C9",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },

  buttonSecondaryText: {
    color: "#6A5747",
    fontSize: 16,
    fontWeight: "600"
  }
});