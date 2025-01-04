import { ObservableArray } from "@nativescript/core";

export interface Tip {
    id: string;
    title: string;
    description: string;
    category: "baby" | "parent" | "combined"|"";
    ageRange: "newborn" | "3-6months" | "6+months" |""|"infant"|"older infant"|"toddler"|"preschooler"|"schoolAge"|"teen";
    mood?: "stressed" | "happy" | "tired";
    isSaved?: boolean;
}

export interface TipsState {
    tips: ObservableArray<Tip>;
    selectedMood: string;
    selectedAge: string;
    activeCategory: string;
    
}