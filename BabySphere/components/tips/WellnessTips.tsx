import * as React from "react";
import { useState, useEffect } from "react";
import { ObservableArray } from "@nativescript/core";
import { StyleSheet } from "react-nativescript";
import { ApplicationSettings } from "@nativescript/core";
import { TipCard } from "./TipCard";
import { FilterBar } from "./FilterBar";
import { TIPS_DATA } from "./data";
import type { TipsState, Tip } from "./types";

export function WellnessTips() {
    const [state, setState] = useState<TipsState>({
        tips: new ObservableArray<Tip>(TIPS_DATA),
        selectedMood: "all",
        selectedAge: "newborn",
        activeCategory: "all",
    });

    useEffect(() => {
        loadSavedTips();
    }, []);

    const loadSavedTips = () => {
        const savedTipsString = ApplicationSettings.getString("savedTips", "[]");
        const savedTips = JSON.parse(savedTipsString);

        const updatedTips = Array.from(state.tips).map((tip: Tip) => ({
            ...tip,
            isSaved: savedTips.includes(tip.id),
        }));

        setState((prev) => ({
            ...prev,
            tips: new ObservableArray<Tip>(updatedTips),
        }));
    };

    const handleSaveTip = (tipId: string) => {
        const savedTipsString = ApplicationSettings.getString("savedTips", "[]");
        const savedTips = JSON.parse(savedTipsString);

        if (!savedTips.includes(tipId)) {
            savedTips.push(tipId);
            ApplicationSettings.setString("savedTips", JSON.stringify(savedTips));

            const updatedTips = Array.from(state.tips).map((tip: Tip) => ({
                ...tip,
                isSaved: tip.id === tipId ? true : tip.isSaved,
            }));

            setState((prev) => ({
                ...prev,
                tips: new ObservableArray<Tip>(updatedTips),
            }));
        }
    };

    const handleFilterChange = (filterType: keyof TipsState, value: string) => {
        setState((prev) => ({ ...prev, [filterType]: value }));
    };

    const getFilteredTips = () => {
        return state.tips.filter((tip: Tip) => {
            const matchesCategory =
                state.activeCategory === "all" || tip.category === state.activeCategory;
            const matchesAge =
                state.selectedAge === "all" || tip.ageRange === state.selectedAge;
            const matchesMood =
                state.selectedMood === "all" || tip.mood === state.selectedMood;
            return matchesCategory && matchesAge && matchesMood;
        });
    };

    return (
        <flexboxLayout style={styles.container}>
            <FilterBar
                activeCategory={state.activeCategory}
                selectedMood={state.selectedMood}
                selectedAge={state.selectedAge}
                onFilterChange={handleFilterChange}
            />

            <scrollView style={styles.tipsContainer}>
                {getFilteredTips().map((tip: Tip) => (
                    <TipCard key={tip.id} tip={tip} onSave={handleSaveTip} />
                ))}
            </scrollView>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "white",
    },
    tipsContainer: {
        flex: 1,
        marginTop: 8,
    },
});

