import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native';
import Post from '../components/Post';
import { auth, db } from '../firebase/config';

export default class Profile extends Component {
  constructor(props){
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

  renderItem = ({ item }) => (
    <View style={styles.postWrapper}>
      <Post postData={item} />
      <Pressable style={styles.deleteBtn} onPress={() => this.deletePost(item.id)}>
        <Text style={styles.deleteText}>Borrar</Text>
      </Pressable>
    </View>
  );

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
            renderItem={this.renderItem}
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
  container: { padding: 16 },
  title: { color: 'black', fontWeight: 'bold', fontSize: 18, marginBottom: 8, marginTop: 8 },
  text: { color: 'black', marginBottom: 4 },

  postWrapper: { marginBottom: 12 },

  deleteBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#8b5cf6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 6
  },
  deleteText: { color: '#fff', fontWeight: 'bold' },

  logoutBtn: {
    alignSelf: 'center',
    backgroundColor: '#dc2626',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 16
  },
  logoutText: { color: '#fff', fontWeight: 'bold' }
});
