/**
 * About Screen
 * 
 * Personal info, experience, and contact details
 */

import React from 'react';
import { ScrollView, View, Pressable, Linking, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Text, Paragraph, Divider, Button } from '@/components/ui';
import { ExperienceCard } from '@/components/ExperienceCard';
import { colors, spacing, layout } from '@/constants/theme';
import { aboutContent, socialLinks, experiences } from '@/constants/content';
import { useDeviceInfo } from '@/lib/hooks';

export default function AboutScreen() {
  const insets = useSafeAreaInsets();
  const { isTablet } = useDeviceInfo();

  const handleSocialPress = async (url: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(url);
  };

  const handleResumePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(aboutContent.resumeUrl);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing[4] },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.wrapper, isTablet && styles.wrapperTablet]}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="h2">About</Text>
        </View>

        {/* Profile Section */}
        <View style={[styles.profile, isTablet && styles.profileTablet]}>
          <Image
            source={require('../../assets/images/profile.png')}
            style={styles.profileImage}
            contentFit="cover"
            transition={300}
          />
          
          <View style={styles.profileInfo}>
            <Text variant="h3" style={styles.name}>
              {aboutContent.name}
            </Text>
            <Text variant="bodyLarge" color="accent">
              {aboutContent.tagline}
            </Text>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.bio}>
          {aboutContent.bio.map((paragraph, index) => (
            <Paragraph key={index} color={700} style={styles.bioParagraph}>
              {paragraph}
            </Paragraph>
          ))}
        </View>

        {/* Resume Button */}
        <Button onPress={handleResumePress} style={styles.resumeButton}>
          View Resume
        </Button>

        <Divider spacing="xl" />

        {/* Experience Section */}
        <View style={styles.section}>
          <Text variant="h4" style={styles.sectionTitle}>
            Experience
          </Text>
          
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}
        </View>

        <Divider spacing="lg" />

        {/* Contact Section */}
        <View style={styles.section}>
          <Text variant="h4" style={styles.sectionTitle}>
            Get in Touch
          </Text>
          
          <Text variant="body" color={600} style={styles.contactText}>
            Feel free to reach out for collaborations, questions, or just to say hello.
          </Text>

          <View style={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <Pressable
                key={index}
                onPress={() => handleSocialPress(link.href)}
                style={styles.socialLink}
              >
                <Ionicons
                  name={link.iconName as any}
                  size={22}
                  color={colors.ink[700]}
                />
                <Text variant="body">{link.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Footer space */}
        <View style={{ height: spacing[8] }} />
      </View>
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
  wrapper: {
    // Default phone layout
  },
  wrapperTablet: {
    maxWidth: layout.container.narrow,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: spacing[6],
  },
  header: {
    marginBottom: spacing[6],
  },

  // Profile
  profile: {
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  profileTablet: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[6],
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.ink[200],
    marginBottom: spacing[4],
  },
  profileInfo: {
    alignItems: 'center',
  },
  name: {
    marginBottom: spacing[1],
  },

  // Bio
  bio: {
    marginBottom: spacing[6],
  },
  bioParagraph: {
    marginBottom: spacing[3],
  },
  resumeButton: {
    alignSelf: 'flex-start',
  },

  // Sections
  section: {
    paddingVertical: spacing[4],
  },
  sectionTitle: {
    marginBottom: spacing[4],
  },

  // Contact
  contactText: {
    marginBottom: spacing[4],
  },
  socialLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  socialLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderWidth: 1,
    borderColor: colors.ink[200],
    borderRadius: layout.borderRadius.lg,
  },
});
