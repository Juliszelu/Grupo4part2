import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
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

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <View style={styles.profileCard}>
            <Text style={styles.profileTitle}>Mi perfil</Text>
            {this.state.usuario ? (
              <>
                <Text style={styles.profileLine}>Usuario: <Text style={styles.profileData}>{this.state.usuario.data.username}</Text></Text>
                <Text style={styles.profileLine}>Email: <Text style={styles.profileData}>{this.state.usuario.data.email}</Text></Text>
              </>
            ) : (
              <Text style={styles.profileLine}>Cargando perfil...</Text>
            )}
          </View>
          <View style={styles.sectionDivider} />

          <Text style={styles.postsTitle}>Últimos posteos</Text>

          <FlatList
            data={this.state.posteos}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <View style={styles.postWrapper}>
                <Post postData={item} profile={true} />
              </View>
            }
            ListEmptyComponent={<Text style={styles.emptyText}>Todavía no tenés posteos.</Text>}
          />
        </View>

        <Pressable onPress={this.logout} style={styles.logoutBtn}>
          <FontAwesome5 name="sign-out-alt" size={16} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Desloguearse</Text>
        </Pressable>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  // Fondo
  container: {
    flex: 1,
    backgroundColor: '#FAF9F7',
    paddingTop: 28,
    paddingHorizontal: 18,
  },

  /* --------- PERFIL --------- */
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EDE6DD',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  profileTitle: {
    color: '#8C7A6B',
    fontWeight: '800',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 8,
  },
  profileLine: {
    color: '#6B6259',
    fontSize: 15.5,
    textAlign: 'center',
    marginBottom: 6,
  },
  profileData: {
    color: '#4E443B',
    fontWeight: '700',
  },

  /* ------ SEPARADOR ENTRE SECCIONES ------ */
  sectionDivider: {
    height: 16,
  },

  /* --------- LISTA DE POSTEOS --------- */
  postsTitle: {
    color: '#8C7A6B',
    fontWeight: '800',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 12,
  },
  postWrapper: {
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFE7DE',
    paddingVertical: 2,
  },
  emptyText: {
    color: '#8C7A6B',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 15,
  },

  /* --------- BOTÓN LOGOUT --------- */
  logoutBtn: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8C7A6B',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginVertical: 16,

  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
