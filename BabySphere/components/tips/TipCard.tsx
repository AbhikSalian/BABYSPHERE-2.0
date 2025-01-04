import * as React from "react";
import { TouchableOpacity, Text } from "react-native";
import { StyleSheet } from "react-nativescript";
import { Tip } from "./types";

interface TipCardProps {
    tip: Tip;
    onSave: (id: string) => void;
}

export function TipCard({ tip, onSave }: TipCardProps) {
    return (
        <stackLayout style={styles.card}>
            <label style={styles.title}>{tip.title}</label>
            <label style={styles.description}>{tip.description}</label>
            <TouchableOpacity
                style={tip.isSaved ? styles.savedButton : styles.saveButton}
                onPress={() => onSave(tip.id)}
            >
                <Text>{tip.isSaved ? "Saved" : "Save for Later"}</Text>
            </TouchableOpacity>
        </stackLayout>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 8,
        padding: 16,
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        marginBottom: 12,
    },
    saveButton: {
        backgroundColor: "#4CAF50",
        color: "white",
        padding: 8,
        borderRadius: 4,
    },
    savedButton: {
        backgroundColor: "#888888",
        color: "white",
        padding: 8,
        borderRadius: 4,
    },
});
