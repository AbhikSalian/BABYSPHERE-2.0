import * as React from "react";
import { StyleSheet } from "react-nativescript";
import type { TipsState } from "./types";

interface FilterBarProps {
    activeCategory: string;
    selectedMood: string;
    selectedAge: string;
    onFilterChange: (filterType: keyof TipsState, value: string) => void;
}

export function FilterBar({ 
    activeCategory, 
    selectedMood, 
    selectedAge, 
    onFilterChange 
}: FilterBarProps) {
    return (
        <flexboxLayout style={styles.container}>
            <flexboxLayout style={styles.categoryButtons}>
                <button 
                    className={`${styles.filterButton} ${activeCategory === 'all' ? styles.activeFilter : ''}`}
                    onClick={() => onFilterChange("activeCategory", "all")}
                >
                    All Tips
                </button>
                <button 
                    className={`${styles.filterButton} ${activeCategory === 'baby' ? styles.activeFilter : ''}`}
                    onClick={() => onFilterChange("activeCategory", "baby")}
                >
                    Baby Tips
                </button>
                <button 
                    className={`${styles.filterButton} ${activeCategory === 'parent' ? styles.activeFilter : ''}`}
                    onClick={() => onFilterChange("activeCategory", "parent")}
                >
                    Parent Tips
                </button>
            </flexboxLayout>

            <gridLayout rows="auto" columns="*, *" style={styles.dropdowns}>
                <select
                    value={selectedMood}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                        onFilterChange("selectedMood", e.target.value)
                    }
                    style={styles.dropdown}
                >
                    <option value="all">All</option>
                    <option value="stressed">Stressed</option>
                    <option value="happy">Happy</option>
                    <option value="tired">Tired</option>
                </select>
                <select
                    value={selectedAge}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                        onFilterChange("selectedAge", e.target.value)
                    }
                    style={styles.dropdown}
                >
                    <option value="all">All</option>
                    <option value="newborn">Newborn</option>
                    <option value="3-6months">3-6 Months</option>
                    <option value="6+months">6+ Months</option>
                </select>
            </gridLayout>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        padding: 8
    },
    categoryButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 8
    },
    filterButton: {
        flex: 1,
        margin: 4,
        padding: 8,
        textAlignment: "center"
    },
    activeFilter: {
        backgroundColor: "#65adf1",
        color: "white"
    },
    dropdowns: {
        marginTop: 8
    },
    dropdown: {
        margin: 4,
        padding: 8
    }
});
