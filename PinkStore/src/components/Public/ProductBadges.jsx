const getCategoryColor = (category) => {
  const colors = {
    'Segi Empat': 'bg-pink-200 text-pink-800',
    'Pashmina': 'bg-rose-200 text-rose-800',
    'Instan': 'bg-fuchsia-200 text-fuchsia-800',
    'Paris': 'bg-purple-200 text-purple-800',
    'Kaos': 'bg-blue-200 text-blue-800',
  };
  return colors[category] || 'bg-gray-200 text-gray-800';
};

function ProductBadges({ category }) {
  return (
    <span className={`text-xs px-4 py-2 rounded-full font-bold shadow-sm inline-block ${getCategoryColor(category)}`}>
      {category}
    </span>
  );
}

export default ProductBadges;
