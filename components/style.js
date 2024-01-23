import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    containerHome: {
        flex: 1,
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
        //marginVertical: 10,
        // Additional styling if needed
    },
    label: {
        fontWeight: 'bold',
    },
    value: {
        fontWeight: 'normal',
    },
});
