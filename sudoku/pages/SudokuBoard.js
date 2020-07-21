import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Dimensions } from 'react-native';
import { Header, Card } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'

//action redux
import { validateValue, changeValue, fetchBoard, onSolve } from '../redux'

export const SudokuBoard = ({ navigation }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchBoard(level))
    }, [])
    const { board, level, originalBoard } = useSelector(state => state)
    console.log('originalBoard: ', originalBoard);

    console.log('board: ', board);
    const onChange = (i, j, value) => {
        dispatch(changeValue(i, j, Number(value)))
    }

    const onSubmit = () => {
        console.log('board submit :',board)
        dispatch(validateValue(board))
        navigation.navigate('Finish')
    }

    return (
        <View style={styles.container}>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'MY SUDOKU GAME', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <Text style={{margin: 6, fontWeight: 'bold', marginStart: 20}}>Level : { level }</Text>
            <View style={styles.listBox}>
                {board.map((e, i) =>
                    <View style={styles.box} key={i}>
                        <View style={styles.listUnit}>
                            {e.map((el, j) => {
                                if (Number(el) != 0) {
                                    return (<Text style={styles.unit_box} key={j}>{el}</Text>)
                                }
                                else {
                                    console.log(board[i][j])
                                    return (<TextInput
                                        key={j}
                                        style={styles.unit_box}
                                        keyboardType='number-pad'
                                        onChangeText={value => onChange(i, j, value)}
                                    />)
                                }
                            }
                            )}
                        </View>
                    </View>
                )}
            </View>
            <Card>
                <Button style={styles.buttonStyle} title={"Submit"} onPress={() => onSubmit()}></Button>
                <Button style={styles.buttonStyle} title={"Solve"} onPress={() => dispatch(onSolve(originalBoard))}></Button>
            </Card>
        </View>
    )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'flex-start',
    },
    listBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 6,
        width: width,
    },
    box: {
        flexDirection: 'column',
        width: (width / 3) - 6,
        height: (width / 3 - 6),
    },
    listUnit: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    unit_box: {
        width: 33,
        height: 33,
        paddingTop: 2,
        borderWidth: .4,
        borderColor: '#f5f5f5',
        borderRadius: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 16,
        backgroundColor: '#fff',
        fontWeight: "700"
    },
    buttonStyle: {
        padding: 8,
        width: width / 4,
    }
});