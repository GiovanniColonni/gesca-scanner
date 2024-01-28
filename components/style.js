import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        margin:5,
    },
    containerHome: {
        flex: 1,
        alignItems: "left",
        justifyContent: "flex-start",
        padding: 20,
    },
    containerHome1: {
        alignItems: "left",
        justifyContent: "flex-start",
        padding: 20,
    },
    input: {
        height: 40,
        width: "100%",
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
    },
    inputError: {
        height: 40,
        width: "100%",
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "red",
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        // Additional styling if needed
    },
    head1: {
        fontSize: 21,
        fontWeight: 'bold',
        marginVertical: 3,
        // Additional styling if needed
    },
    body1: {
        fontSize: 16,
        textAlign: 'center',
        //marginVertical: 10,
        // Additional styling if needed
    },
    label: {
        fontWeight: 'bold',
    },
    value: {
        fontWeight: 'normal',
    },
    // HISTORY
    containerHistory: {
        padding: 20,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    table: {
        width: '100%',
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    codeText: {
        // Styles for the code text
        fontSize: 16,
        padding: 3,
    },
    clickText: {
        // Styles for the clickable text
        fontSize: 16,
        color: 'blue',
    },
});
