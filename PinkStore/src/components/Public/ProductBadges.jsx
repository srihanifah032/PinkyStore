import { Badge } from "@/components/ui/badge"

const categoryVariantMap = {
  "Segi Empat": "default",
  "Pashmina": "secondary",
  "Instan": "success",
  "Paris": "warning",
  "Kaos": "danger",
}

function ProductBadges({ category }) {
  const variant = categoryVariantMap[category] || "default"

  return (
    <Badge variant={variant}>
      {category}
    </Badge>
  )
}

export default ProductBadges
