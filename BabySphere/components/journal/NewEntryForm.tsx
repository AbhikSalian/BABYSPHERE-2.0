import React, { useState } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Text, TouchableOpacity } from 'react-native';
import { addJournalEntry } from '../../services/journalService';

const PRESET_TAGS = [
  "stressful day",
  "happy moment",
  "parenting win",
  "self-care",
  "tired",
  "productive"
];

interface NewEntryFormProps {
  onEntryAdded: () => void;
}

export function NewEntryForm({ onEntryAdded }: NewEntryFormProps) {
  const [text, setText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      setIsSubmitting(true);
      await addJournalEntry({
        text,
        tags: selectedTags,
        date: new Date(),
      });
      setText("");
      setSelectedTags([]);
      onEntryAdded();
    } catch (error) {
      console.error("Failed to add entry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write about your day..."
        value={text}
        onChangeText={setText}
        multiline
      />

      <ScrollView horizontal style={styles.tagsContainer}>
        {PRESET_TAGS.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tag,
              selectedTags.includes(tag) && styles.selectedTag
            ]}
            onPress={() => toggleTag(tag)}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.submitButton,
          (!text.trim() || isSubmitting) && styles.disabledButton
        ]}
        onPress={handleSubmit}
        disabled={!text.trim() || isSubmitting}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? "Adding..." : "Add Entry"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    height: 150,
    backgroundColor: '#F8F9FA',
    padding: 10,
    borderRadius: 8,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  tagsContainer: {
    marginBottom: 15,
  },
  tag: {
    backgroundColor: '#B4E3A7',
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedTag: {
    backgroundColor: '#FDC1C5',
  },
  tagText: {
    color: '#333333',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#FFF1C1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#333333',
    fontSize: 16,
  },
});

