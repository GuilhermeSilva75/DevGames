import { useState, useEffect } from 'react';
import { Container, AreaHeader, Title } from './style';
import { TouchableOpacity, FlatList, View, ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import api from '../api/api';
import CardGames from '../../Components/CardGames';

import { useRoute } from '@react-navigation/native';

export default function Categories() {

    const navigation = useNavigation()
    const route = useRoute()
    const [listGames, setListGames] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        try {
            setLoading(true)
            async function loadGames() {
                const response = await api.get(`games?page_size=5&key=e01533e174e140bc831c2d2c0f628fb4&genres=${route.params.id}`)
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
            }
            loadGames()
        } catch (error) {
            console.log(error);
        }
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
            <AreaHeader>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Title>{route.params.name}</Title>
            </AreaHeader>

            <FlatList
                data={listGames}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (<CardGames data={item} />)}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
}