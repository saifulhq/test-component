/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerColumn: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
    },
    containerRow: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
    },
    column: {
        flexDirection: 'column',
        padding: 5,
    },
    row: {
        flexDirection: 'row',
        padding: 5,
    },
    none: {

    },
    tinyLogo: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    smallLogo: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    bold: {
        fontWeight: 'bold',
    },
    small: {
        fontSize: 12,
    }, gray: {
        color: 'gray',
    },
    font16: {
        fontSize: 16,
    },
    font14: {
        fontSize: 14,
    },
    font12: {
        fontSize: 12,
    },
    center: {
        alignItems: 'center',
    },
    blur: {
        opacity: 0.5,
    },
});

export default styles;
