import React, { useEffect, useState } from 'react';
import { ScrollView, Image, Dimensions, StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Modal } from 'react-native';
import ModalDesc from './Modal';

import useStorage from '../../Storage/useStorage';

import { useRoute } from '@react-navigation/native';

import { IconContainer, Container, Botao, BotaoDescription, AreaPlataform, Titulo } from './styles';

import api from '../api/api';
import Card from '../../Components/Card';

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { FontAwesome } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native'


const windowWidth = Dimensions.get('window').width

export default function Details() {

  const route = useRoute()
  const [gamelist, setGameList] = useState([])
  const navigation = useNavigation()
  const [Modalvisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(true)


  const { saveItem } = useStorage()


  useEffect(() => {
    async function fetchgames() {
      setLoading(true)
      let genresList, platformList, storeList = []
      try {
        const response = await api.get(`games/${route.params.slug}?page_size=5&key=e01533e174e140bc831c2d2c0f628fb4`)

        genresList = response.data.genres.map((item) => ({
          id: item.id,
          name: item.name
        }))

        platformList = response.data.platforms.map((item) => ({
          id: item.platform.id,
          name: item.platform.name
        }))

        storeList = response.data.stores.map((item) => ({
          id: item.store.id,
          name: item.store.name
        }))

        let aditionalImage = response.data.background_image_additional ? response.data.background_image_additional : '';
        setGameList({
          name: response.data.name,
          id: response.data.id,
          rating: response.data.rating,
          descripition: response.data.description_raw,
          background: response.data.background_image,
          backgroundAdditional: aditionalImage,
          genres: genresList,
          platform: platformList,
          stores: storeList
        })

        setLoading(false)

      } catch (err) {
        console.log(err);

      }
    }

    fetchgames()
  }, [])

  function handleCloseModal() {
    setModalVisible(false)
  }


  function handleSave() {
    try {
      if (gamelist) {
        const newData = {
          name: gamelist.name,
          rating: gamelist.rating,
          url: gamelist.background,
          slug: route.params.slug,
          id: gamelist.id
        }
        saveItem(newData);
      }
    } catch (err) {
      console.log('Deu erro!');
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#050B18' }}>
        <ActivityIndicator size='large' color='#0E5C88' />
      </View>
    )
  }

  return (
    <Container>


      <IconContainer>
        <Botao onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={30} color="white" />
        </Botao>

        <Botao onPress={handleSave}>
          <Feather name="bookmark" size={30} color="white" />
        </Botao>
      </IconContainer>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }}>
        {gamelist && (
          <View style={[styles.ScrollImage, {
            width: gamelist.backgroundAdditional ? windowWidth - 50 : windowWidth
          }]}>
            <Image
              source={{ uri: gamelist.background }}
              style={styles.image}
            />
          </View>
        )}

        {gamelist && gamelist.backgroundAdditional && (

          <View style={styles.ScrollImage}>
            <Image
              source={{ uri: gamelist.backgroundAdditional }}
              style={styles.image}
            />
          </View>

        )}
      </ScrollView>

      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25 }}>
          <FontAwesome name="star" size={24} color="yellow" />
          <Text style={{ color: 'white', paddingLeft: 5 }}>{gamelist.rating}/5</Text>
        </View>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, paddingTop: 5, paddingBottom: 25 }}>{gamelist.name}</Text>
      </View>

      <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: 20, fontWeight: 'bold' }}>Genres</Text>
      <FlatList
        data={gamelist.genres}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (<Card data={item} />)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 10, paddingBottom: 25 }}
      />
      <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: 20, fontWeight: 'bold' }}>Descripition</Text>
      <View>
        <Text style={{ color: 'white', paddingHorizontal: 10, paddingBottom: 6 }} numberOfLines={5}>{gamelist.descripition}</Text>

        <BotaoDescription onPress={() => setModalVisible(true)}>
          <Text style={{ color: 'white' }}>Read Full Descripition</Text>
        </BotaoDescription>
      </View>

      <Titulo>Platform</Titulo>
      <AreaPlataform>
        {gamelist && gamelist.platform && (
          gamelist.platform.map((item) => (
            <View key={item.id} style={{ paddingLeft: 10 }}>
              <Card data={item} color='#0F172A' />
            </View>
          ))
        )}
      </AreaPlataform>

      <Titulo>Stores</Titulo>
      <AreaPlataform>
        {gamelist && gamelist.stores && (
          gamelist.stores.map((item) => (
            <View key={item.id} style={{ paddingLeft: 10 }}>
              <Card data={item} color='#0F172A' />
            </View>
          ))
        )}
      </AreaPlataform>

      <Modal visible={Modalvisible} animationType='fade'>
        <ModalDesc CloseModal={handleCloseModal} desc={gamelist.descripition} />
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  ScrollImage: {
    width: windowWidth - 30,
    height: 240
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
})