import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function FeedPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: '김민지',
        avatar: '👩',
        timeAgo: '2시간 전',
      },
      image: require('../assets/images/creamPasta.jpg'), // Creamy pasta
      likes: 24,
      comments: 8,
      isLiked: false,
      recipe: {
        title: '크림 파스타',
        description: '이 크림 파스타는 정말 환상적이었어요! 소스가 정말 부드럽고 크리미했고 베이컨이 완벽한 바삭한 식감을 더해줬어요. 가족들이 정말 좋아했습니다!',
      },
      ratings: {
        overall: 5,
        taste: 5,
        ease: 4,
        recommend: 5,
      },
    },
    {
      id: 2,
      user: {
        name: '박준서',
        avatar: '👨',
        timeAgo: '5시간 전',
      },
      image: require('../assets/images/kimchiJigae.jpg'), // Kimchi jjigae
      likes: 18,
      comments: 5,
      isLiked: false,
      recipe: {
        title: '김치찌개',
        description: '집에서 만든 김치로 끓인 김치찌개입니다. 돼지고기를 듬뿍 넣어서 국물이 진하고 맛있어요. 밥 한 공기 뚝딱 먹었습니다!',
      },
      ratings: {
        overall: 5,
        taste: 5,
        ease: 5,
        recommend: 5,
      },
    },
    {
      id: 3,
      user: {
        name: '이수진',
        avatar: '👩',
        timeAgo: '1일 전',
      },
      image: require('../assets/images/bulgogi.jpg'), // Bulgogi
      likes: 32,
      comments: 12,
      isLiked: false,
      recipe: {
        title: '불고기',
        description: '양념이 고기에 완벽하게 배어서 정말 맛있었어요. 달콤하면서도 짭조름한 맛이 일품이고 파와 함께 먹으니 더 맛있네요. 다음엔 더 많이 만들어야겠어요!',
      },
      ratings: {
        overall: 5,
        taste: 5,
        ease: 3,
        recommend: 5,
      },
    },
  ]);

  const toggleLike = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const comments = [
    { user: '최지훈', text: '정말 맛있어 보여요! 만드는데 얼마나 걸렸나요?', time: '1시간 전' },
    { user: '한서연', text: '레시피 공유해주실 수 있나요? 꼭 만들어보고 싶어요!', time: '30분 전' },
  ];

  return (
    <View style={styles.wrapper}>
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

        {/* Main Content */}
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <Text style={styles.pageTitle}>커뮤니티</Text>
            <Text style={styles.pageSubtitle}>
              다른 유저들이 저장한 레시피와 후기들을 확인해보세요!
            </Text>
          </View>

          {posts.map((post, index) => (
            <View key={post.id} style={styles.postCard}>
              {/* User Info */}
              <View style={styles.userInfo}>
                <View style={styles.userAvatar}>
                  <Text style={styles.userAvatarText}>{post.user.avatar}</Text>
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>{post.user.name}</Text>
                  <View style={styles.timeContainer}>
                    <Ionicons name="time-outline" size={14} color="#999999" />
                    <Text style={styles.timeText}>{post.user.timeAgo}</Text>
                  </View>
                </View>
              </View>

              {/* Post Image */}
              <Image 
                source={post.image} 
                style={styles.postImage}
                resizeMode="cover"
              />

              {/* Interaction Bar */}
              <View style={styles.interactionBar}>
                <View style={styles.interactionLeft}>
                  <TouchableOpacity 
                    style={styles.interactionButton}
                    onPress={() => toggleLike(post.id)}
                  >
                    <Ionicons 
                      name={post.isLiked ? "heart" : "heart-outline"} 
                      size={24} 
                      color={post.isLiked ? "#FF6900" : "#333333"} 
                    />
                    <Text style={[
                      styles.interactionCount,
                      post.isLiked && styles.interactionCountLiked
                    ]}>
                      {post.likes}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.interactionButton}>
                    <Ionicons name="chatbubble-outline" size={22} color="#333333" />
                    <Text style={styles.interactionCount}>{post.comments}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <Ionicons name="bookmark-outline" size={24} color="#333333" />
                </TouchableOpacity>
              </View>

              {/* Recipe Info */}
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeTitle}>{post.recipe.title}</Text>
                <Text style={styles.recipeDescription}>{post.recipe.description}</Text>
              </View>

              {/* Ratings */}
              <View style={styles.ratingsContainer}>
                <View style={styles.ratingItem}>
                  <Ionicons name="star" size={18} color="#FF6900" />
                  <Text style={styles.ratingValue}>{post.ratings.overall}</Text>
                  <Text style={styles.ratingLabel}>전체</Text>
                </View>
                <View style={styles.ratingItem}>
                  <Ionicons name="restaurant" size={18} color="#FF6900" />
                  <Text style={styles.ratingValue}>{post.ratings.taste}</Text>
                  <Text style={styles.ratingLabel}>맛</Text>
                </View>
                <View style={styles.ratingItem}>
                  <Ionicons name="time" size={18} color="#FF6900" />
                  <Text style={styles.ratingValue}>{post.ratings.ease}</Text>
                  <Text style={styles.ratingLabel}>난이도</Text>
                </View>
                <View style={styles.ratingItem}>
                  <Ionicons name="thumbs-up" size={18} color="#FF6900" />
                  <Text style={styles.ratingValue}>{post.ratings.recommend}</Text>
                  <Text style={styles.ratingLabel}>추천</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.viewRecipeButton}
                  onPress={() => {
                    setShowSuccessModal(true);
                    setTimeout(() => {
                      setShowSuccessModal(false);
                    }, 1500);
                  }}
                >
                  <Text style={styles.viewRecipeButtonText}>레시피 보기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cartButton}>
                  <Ionicons name="cart-outline" size={20} color="#FF6900" />
                  <Text style={styles.cartButtonText}>장바구니</Text>
                </TouchableOpacity>
              </View>

              {/* Comments Preview - Only show for first post */}
              {index === 0 && (
                <View style={styles.commentsSection}>
                  {comments.map((comment, idx) => (
                    <View key={idx} style={styles.commentItem}>
                      <View style={styles.commentAvatar}>
                        <Text style={styles.commentAvatarText}>👤</Text>
                      </View>
                      <View style={styles.commentContent}>
                        <Text style={styles.commentUser}>{comment.user}</Text>
                        <Text style={styles.commentText}>{comment.text}</Text>
                        <Text style={styles.commentTime}>{comment.time}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.navItem}>
              <Ionicons name="home-outline" size={24} color="#999999" />
              <Text style={styles.navLabel}>홈</Text>
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
              <Ionicons name="people-outline" size={24} color="#FF6900" />
              <Text style={styles.navLabelActive}>피드</Text>
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

      {/* Success Modal */}
      {showSuccessModal && (
        <View style={styles.successModalOverlay}>
          <View style={styles.successModal}>
            <Ionicons name="checkmark-circle" size={48} color="#4CAF50" />
            <Text style={styles.successModalText}>성공!</Text>
          </View>
        </View>
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
    backgroundColor: '#F5F5F5',
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
    paddingBottom: 40,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  postCard: {
    backgroundColor: '#ffffff',
    marginTop: 12,
    paddingBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF5ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userAvatarText: {
    fontSize: 24,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 13,
    color: '#999999',
    marginLeft: 4,
  },
  postImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  interactionLeft: {
    flexDirection: 'row',
    gap: 16,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  interactionCount: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '500',
  },
  interactionCountLiked: {
    color: '#FF6900',
  },
  recipeInfo: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
  },
  ratingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    backgroundColor: '#FFF5ED',
    borderRadius: 12,
    marginBottom: 16,
  },
  ratingItem: {
    alignItems: 'center',
    gap: 4,
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6900',
  },
  ratingLabel: {
    fontSize: 12,
    color: '#666666',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  viewRecipeButton: {
    flex: 1,
    backgroundColor: '#FF6900',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  viewRecipeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF6900',
    gap: 6,
  },
  cartButtonText: {
    color: '#FF6900',
    fontSize: 16,
    fontWeight: '600',
  },
  commentsSection: {
    marginTop: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  commentAvatarText: {
    fontSize: 18,
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 4,
  },
  commentTime: {
    fontSize: 12,
    color: '#999999',
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
  successModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  successModalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginTop: 16,
    textAlign: 'center',
  },
});

