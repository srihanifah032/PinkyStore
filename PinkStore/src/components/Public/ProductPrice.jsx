import { formatPrice } from '../../lib/utils';

function ProductPrice({ price }) {
  return (
    <p className="text-3xl font-bold text-pink-600 mb-3">
      {formatPrice(price)}
    </p>
  );
}

export default ProductPrice;