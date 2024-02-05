import AsyncStorage from "@react-native-async-storage/async-storage";



const useStorage = () => {

    const getItem = async () => {
        try {
            const gamelist = await AsyncStorage.getItem('@game')
            return gamelist && JSON.parse(gamelist) || []
        } catch (error) {
            console.log(error);
            return
        }
    }

    const saveItem = async (data) => {
        let gamelist = await getItem()
        console.log(data);

        let findGame = gamelist.find(item => item.id === data.id)

        if (findGame) {
            return
        }

        gamelist.push(data)
        await AsyncStorage.setItem('@game', JSON.stringify(gamelist))
    }

    const deleteItem = async (data) =>{
        try{
            let gamelist = await getItem();
            let filterlist = gamelist.filter(item => item.id != data.id);
            AsyncStorage.setItem('@game', JSON.stringify(filterlist));
        }catch(err){
            console.log(err);
        }

    }

    return {
        getItem,
        saveItem,
        deleteItem
    }
}

export default useStorage