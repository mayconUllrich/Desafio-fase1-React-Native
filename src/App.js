import React, { useState, useEffect } from "react";
import api from "./services/api";


import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
    api
      .get('repositories')
      .then(response => {
        setRepositories(response.data)
      })
    },[])
    
    
    async function handleLikeRepository(id) {
      // Implement "Like Repository" functionality
      
      //chama a rota
      const response = await api
        .post(`repositories/${id}/like`)

      // Pega a resposta da rota
      const likedRepository = response.data

      // Atualiza os repositories
      // esse map faz um laço na array e aumenta somente o repository que o id = ao id do parametro handleLikeRepository
      // Ele modifica uma informação e retorna a array.
      const repositoriesUpdated = repositories.map(repository => {
        if (repository.id === id) { // identifica qual id recebeu o lile
          return likedRepository  // retorna ropositorio atualizados(um like a mais)
        } else {
          return repository // retorna o mesmo repositorio
        }
      })

      //Atualiza os repositories
      setRepositories(repositoriesUpdated)
      
  }

  

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <SafeAreaView style={styles.container}>
        <FlatList style={styles.repositoryContainer}
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (

            <View>
              // Title
              <Text style={styles.repository}>{repository.title}</Text>

              // Techs
              <View style={styles.techsContainer}>
                {repository.techs.map(tech => (
                  <Text key={tech} style={styles.tech}>
                    {repository.techs}
                  </Text>
                ))}
              </View>

              // Look likes
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtida{repository.likes > 1 ? 's' : ''}
                </Text>
              </View>

              // Add likes
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
