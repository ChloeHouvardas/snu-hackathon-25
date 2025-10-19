import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import RecipeParsingModal from './recipe-parsing';

export default function Index() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [showParsingModal, setShowParsingModal] = useState(false);
  const [currentVideoData, setCurrentVideoData] = useState<any>(null);

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = async () => {
    console.log('Button pressed! YouTube URL:', youtubeUrl);
    
    // For now, just open the modal with fake data immediately
    const videoId = extractVideoId(youtubeUrl) || 'dQw4w9WgXcQ';
    
    // Create fake video data
    const fakeVideoData = {
      videoId: videoId,
      title: '5kg 뺄때 자주먹은 단짠단짠 에어프라이어 치킨, 초간단 다이어트 레시피',
      description: `재료:
- 닭윙 (치킨윙, 윙봉, 닭다리 모두 OK)
- 버터
- 간장
- 알룰로스 (설탕 대신)
- 다진마늘
- 소금

조리법:
1. 닭 냄새 제거해주세요
2. 허니 간장소스 만들어주세요 (버터+소금+다진마늘+간장+알룰로스)
3. 닭에 칼집을 내고 간장소스 부어주세요
4. 에어프라이어 구워주세요 (180도 10분, 180도 3분)
5. 완성!

맛있게 먹는 꿀팁:
저당 마요네즈+청양고추 곁들이면 매콤하고 맛있어요!`,
      thumbnailUrl: 'LOCAL_IMAGE', // Special marker for local image
      channelTitle: '다이어트 요리',
      publishedAt: new Date().toISOString(),
    };
    
    console.log('Setting modal data:', fakeVideoData);
    setCurrentVideoData(fakeVideoData);
    
    // Show the parsing modal immediately
    console.log('Showing parsing modal...');
    setShowParsingModal(true);
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.container}>
      
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Image 
              source={require('../assets/images/Yorigo_icon_dark.png')} 
              style={styles.logoIconImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.logoText}>요리고</Text>
        </View>
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <KeyboardAvoidingView 
        style={styles.content} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Center Icon and Title */}
            <View style={styles.centerContent}>
              <View style={styles.mainIcon}>
                <Image 
                  source={require('../assets/images/Yorigo_icon_light.png')} 
                  style={styles.mainIconImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.mainTitle}>요리고</Text>
              <Text style={styles.mainDescription}>
                유튜브 쇼츠 요리 영상을 공유하고 재료·조리법을{'\n'}자동으로 분석하세요
              </Text>
            </View>

            {/* Input Section */}
            <View style={styles.inputSection}>
              <View style={styles.inputWrapper}>
                <Ionicons name="link-outline" size={20} color="#999999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="유튜브 또는 인스타그램 영상 링크"
                  placeholderTextColor="#999999"
                  value={youtubeUrl}
                  onChangeText={setYoutubeUrl}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="url"
                />
              </View>
              
              <TouchableOpacity 
                style={styles.analyzeButton}
                onPress={handleSubmit}
              >
                <Text style={styles.analyzeButtonText}>
                  레시피 분석하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home-outline" size={24} color="#FF6900" />
            <Text style={styles.navLabelActive}>홈</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/recipes" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="restaurant-outline" size={24} color="#999999" />
            <Text style={styles.navLabel}>레시피</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/feed" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="people-outline" size={24} color="#999999" />
            <Text style={styles.navLabel}>피드</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/cart" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="cart-outline" size={24} color="#999999" />
            <Text style={styles.navLabel}>장바구니</Text>
          </TouchableOpacity>
        </Link>
      </View>
      </View>

      {/* Recipe Parsing Modal */}
      {currentVideoData && (
        <RecipeParsingModal
          visible={showParsingModal}
          onClose={() => setShowParsingModal(false)}
          videoData={currentVideoData}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FF6900',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    overflow: 'hidden',
  },
  logoIconImage: {
    width: 32,
    height: 32,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  loginButton: {
    backgroundColor: '#FF6900',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  mainContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  centerContent: {
    alignItems: 'center',
    marginBottom: 40,
  },
  mainIcon: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: '#FFF5ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  mainIconImage: {
    width: 80,
    height: 80,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6900',
    marginBottom: 16,
  },
  mainDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
    paddingVertical: 12,
  },
  analyzeButton: {
    backgroundColor: '#FF6900',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  analyzeButtonDisabled: {
    backgroundColor: '#FFB380',
  },
  analyzeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  videoTitleText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16,
  },
  descriptionContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  resultsSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  navLabel: {
    fontSize: 11,
    color: '#999999',
    marginTop: 4,
  },
  navLabelActive: {
    fontSize: 11,
    color: '#FF6900',
    fontWeight: '600',
    marginTop: 4,
  },
});
