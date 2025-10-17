import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';

export default function Index() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const handleSubmit = async () => {
    if (!youtubeUrl.trim()) {
      Alert.alert('Error', 'Please enter a YouTube URL');
      return;
    }

    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      Alert.alert('Error', 'Please enter a valid YouTube URL');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call to get video title (in real app, you'd call YouTube API)
      const thumbnail = getYouTubeThumbnail(videoId);
      setThumbnailUrl(thumbnail);
      setVideoTitle(`Recipe Video ${videoId.substring(0, 8)}...`);
      
      Alert.alert('Success', 'Recipe saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to process the video');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Recify</Text>
          <Text style={styles.tagline}>All your favorite recipes, finally in one place.</Text>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Just save it</Text>
            <Text style={styles.featureDescription}>
              Found it on YouTube? Just paste the link and never lose it again.
            </Text>
            
            {/* YouTube Input Form */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.urlInput}
                placeholder="Paste your YouTube Short link here..."
                value={youtubeUrl}
                onChangeText={setYoutubeUrl}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
              />
              <TouchableOpacity 
                style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text style={styles.submitButtonText}>
                  {isLoading ? 'Processing...' : 'Save Recipe'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Thumbnail Display */}
            {thumbnailUrl && (
              <View style={styles.thumbnailContainer}>
                <Text style={styles.thumbnailTitle}>Saved Recipe:</Text>
                <Image 
                  source={{ uri: thumbnailUrl }} 
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
                <Text style={styles.videoTitle}>{videoTitle}</Text>
              </View>
            )}
          </View>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Saving is just the beginning</Text>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureItemTitle}>Keep your recipes beautifully organized</Text>
              <Text style={styles.featureItemDescription}>
                Group them into collections like 'Breakfast', 'Vegan', or 'Lazy Dinners'.
              </Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureItemTitle}>Cook step by step</Text>
              <Text style={styles.featureItemDescription}>
                Follow each step full screen. Swipe through instructions without touching your messy phone.
              </Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureItemTitle}>Share recipes with your friends</Text>
              <Text style={styles.featureItemDescription}>
                Send recipes to friends or generate beautiful recipe images to share.
              </Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.9</Text>
              <Text style={styles.statLabel}>Average rating</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>+100K</Text>
              <Text style={styles.statLabel}>Imported recipes</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  tagline: {
    fontSize: 20,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 28,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  featureTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  urlInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#e9ecef',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#6c757d',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  thumbnailContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  thumbnailTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  thumbnail: {
    width: 200,
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
  },
  videoTitle: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  featuresSection: {
    marginVertical: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 24,
  },
  featureItem: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  featureItemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  featureItemDescription: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 32,
    paddingVertical: 24,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
});
