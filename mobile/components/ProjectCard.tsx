/**
 * Project Card Component
 * 
 * Card for displaying project information
 */

import React from 'react';
import { View, Pressable, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Text, Chip } from '@/components/ui';
import { colors, spacing, layout } from '@/constants/theme';
import { Project } from '@/constants/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const handleOpenLink = async (url?: string) => {
    if (!url) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(url);
  };

  return (
    <View style={styles.card}>
      <Text variant="h4" style={styles.title}>
        {project.title}
      </Text>
      
      <Text variant="body" color={600} style={styles.description}>
        {project.description}
      </Text>

      {/* Highlights */}
      <View style={styles.highlights}>
        {project.highlights.slice(0, 3).map((highlight, index) => (
          <View key={index} style={styles.highlightRow}>
            <View style={styles.bullet} />
            <Text variant="bodySmall" color={600} style={styles.highlightText}>
              {highlight}
            </Text>
          </View>
        ))}
      </View>

      {/* Tech Stack */}
      <View style={styles.stack}>
        {project.stack.slice(0, 5).map((tech, index) => (
          <Chip key={index} variant="default">
            {tech}
          </Chip>
        ))}
      </View>

      {/* Links */}
      <View style={styles.links}>
        {project.github && (
          <Pressable
            onPress={() => handleOpenLink(project.github)}
            style={styles.link}
          >
            <Ionicons name="logo-github" size={18} color={colors.ink[700]} />
            <Text variant="bodySmall" style={styles.linkText}>
              Source
            </Text>
          </Pressable>
        )}
        {project.live && (
          <Pressable
            onPress={() => handleOpenLink(project.live)}
            style={styles.link}
          >
            <Ionicons name="open-outline" size={18} color={colors.ink[700]} />
            <Text variant="bodySmall" style={styles.linkText}>
              Live
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.borderRadius.lg,
    padding: spacing[5],
    marginBottom: spacing[4],
  },
  title: {
    marginBottom: spacing[2],
  },
  description: {
    marginBottom: spacing[4],
  },
  highlights: {
    marginBottom: spacing[4],
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.ink[400],
    marginTop: 8,
    marginRight: spacing[2],
  },
  highlightText: {
    flex: 1,
  },
  stack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
    marginBottom: spacing[4],
  },
  links: {
    flexDirection: 'row',
    gap: spacing[4],
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    paddingVertical: spacing[2],
  },
  linkText: {
    color: colors.ink[700],
  },
});
