import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { FontAwesome5 } from '@expo/vector-icons';

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
        <Text style={styles.description}>Posteo: {data.data.texto}</Text>

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
            <View style={styles.buttonPrimaryContent}>
              <FontAwesome5 name="comment-dots" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.buttonText}>Comentar</Text>
            </View>
          </Pressable>
          <Pressable style={styles.buttonSecondary} onPress={() => this.props.navigation.navigate('Home')}>
            <View style={styles.buttonSecondaryContent}>
              <FontAwesome5 name="arrow-left" size={16} color="#6A5747" style={{ marginRight: 8 }} />
              <Text style={styles.buttonSecondaryText}>Volver a Home</Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // CARD 
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ECE4DB",
  },

  // CABECERA DEL POST
  owner: {
    fontSize: 18,
    fontWeight: "700",
    color: "#7E6A5A",
    marginBottom: 8,
  },

  // TEXTO DEL POST
  description: {
    fontSize: 15.5,
    color: "#52463C",
    lineHeight: 22,
    padding: 12,
    backgroundColor: "#FAF6F1",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EADFD3",
    marginBottom: 16,
  },

  // (likes, etc.)
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  likesCount: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 13,
    fontWeight: "700",
    color: "#6D5B4D",
    backgroundColor: "#F2E7DB",
    borderRadius: 999,
  },

  // ESTADO SIN COMENTARIOS
  noComments: {
    marginTop: 6,
    marginBottom: 8,
    fontSize: 14,
    color: "#8C7A6B",
    fontStyle: "italic",
  },

  // ITEM DE COMENTARIO
  commentBox: {
    padding: 12,
    backgroundColor: "#FFFDFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE3D8",
    marginVertical: 7,
  },

  commentUser: {
    fontWeight: "700",
    fontSize: 14,
    color: "#7E6A5A",
    marginBottom: 2,
  },

  commentText: {
    fontSize: 14.5,
    color: "#4A4037",
    lineHeight: 20,
  },

  // SECCIÓN INPUT + BOTONES
  commentSection: {
    marginTop: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D8CABB",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
    fontSize: 15.5,
    marginBottom: 12,
  },

  // BOTÓN PRINCIPAL
  buttonLike: {
    backgroundColor: "#8C7A6B",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  // Contenido del botón principal (icono + texto)
  buttonPrimaryContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  // BOTÓN SECUNDARIO (volver)
  buttonSecondary: {
    backgroundColor: "#F0E6DA",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#E4D8CC",
  },

  buttonSecondaryText: {
    color: "#6A5747",
    fontSize: 16,
    fontWeight: "700",
  },

  buttonSecondaryContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }
});
