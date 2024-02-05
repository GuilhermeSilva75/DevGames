import { View } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function ModalDesc({ CloseModal, desc }) {
    return (
        <View style={styles.Container}>
            <View style={styles.AreaHeader}>
                <TouchableOpacity style={styles.Botao} onPress={CloseModal}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>

                <Text style={styles.TitiloDesc}>Descripition</Text>
            </View>

            <View style={{paddingHorizontal: 10, marginTop: 20}}>
                <Text style={{ color: 'white' }}>{desc}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#0F172A'
    },
    AreaHeader: {
        marginTop: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        gap: 90,
        alignItems: 'center'

    },
    Botao: {
        backgroundColor: '#050B18',
        padding: 8,
        borderRadius: 20,
        width: 40,
        height: 40
    },
    TitiloDesc: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})