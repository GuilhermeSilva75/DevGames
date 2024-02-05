import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
flex: 1;
background-color: #050B18;
padding-left: 14px;
padding-top: 40px;
padding-right: 14px;
`
export const Header = styled.View`
flex-direction: row;
justify-content: space-between;
`

export const AreaTitulo = styled.View`
flex-direction: row;
`

export const Dev = styled.Text`
color: #FFF;
font-size: 28px;
font-weight: bold;
`

export const Games = styled.Text`
color: #FF455F;
font-size: 28px;
font-weight: bold;
`

export const AreaBotao = styled.View`
background-color: #1F2430;
align-items: center;
justify-content: center;
height: 40px;
width: 40px;
border-radius: 20px;
`

export const AreaSearch = styled.View`
flex-direction: row;
align-items: center;
`

export const InputFilmes = styled.TextInput`
background-color: #1F2430;
margin-top: 17px;
height: 45px;
width: 85%;
align-items: center;
padding-left: 8px;
border-radius: 14px;
`

export const ListGenres = styled.FlatList`
height: 70px;
margin-bottom: 10px;
`
export const ListGames = styled.FlatList`
`