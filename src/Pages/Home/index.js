import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Container, Header, AreaTitulo, Dev, Games, AreaBotao, AreaSearch, InputFilmes, ListGenres, ListGames } from './styles';

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import api from '../api/api';

import Card from '../../Components/Card';
import CardGames from '../../Components/CardGames';


import { useNavigation } from '@react-navigation/native';

export default function Home() {

    const [input, setInput] = useState('')
    const [listCategory, setListCategory] = useState([])
    const [listGames, setListGames] = useState([])
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadGenres() {
            try {
                const response = await api.get('genres?page_size=20&key=e01533e174e140bc831c2d2c0f628fb4')
                let list = []
                response.data.results.forEach(item => {
                    list.push({
                        id: item.id,
                        name: item.name
                    })
                });

                setListCategory(list)

            } catch (err) {
                console.log(err);
            }
        }

        async function loadGames() {
            try {
                setLoading(true)
                const response = await api.get('games?page_size=30&key=e01533e174e140bc831c2d2c0f628fb4')
                let gamelist = []
                response.data.results.forEach(item => {
                    gamelist.push({
                        name: item?.name,
                        rating: item?.rating,
                        url: item?.background_image,
                        slug: item?.slug,
                        id: item?.id
                    })
                });

                setListGames(gamelist)
                setLoading(false)

            } catch (err) {
                console.log(err);
            }
        }


        loadGenres()
        loadGames()
    }, [])

    function handleSearch(params) {
        if (input === '') return
        navigation.navigate('Search', { input: input })
        
    }

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#050B18'}}>
                <ActivityIndicator size='large' color='#0E5C88' />
            </View>
        )
    }


    return (
        <Container>
            <Header>
                <AreaTitulo>
                    <Dev>Dev</Dev>
                    <Games>Games</Games>
                </AreaTitulo>

                <AreaBotao>
                    <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                        <Feather name="bookmark" size={24} color="white" />
                    </TouchableOpacity>
                </AreaBotao>
            </Header>

            <AreaSearch>
                <InputFilmes
                    value={input}
                    placeholder='Looking for a game?'
                    placeholderTextColor='white'
                    onChangeText={(text) => setInput(text)}
                    style={{ color: 'white' }}
                />

                <TouchableOpacity style={{ paddingHorizontal: 15, paddingTop: 16 }} onPress={handleSearch}>
                    <AntDesign name="search1" size={24} color="#FF455F" />
                </TouchableOpacity>
            </AreaSearch>

            <ListGenres
                data={listCategory}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (<Card data={item} />)}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />

            <ListGames
                data={listGames}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (<CardGames data={item} />)}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 20 }}>Trending Gaames</Text>
                }
                ListHeaderComponentStyle={{ marginBottom: 12, paddingTop: 25 }}
            />

        </Container>
    );
}
