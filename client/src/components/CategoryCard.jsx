import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const CategoryCard = ({ category }) => {
  return (
    <div className="group relative overflow-hidden bg-white transition-all duration-300 hover:shadow-md rounded-sm">
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={category.image || "/placeholder.svg"}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-70"></div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px]">
          <div className="mb-1 inline-block bg-white/20 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
            {category.itemCount || "Collection"}
          </div>
          <h2 className="mb-2 font-light text-2xl tracking-wide">{category.name}</h2>
          <p className="mb-4 text-sm text-white/80">{category.description}</p>
          
          <Link
            to={`/products?category=${encodeURIComponent(category.name)}`}
            className="inline-flex items-center text-sm font-medium text-white"
          >
            Explore Collection
            <ArrowRight size={14} className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 border border-white/10 pointer-events-none"></div>
    </div>
  )
}

export default CategoryCard