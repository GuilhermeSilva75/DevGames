import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import useStorage from '../../Storage/useStorage';

export default function CardGames({ data, reloadPage, buttonActive }) {

    const navigation = useNavigation()
    const { deleteItem } = useStorage()

    async function handleDelete() {
        await deleteItem(data);
        if (reloadPage) {
            reloadPage();
        }

    }

    return (
        <TouchableOpacity style={styles.Container} onPress={() => navigation.navigate('Details', { slug: data.slug })}>
            {data.url && data.url != null && (
                <Image
                    source={{ uri: data.url }}
                    style={styles.GameInfo}
                />
            )}
            <View style={styles.AreaInfo}>
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>{data.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <AntDesign name="star" size={24} color="yellow" />
                    <Text style={{ color: 'white' }}>{data.rating}/5</Text>
                </View>
            </View>

            <View style={styles.botaotrash}>
                {buttonActive && (
                    <TouchableOpacity style={styles.botao} onPress={handleDelete}>
                        <Feather name="trash" size={24} color="white" />
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    Container: {
        height: 170,
        width: '100%',
        marginBottom: 15,
        marginTop: 15
    },
    GameInfo: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 6
    },
    AreaInfo: {
        position: 'absolute',
        bottom: 7
    },
    botaotrash: {
        alignItems: 'flex-end',
        position: 'absolute',
        right: 5,
        top: 5
    },
    botao: {
        backgroundColor: "#E72F49",
        padding: 8,
        borderRadius: 25,
        width: 40


    }
})