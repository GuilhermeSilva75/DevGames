import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';

import { Container, AreaHeader, Title } from './styles';

import { useNavigation } from '@react-navigation/native';
import CardGames from '../../Components/CardGames';
import useStorage from '../Storage/useStorage';

import { AntDesign } from '@expo/vector-icons';

export default function Favorites() {

    const navigation = useNavigation()
    const { getItem } = useStorage()
    const [gamelist, setGameList] = useState([])

    useEffect(() => {

        loadGames()
    }, [])

    async function loadGames() {
        const list = await getItem();

        setGameList(list);
    }

    return (
        <Container>
            <AreaHeader>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Title>My Favorites</Title>
            </AreaHeader>

            <FlatList
                data={gamelist}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (<CardGames data={item} reloadPage={loadGames} buttonActive={true}/>)}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
}