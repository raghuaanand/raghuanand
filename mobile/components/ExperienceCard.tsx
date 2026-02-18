/**
 * Experience Card Component
 * 
 * Card for displaying work experience
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Chip } from '@/components/ui';
import { colors, spacing, layout } from '@/constants/theme';
import { Experience } from '@/constants/types';

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text variant="h5" style={styles.title}>
          {experience.title}
        </Text>
        <Text variant="bodySmall" color={500}>
          {experience.period}
        </Text>
      </View>
      
      <Text variant="body" color={600} style={styles.company}>
        {experience.company}
      </Text>

      {/* Achievements */}
      <View style={styles.achievements}>
        {experience.achievements.map((achievement, index) => (
          <View key={index} style={styles.achievementRow}>
            <View style={styles.bullet} />
            <Text variant="bodySmall" color={700} style={styles.achievementText}>
              {achievement}
            </Text>
          </View>
        ))}
      </View>

      {/* Technologies */}
      <View style={styles.technologies}>
        {experience.technologies.map((tech, index) => (
          <Chip key={index} variant="accent">
            {tech}
          </Chip>
        ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[1],
    gap: spacing[2],
  },
  title: {
    flex: 1,
  },
  company: {
    marginBottom: spacing[4],
  },
  achievements: {
    marginBottom: spacing[4],
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent.DEFAULT,
    marginTop: 8,
    marginRight: spacing[2],
  },
  achievementText: {
    flex: 1,
  },
  technologies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
});
