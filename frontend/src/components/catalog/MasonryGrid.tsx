import type { ProductDTO } from '../../types/api'
import { PinCard } from './PinCard'

type Props = {
  products: ProductDTO[]
}

export function MasonryGrid({ products }: Props) {
  return (
    <div className="columns-2 gap-[var(--gutter)] md:columns-3 xl:columns-4 2xl:columns-5">
      {products.map((product) => (
        <PinCard key={product.id} product={product} />
      ))}
    </div>
  )
}
