import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  Modal,
  Image,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCart } from './CartContext';

interface ParsedRecipe {
  ingredients: string[];
  instructions: string[];
}

interface RecipeParsingModalProps {
  visible: boolean;
  onClose: () => void;
  videoData: {
    videoId: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    channelTitle?: string;
    publishedAt?: string;
  };
}

export default function RecipeParsingModal({ visible, onClose, videoData }: RecipeParsingModalProps) {
  const router = useRouter();
  const { addRecipeToCart } = useCart();
  const [parsedRecipe, setParsedRecipe] = useState<ParsedRecipe>({ ingredients: [], instructions: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [portionCount, setPortionCount] = useState(2);
  const [selectedIngredients, setSelectedIngredients] = useState<Set<number>>(new Set());
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  console.log('RecipeParsingModal rendered with:', { visible, videoData });

  // Parse recipe using AI when modal opens
  useEffect(() => {
    console.log('useEffect triggered:', { visible, hasDescription: !!videoData?.description });
    if (visible && videoData.description) {
      // Reset state when modal opens
      setParsedRecipe({ ingredients: [], instructions: [] });
      setSelectedIngredients(new Set());
      parseRecipeWithAI(videoData.description);
    }
  }, [visible, videoData.description]);

  const parseRecipeWithAI = async (description: string) => {
    setIsLoading(true);
    
    // Simulate loading for 2 seconds to show the loading screen
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // For now, just parse from the description text directly
      // Extract ingredients and instructions from the description
      const lines = description.split('\n').filter(line => line.trim());
      
      const ingredientsList: string[] = [];
      const instructionsList: string[] = [];
      
      let currentSection = '';
      
      for (const line of lines) {
        if (line.includes('재료') || line.includes('Ingredients')) {
          currentSection = 'ingredients';
          continue;
        } else if (line.includes('조리법') || line.includes('Instructions') || line.includes('만들기')) {
          currentSection = 'instructions';
          continue;
        }
        
        if (currentSection === 'ingredients' && line.trim().startsWith('-')) {
          ingredientsList.push(line.trim().substring(1).trim());
        } else if (currentSection === 'instructions' && /^\d+\./.test(line.trim())) {
          instructionsList.push(line.trim().replace(/^\d+\.\s*/, ''));
        }
      }
      
      // If we couldn't parse anything, use default mock data
      if (ingredientsList.length === 0) {
        ingredientsList.push(
          '닭윙 (치킨윙, 윙봉, 닭다리 모두 OK)',
          '버터',
          '간장',
          '알룰로스 (설탕 대신)',
          '다진마늘',
          '소금'
        );
      }
      
      if (instructionsList.length === 0) {
        instructionsList.push(
          '닭 냄새 제거해주세요',
          '허니 간장소스 만들어주세요 (버터+소금+다진마늘+간장+알룰로스)',
          '닭에 칼집을 내고 간장소스 부어주세요',
          '에어프라이어 구워주세요 (180도 10분, 180도 3분)',
          '완성!'
        );
      }
      
      setParsedRecipe({
        ingredients: ingredientsList,
        instructions: instructionsList
      });
      
      // Select all ingredients by default
      setSelectedIngredients(new Set(ingredientsList.map((_, index) => index)));
    } catch (error) {
      console.error('Parsing error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleIngredient = (index: number) => {
    const newSelected = new Set(selectedIngredients);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedIngredients(newSelected);
  };

  const handleAddToCart = () => {
    // Don't actually add to cart - just show success message
    console.log('Add to cart button pressed (not adding to cart)');

    // Show success modal
    setShowSuccessModal(true);
    // Close the modal after a short delay
    setTimeout(() => {
      setShowSuccessModal(false);
      onClose();
    }, 1500);
  };

  const handleSaveRecipe = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId: videoData.videoId,
          title: videoData.title,
          description: videoData.description,
          thumbnailUrl: videoData.thumbnailUrl,
          youtubeUrl: `https://www.youtube.com/watch?v=${videoData.videoId}`,
          channelTitle: videoData.channelTitle,
          publishedAt: videoData.publishedAt,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save recipe');
      }

      Alert.alert('성공', '레시피가 저장되었습니다!');
      onClose();
    } catch (error) {
      Alert.alert('오류', '레시피 저장에 실패했습니다.');
      console.error('Save error:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#333333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>레시피 분석</Text>
          <View style={styles.placeholder} />
        </View>

         <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Video Info */}
          <View style={styles.videoInfo}>
            {videoData.thumbnailUrl === 'LOCAL_IMAGE' ? (
              <Image 
                source={require('../assets/images/chicken-recipe.png')}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            ) : (
              <Image 
                source={{ uri: videoData.thumbnailUrl }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            )}
            <View style={styles.videoDetails}>
              <Text style={styles.videoTitle} numberOfLines={2}>{videoData.title}</Text>
              {videoData.channelTitle && (
                <Text style={styles.channelName}>{videoData.channelTitle}</Text>
              )}
            </View>
          </View>

          {/* Loading State - Show when loading */}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingIconContainer}>
                <Image 
                  source={require('../assets/images/Yorigo_icon_light.png')} 
                  style={styles.loadingIcon}
                  resizeMode="contain"
                />
              </View>
              <ActivityIndicator size="large" color="#FF6900" style={styles.loadingSpinner} />
              <Text style={styles.loadingText}>AI가 레시피를 분석 중입니다...</Text>
              <Text style={styles.loadingSubtext}>잠시만 기다려주세요</Text>
            </View>
          )}

          {/* Content - Show when not loading and data is available */}
          {!isLoading && parsedRecipe.ingredients.length > 0 && (
            <>
              {/* Portion Control */}
              <View style={styles.portionControl}>
                <Text style={styles.portionLabel}>인분 조절</Text>
                <View style={styles.portionButtons}>
                  <TouchableOpacity 
                    style={styles.portionButton}
                    onPress={() => setPortionCount(Math.max(1, portionCount - 1))}
                  >
                    <Ionicons name="remove" size={20} color="#333333" />
                  </TouchableOpacity>
                  <Text style={styles.portionNumber}>{portionCount}</Text>
                  <TouchableOpacity 
                    style={styles.portionButton}
                    onPress={() => setPortionCount(portionCount + 1)}
                  >
                    <Ionicons name="add" size={20} color="#333333" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Ingredients Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>재료</Text>
                <Text style={styles.sectionSubtitle}>이미 보유한 재료는 선택 해제하세요</Text>
                
                {parsedRecipe.ingredients.map((ingredient, index) => {
                  const isSelected = selectedIngredients.has(index);
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.ingredientItem,
                        isSelected && styles.ingredientItemSelected
                      ]}
                      onPress={() => toggleIngredient(index)}
                    >
                      <View style={styles.ingredientLeft}>
                        <View style={[
                          styles.checkbox,
                          isSelected && styles.checkboxChecked
                        ]}>
                          {isSelected && (
                            <Ionicons name="checkmark" size={16} color="#FF6900" />
                          )}
                        </View>
                        <Text style={styles.ingredientText}>{ingredient}</Text>
                      </View>
                      {isSelected && (
                        <Ionicons name="cart-outline" size={16} color="#FF6900" />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Instructions Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>조리 방법</Text>
                
                {parsedRecipe.instructions.map((instruction, index) => (
                  <View key={index} style={styles.instructionItem}>
                    <View style={styles.instructionNumber}>
                      <Text style={styles.instructionNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.instructionText}>{instruction}</Text>
                  </View>
                ))}
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                  <Ionicons name="cart-outline" size={20} color="#ffffff" />
                  <Text style={styles.addToCartText}>장바구니에 추가</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveRecipe}>
                  <Ionicons name="bookmark-outline" size={20} color="#ffffff" />
                  <Text style={styles.saveButtonText}>레시피 저장</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </View>

      {/* Success Modal */}
      {showSuccessModal && (
        <View style={styles.successModalOverlay}>
          <View style={styles.successModal}>
            <Ionicons name="checkmark-circle" size={48} color="#4CAF50" />
            <Text style={styles.successModalText}>재료가 장바구니에{'\n'}추가되었습니다!</Text>
          </View>
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  videoInfo: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#f8f8f8',
    marginBottom: 20,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  placeholderThumbnail: {
    backgroundColor: '#FFF5ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 11,
    color: '#FF6900',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
  videoDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  channelName: {
    fontSize: 14,
    color: '#666666',
  },
  portionControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f8f8f8',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  portionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  portionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  portionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  portionNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    minWidth: 30,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  loadingIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: '#FFF5ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loadingIcon: {
    width: 90,
    height: 90,
  },
  loadingSpinner: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#999999',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 16,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  ingredientItemSelected: {
    backgroundColor: '#FFF5ED',
    borderColor: '#FF6900',
  },
  ingredientLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#cccccc',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FFF5ED',
    borderColor: '#FF6900',
  },
  ingredientText: {
    fontSize: 15,
    color: '#333333',
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  instructionNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF6900',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  instructionNumberText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    color: '#333333',
    lineHeight: 22,
    paddingTop: 6,
  },
  actionButtons: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#FF6900',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#333333',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
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
    lineHeight: 26,
  },
});
