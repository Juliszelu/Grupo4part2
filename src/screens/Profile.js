import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native';
import Post from '../components/Post';
import { auth, db } from '../firebase/config';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: null,
      posteos: [],
      loading: true
    };
  }

  componentDidMount() {
    db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        let usuario = null;
        docs.forEach(doc => {
          usuario = { id: doc.id, data: doc.data() };
        });
        this.setState({ usuario, loading: false });
      });

    db.collection('posts')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        const posteos = [];
        docs.forEach(doc => {
          posteos.push({ id: doc.id, data: doc.data() });
        });
        this.setState({ posteos });
      });
  }

  logout = () => {
    auth.signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(e => console.log(e));
  };

  deletePost = (id) => {
    db.collection('posts').doc(id).delete()
      .catch(e => console.log(e));
  };

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <Text style={styles.title}>Mi perfil</Text>

          {this.state.usuario ? (
            <>
              <Text style={styles.text}>Usuario: {this.state.usuario.data.username}</Text>
              <Text style={styles.text}>Email: {this.state.usuario.data.email}</Text>
            </>
          ) : (
            <Text style={styles.text}>Cargando perfil...</Text>
          )}

          <Text style={styles.title}>Últimos posteos</Text>
          <FlatList
            data={this.state.posteos}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <View style={styles.postWrapper}>
                <Post postData=
                {item} profile={true}
                 />
                <Pressable style={styles.deleteBtn} onPress={() => this.deletePost(item.id)}>
                  <Text style={styles.deleteText}>Borrar</Text>
                </Pressable>
              </View>
            }
            ListEmptyComponent={<Text style={styles.text}>Todavía no tenés posteos.</Text>}
          />
        </View>

        <Pressable onPress={this.logout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Desloguearse</Text>
        </Pressable>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  title: {
    color: "#8C7A6B",
    fontWeight: "700",
    fontSize: 24,
    marginBottom: 12,
    textAlign: "center",
  },

  text: {
    color: "#5A524A",
    fontSize: 15,
    marginBottom: 6,
    textAlign: "center",
  },

  /* --- POSTS DEL PERFIL --- */
  postWrapper: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { height: 1 },
  },

  deleteBtn: {
    alignSelf: "center",
    backgroundColor: "#CBB8A0",      
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 8,
  },

  deleteText: {
    color: "#5A524A",
    fontWeight: "600",
    fontSize: 14,
  },

  /* --- BOTÓN LOGOUT --- */
  logoutBtn: {
    alignSelf: "center",
    backgroundColor: "#8C7A6B",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 12,
    marginVertical: 22,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { height: 2 },
  },

  logoutText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
