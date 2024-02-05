import styled from "styled-components/native";

export const Container = styled.ScrollView`
flex: 1;
background-color: #050B18;

`

export const IconContainer = styled.View`
flex-direction: row;
justify-content: space-between;
padding-left: 10px;
padding-right: 10px;
width: 100%;
position: absolute;
z-index: 99;
margin-bottom: 15px;

`
export const Botao = styled.TouchableOpacity`
background-color: #050B18;
margin-top: 20px;
padding: 8px;
border-radius: 25px;
`
export const BotaoDescription = styled.TouchableOpacity`
background-color: #0E5C88;
padding-left: 10px;
padding-right: 10px;
height: 30px;
align-items: center;
justify-content: center;
border-radius: 6px;
`

export const Titulo = styled.Text`
color: #FFF;
padding-left: 10px;
font-size: 20px;
font-weight: bold;
padding-top: 15px;
`

export const AreaPlataform = styled.View`
flex-direction: row;
flex-wrap: wrap;
`
