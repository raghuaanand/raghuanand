/**
 * Projects Screen
 * 
 * Portfolio of projects
 */

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui';
import { ProjectCard } from '@/components/ProjectCard';
import { colors, spacing, layout } from '@/constants/theme';
import { featuredProjects } from '@/constants/content';
import { useDeviceInfo } from '@/lib/hooks';

export default function ProjectsScreen() {
  const insets = useSafeAreaInsets();
  const { isTablet } = useDeviceInfo();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing[4] },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, isTablet && styles.headerTablet]}>
        <Text variant="h2">Projects</Text>
        <Text variant="body" color={600} style={styles.subtitle}>
          A collection of things I've built and contributed to.
        </Text>
      </View>

      {/* Projects List */}
      <View style={[styles.projects, isTablet && styles.projectsTablet]}>
        {featuredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </View>

      {/* Footer space */}
      <View style={{ height: spacing[8] }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: layout.screenPadding.horizontal,
    paddingBottom: spacing[8],
  },
  header: {
    marginBottom: spacing[6],
  },
  headerTablet: {
    maxWidth: layout.container.narrow,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: spacing[6],
  },
  subtitle: {
    marginTop: spacing[2],
  },
  projects: {
    // Default phone layout
  },
  projectsTablet: {
    maxWidth: layout.container.narrow,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: spacing[6],
  },
});
