// Map WordPress categories to badge variants
export function getCategoryBadgeVariant(category: string): 'pink' | 'amber' | 'green' | 'blue' {
  const categoryMap: Record<string, 'pink' | 'amber' | 'green' | 'blue'> = {
    'automation': 'pink',
    'machine learning': 'amber',
    'ai intelligence': 'blue',
    'data': 'green',
    'events': 'pink',
  };
  
  return categoryMap[category.toLowerCase()] || 'amber';
}

// Get badge background color based on variant
export function getBadgeBackgroundColor(variant: 'pink' | 'amber' | 'green' | 'blue'): string {
  const colorMap: Record<string, string> = {
    'pink': '#fda5d5',
    'amber': '#fbbf24', 
    'blue': '#60a5fa',
    'green': '#4ade80',
  };
  
  return colorMap[variant] || colorMap['amber'];
}