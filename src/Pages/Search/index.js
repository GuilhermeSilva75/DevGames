import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';

import { useRoute } from '@react-navigation/native';

import { Container } from './styles';

import api from '../api/api';
import CardGames from '../../Components/CardGames';

export default function Search() {

    const [listGames, setListGames] = useState([])
    const routes = useRoute()
    const [errorMessage, setErrorMessage] = useState('Não encontramos um jogo com esse nome...');
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(true)
        async function loadGames(params) {
            try {
                const response = await api.get(`games?search=${routes.params.input}&key=e01533e174e140bc831c2d2c0f628fb4`);


                if (response.data.results.length === 0) {
                    setErrorMessage('Não encontramos um jogo com esse nome...');
                    console.log('Nenhum jogo encontrado');
                    return;
                }

                let list = []
                response.data.results.forEach(item => {
                    list.push({
                        name: item.name,
                        id: item.id,
                        rating: item.rating,
                        url: item.background_image,
                        slug: item?.slug,
                    })
                    setListGames(list)
                    setErrorMessage('')
                    setLoading(false)
                });
            } catch (error) {
                console.log(error);
            }
        }
        loadGames()
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#050B18' }}>
                <ActivityIndicator size='large' color='#0E5C88' />
            </View>
        )
    }
    return (
        <Container>

            {errorMessage && (
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 13 }}>Não encontramos um jogo com esse nome...</Text>
            )}
            <FlatList
                data={listGames}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (<CardGames data={item} />)}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
}