// Map WordPress categories to badge variants
export function getCategoryBadgeVariant(category: string): 'pink' | 'amber' | 'green' | 'blue' | 'purple' {
  const categoryMap: Record<string, 'pink' | 'amber' | 'green' | 'blue' | 'purple'> = {
    'automation': 'pink',
    'machine learning': 'amber',
    'ai intelligence': 'blue',
    'data': 'green',
    'events': 'purple',
  };
  
  return categoryMap[category.toLowerCase()] || 'amber';
}

// Get badge background color based on variant
export function getBadgeBackgroundColor(variant: 'pink' | 'amber' | 'green' | 'blue' | 'purple'): string {
  const colorMap: Record<string, string> = {
    'pink': '#fda5d5',
    'amber': '#fbbf24', 
    'blue': '#60a5fa',
    'green': '#4ade80',
    'purple': '#a78bfa',
  };
  
  return colorMap[variant] || colorMap['amber'];
}