import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartIngredient {
  name: string;
  amount: string;
  recommendations: any[];
}

export interface CartRecipe {
  id: string;
  name: string;
  servings: number;
  isExpanded: boolean;
  ingredients: CartIngredient[];
}

interface CartContextType {
  cartRecipes: CartRecipe[];
  addRecipeToCart: (recipe: CartRecipe) => void;
  removeRecipe: (recipeId: string) => void;
  clearAll: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartRecipes, setCartRecipes] = useState<CartRecipe[]>([]);

  const addRecipeToCart = (recipe: CartRecipe) => {
    setCartRecipes(prevRecipes => {
      // Remove existing recipe with same id if it exists
      const filtered = prevRecipes.filter(r => r.id !== recipe.id);
      // Add new recipe at the beginning
      return [recipe, ...filtered];
    });
  };

  const removeRecipe = (recipeId: string) => {
    setCartRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
  };

  const clearAll = () => {
    setCartRecipes([]);
  };

  return (
    <CartContext.Provider value={{ cartRecipes, addRecipeToCart, removeRecipe, clearAll }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

