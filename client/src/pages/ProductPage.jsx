import React from "react";

const ProductPage = () => {
  return (
    <div className="container mx-auto mt-6 flex">
      <aside className="w-1/4 h-screen bg-white p-6">
        <h3 className="mb-4 text-xl font-bold">Categories</h3>
        <ul className="space-y-2 text-left">
          <li>
            <a
              href="#"
              className="block text-black rounded-lg p-2 hover:bg-blue-100"
            >
              Tops
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block rounded-lg p-2 hover:bg-blue-100"
            >
              Bottoms
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block rounded-lg p-2 hover:bg-blue-100"
            >
              Dresses
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block rounded-lg p-2 hover:bg-blue-100"
            >
              Accessories
            </a>
          </li>
        </ul>
      </aside>

      <section className="flex-1 ml-6">
        <h2 className="mb-6 text-center text-3xl font-bold">Our Products</h2>

        {/* Search Bar */}
        <div className="mb-6 w-full flex justify-between items-center">
          <input
            type="text"
            placeholder="Search Products"
            className="w-2/3 p-2 border rounded-lg shadow-md"
          />
          <div className="w-1/3 ml-4 flex space-x-2">
            <select id="sizeFilter" className="w-1/3 p-2 border rounded-lg">
              <option value="">Size</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
            </select>
            <select id="colorFilter" className="w-1/3 p-2 border rounded-lg">
              <option value="">Color</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
            </select>
            <select
              id="conditionFilter"
              className="w-1/3 p-2 border rounded-lg"
            >
              <option value="">Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div
          id="productGrid"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <div
            className="product rounded-lg bg-white p-4 shadow-lg transition duration-300 hover:shadow-xl border border-gray-200"
            data-size="M"
            data-color="Black"
            data-condition="New"
          >
            <div className="relative">
              <img
                src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS9pcP4TkHx2whwvipsNY0-Y6r3OcSuJ_T-O8NGx0NX9qmDhmz10nbZLd1mX_WTPg7sxw8V9DvKqcJnm9izWmK71578h2fGmg"
                alt="Black Tote"
                className="h-48 w-full rounded-md object-cover"
              />
              <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                New Arrival
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">Black Tote</h3>
              <p className="text-gray-600 text-sm">
                Spacious and stylish everyday tote.
              </p>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">$19.99</span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-200">
                  Condition: New
                </span>
              </div>

              <div className="mt-2 flex items-center space-x-2 text-sm">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg font-medium">
                  Size: M
                </span>
                <span className="px-3 py-1 bg-black text-white rounded-lg font-medium">
                  Color: Black
                </span>
              </div>

              <button className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-700 transition duration-200">
                Add to Cart
              </button>
            </div>
          </div>

          <div
            className="product rounded-lg bg-white p-4 shadow-lg transition duration-300 hover:shadow-xl border border-gray-200"
            data-size="M"
            data-color="Black"
            data-condition="New"
          >
            <div className="relative">
              <img
                src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQdB-1WLGEVfCQdz_ME0gT_cvUoATv_uYdtWKYVBQPKE5ql-ppTIVvhCRE0cdNHzfcelJrsEFcqHqLQ80G3pqu340KfAbInKr7-GbLNuzUDWO5_dcegNWLZYQ"
                alt="Black Tote"
                className="h-48 w-full rounded-md object-contain"
              />
              <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                New Arrival
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Kitten Heel Leather Booties
              </h3>
              <p className="text-gray-600 text-sm">
                A pair of black leather booties with a kitten heel.
              </p>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">$39.99</span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-200">
                  Condition: New
                </span>
              </div>

              <div className="mt-2 flex items-center space-x-2 text-sm">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg font-medium">
                  Size: M
                </span>
                <span className="px-3 py-1 bg-black text-white rounded-lg font-medium">
                  Color: Black
                </span>
              </div>

              <button className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-700 transition duration-200">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
