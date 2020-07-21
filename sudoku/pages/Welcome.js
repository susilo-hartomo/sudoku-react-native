import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Button, Text, TextInput, Alert } from 'react-native'
import { Card, Input, Image } from 'react-native-elements'
import { useDispatch } from 'react-redux'

//action redux
import { playerName } from '../redux'

export const Welcome = ({ navigation }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    console.log('name: ', name);
    const submitPlayer = (level) => {
        if (name !== '') {
            dispatch(playerName(name, level))
            navigation.navigate("SudokuBoard")
        }
        Alert.alert('Please Insert Name')
    }

    return (
        <View style={{ flex: 1 }}>
            <Card>
                <Text style={styles.title}>Welcome To Sudoku Game</Text>
                <Image style={styles.image} source={require('../assets/play game.jpg')} />
                <Text style={{justifyContent: 'center', fontWeight: 'bold', fontSize: 18, marginBottom: 4}}>Please input your Name</Text>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    style={styles.input}
                    onChangeText={value => setName(value)}
                />
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 10, textAlign: 'center' }}>Select Level </Text>
                <Button style={{ marginTop: 6 }} onPress={() => {
                    submitPlayer('easy')
                }
                } title={"EASY"} />
                <Button style={{ marginTop: 6 }} onPress={() => {
                    submitPlayer('medium')
                }
                } title={"MEDIUM"} />
                <Button style={{ marginTop: 6 }} onPress={() => {
                    submitPlayer('hard')
                }
                } title={"HARD"} />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "600",
        margin: 8,
        marginBottom: 4,
        textAlign: 'center'
    },
    input: {
        margin: 4,
        marginBottom: 30,
    },
    image: {
        width: 200,
        height: 260,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    }
})
