import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/Post';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {

    db.collection('posts').orderBy("createdAt", "desc").onSnapshot(docs => {
      let postsObtenidos = [];

      docs.forEach(doc => {
        postsObtenidos.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      this.setState({
        posts: postsObtenidos,
        loading: false,
      }, () => {
        console.log('Posts en estado:', this.state.posts);
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Últimos posteos</Text>

        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : this.state.posts.length === 0 ? (
          <Text style={styles.empty}>Todavía no hay posts.</Text>
        ) : (
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Post postData={item} />
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  title:{
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },
  empty:{
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 16,
    marginTop: 30,
  },
});
