/**
 * Home Screen
 * 
 * Main landing screen with hero section, recent posts, and quick navigation
 */

import React from 'react';
import { View, ScrollView, StyleSheet, Pressable, Linking } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import {
  Text,
  Heading,
  Paragraph,
  Button,
  Divider,
  Loading,
} from '@/components/ui';
import { ArticleCard } from '@/components/ArticleCard';
import { colors, spacing, layout } from '@/constants/theme';
import { aboutContent, socialLinks } from '@/constants/content';
import { useRecentPosts, useDeviceInfo } from '@/lib/hooks';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { posts, loading } = useRecentPosts(3);
  const { isTablet } = useDeviceInfo();

  const handleSocialPress = async (url: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(url);
  };

  const handleViewAllPosts = () => {
    router.push('/writing');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing[4] },
        isTablet && styles.tabletContent,
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View style={[styles.hero, isTablet && styles.heroTablet]}>
        {/* Profile Image */}
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/profile.png')}
            style={styles.profileImage}
            contentFit="cover"
            transition={300}
          />
        </View>

        {/* Hero Text */}
        <View style={styles.heroText}>
          <Heading level={1} style={styles.greeting}>
            Hey, I am Raghu
          </Heading>
          
          <Text variant="bodyLarge" color="accent" style={styles.tagline}>
            {aboutContent.tagline}
          </Text>

          <View style={styles.bio}>
            {aboutContent.bio.slice(0, 2).map((paragraph, index) => (
              <Paragraph key={index} color={700} style={styles.bioParagraph}>
                {paragraph}
              </Paragraph>
            ))}
          </View>

          {/* Social Links */}
          <View style={styles.socialLinks}>
            <Pressable
              onPress={() => Linking.openURL(aboutContent.resumeUrl)}
              style={styles.socialButton}
            >
              <Text variant="bodySmall">Resume</Text>
            </Pressable>
            {socialLinks.map((link, index) => (
              <Pressable
                key={index}
                onPress={() => handleSocialPress(link.href)}
                style={styles.socialButton}
              >
                <Ionicons
                  name={link.iconName as any}
                  size={18}
                  color={colors.ink[700]}
                />
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <Divider spacing="lg" />

      {/* Recent Writing */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="h4">Recent Writing</Text>
          <Pressable onPress={handleViewAllPosts}>
            <Text variant="bodySmall" color={500}>
              View all →
            </Text>
          </Pressable>
        </View>

        {loading ? (
          <Loading size="small" />
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <ArticleCard key={post.id} article={post} variant="compact" />
          ))
        ) : (
          <Text variant="bodySmall" color={500}>
            No posts yet
          </Text>
        )}
      </View>

      <Divider spacing="lg" />

      {/* Quick Links */}
      <View style={styles.section}>
        <View style={styles.quickLinks}>
          <Pressable
            onPress={() => router.push('/projects')}
            style={styles.quickLink}
          >
            <Ionicons name="code-slash-outline" size={20} color={colors.ink[700]} />
            <Text variant="label">View Projects</Text>
          </Pressable>
          
          <Pressable
            onPress={() => router.push('/about')}
            style={styles.quickLink}
          >
            <Ionicons name="person-outline" size={20} color={colors.ink[700]} />
            <Text variant="label">About Me</Text>
          </Pressable>
        </View>
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
  tabletContent: {
    maxWidth: layout.container.narrow,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: spacing[10],
  },

  // Hero
  hero: {
    marginBottom: spacing[4],
  },
  heroTablet: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    gap: spacing[8],
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.ink[200],
  },
  heroText: {
    flex: 1,
  },
  greeting: {
    marginBottom: spacing[2],
  },
  tagline: {
    marginBottom: spacing[4],
  },
  bio: {
    marginBottom: spacing[6],
  },
  bioParagraph: {
    marginBottom: spacing[3],
  },

  // Social
  socialLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderWidth: 1,
    borderColor: colors.ink[200],
    borderRadius: layout.borderRadius.md,
    gap: spacing[1],
  },

  // Section
  section: {
    paddingVertical: spacing[4],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
  },

  // Quick Links
  quickLinks: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  quickLink: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    paddingVertical: spacing[4],
    borderWidth: 1,
    borderColor: colors.ink[200],
    borderRadius: layout.borderRadius.lg,
  },
});
