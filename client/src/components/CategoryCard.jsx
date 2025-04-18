const CategoryCard = ({ category }) => {
    return (
        <div className="rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <img src={category.image} alt={category.name} className="w-full h-full object-cover rounded-md" />
            <h2 className="text-sm font-semibold mt-2">{category.name}</h2>
            <p className="text-gray-600">{category.description}</p>
        </div>
    );
}

export default CategoryCard;