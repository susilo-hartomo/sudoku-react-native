import React from 'react'
import { View, Button, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Image } from 'react-native-elements'

//action redux
import { fetchBoard } from '../redux'

//picture

export const Finish = ({ navigation }) => {
    const dispatch = useDispatch()
    const { playerName, status, level } = useSelector(state => state)
    console.log('status: ', status);

    if (status === 'unsolved' || status === 'broken') {
        return (
            <View>
                <Card>
                    <Image style={styles.image} source={require('../assets/play again.png')} />
                    <Text style={{ fontSize: 20, fontWeight: '600', textAlign: "center", margin: 10 }}>Sorry</Text>
                    <Text style={{ marginTop: 10, fontSize: 16, fontWeight: '400' }}>Player: {playerName}</Text>
                    <Text style={{ margin: 8 }}>Status: Your answer is not corect</Text>
                    <Button onPress={() => {
                        dispatch(fetchBoard(level))
                        navigation.navigate('SudokuBoard')
                    }}
                        title={'Play Again'} />
                </Card>
            </View>
        )
    }
    else {
        return (
            <View>
                < Card >
                    <Text style={{ fontSize: 20, fontWeight: '600', textAlign: "center", margin: 10 }}>Congratulation</Text>
                    <Image style={styles.image} source={require('../assets/winner.png')} />
                    <Text style={{ marginTop: 10, fontSize: 16, fontWeight: '400' }}>Player : {playerName}</Text>
                    <Text style={{ marginTop: 8, marginBottom: 8 }}>Status : {status}</Text>
                    <Button onPress={() => {
                        dispatch(fetchBoard(level))
                        navigation.navigate('SudokuBoard')
                    }}
                        title={'Play Again'} />
                </ Card>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 260, 
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: 20
    }
})