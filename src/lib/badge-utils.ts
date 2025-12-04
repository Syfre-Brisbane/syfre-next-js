// Map WordPress categories to badge variants
export function getCategoryBadgeVariant(category: string): 'pink' | 'amber' | 'green' | 'blue' | 'purple' | 'cyan' | 'orange' {
  const categoryMap: Record<string, 'pink' | 'amber' | 'green' | 'blue' | 'purple' | 'cyan' | 'orange'> = {
    'automation': 'pink',
    'machine learning': 'amber',
    'ai intelligence': 'blue',
    'data': 'green',
    'events': 'purple',
    'ai security': 'cyan',
    'ai strategy': 'orange',
  };

  return categoryMap[category.toLowerCase()] || 'amber';
}

// Get badge background color based on variant
export function getBadgeBackgroundColor(variant: 'pink' | 'amber' | 'green' | 'blue' | 'purple' | 'cyan' | 'orange'): string {
  const colorMap: Record<string, string> = {
    'pink': '#fda5d5',
    'amber': '#fbbf24',
    'blue': '#60a5fa',
    'green': '#4ade80',
    'purple': '#a78bfa',
    'cyan': '#22d3ee',
    'orange': '#fb923c',
  };

  return colorMap[variant] || colorMap['amber'];
}