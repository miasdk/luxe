import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
  <div class="container mx-auto mt-6 flex">

    <aside class="w-1/4 h-screen bg-white p-6 shadow-lg">
      <h3 class="mb-4 text-xl font-bold">Categories</h3>
      <ul class="space-y-2 text-left">
        <li><a href="#" class="block text-black rounded-lg p-2 hover:bg-blue-100">Tops</a></li>
        <li><a href="#" class="block rounded-lg p-2 hover:bg-blue-100">Bottoms</a></li>
        <li><a href="#" class="block rounded-lg p-2 hover:bg-blue-100">Dresses</a></li>
        <li><a href="#" class="block rounded-lg p-2 hover:bg-blue-100">Accessories</a></li>
      </ul>
    </aside>
    
    <section class="flex-1 ml-6">
      <h2 class="mb-6 text-center text-3xl font-bold">Our Products</h2>

      <div class="mb-6 w-full rounded-lg bg-white p-4 shadow-md flex space-x-4">
        <select id="sizeFilter" class="w-1/3 p-2 border rounded-lg">
          <option value="">Size</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
        <select id="colorFilter" class="w-1/3 p-2 border rounded-lg">
          <option value="">Color</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Black">Black</option>
        </select>
        <select id="conditionFilter" class="w-1/3 p-2 border rounded-lg">
          <option value="">Condition</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
      </div>
    
      <div id="productGrid" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div class="product rounded-lg bg-white p-4 shadow-lg transition duration-300 hover:shadow-xl border border-gray-200" data-size="M" data-color="Black" data-condition="New">
        <div class="relative">
          <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS9pcP4TkHx2whwvipsNY0-Y6r3OcSuJ_T-O8NGx0NX9qmDhmz10nbZLd1mX_WTPg7sxw8V9DvKqcJnm9izWmK71578h2fGmg" 
            alt="Black Tote" 
            class="h-48 w-full rounded-md object-cover" />
          <span class="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
            New Arrival
          </span>
        </div>

        <div class="mt-4">
          <h3 class="text-lg font-semibold text-gray-900">Black Tote</h3>
          <p class="text-gray-600 text-sm">Spacious and stylish everyday tote.</p>
          
          <div class="mt-2 flex items-center justify-between">
            <span class="text-xl font-bold text-blue-600">$19.99</span>
            <span class="text-xs px-2 py-1 rounded-full bg-gray-200">Condition: New</span>
          </div>
          
          <div class="mt-2 flex items-center space-x-2 text-sm">
            <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg font-medium">Size: M</span>
            <span class="px-3 py-1 bg-black text-white rounded-lg font-medium">Color: Black</span>
          </div>

          <button class="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-700 transition duration-200">
            Add to Cart
          </button>
        </div>
      </div>

      <div class="product rounded-lg bg-white p-4 shadow-lg transition duration-300 hover:shadow-xl border border-gray-200" data-size="M" data-color="Black" data-condition="New">
        <div class="relative">
          <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQdB-1WLGEVfCQdz_ME0gT_cvUoATv_uYdtWKYVBQPKE5ql-ppTIVvhCRE0cdNHzfcelJrsEFcqHqLQ80G3pqu340KfAbInKr7-GbLNuzUDWO5_dcegNWLZYQ" 
            alt="Black Tote" 
            class="h-48 w-full rounded-md object-contain" />
          <span class="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
            New Arrival
          </span>
        </div>

        <div class="mt-4">
          <h3 class="text-lg font-semibold text-gray-900">Kitten Heel Leather Booties</h3>
          <p class="text-gray-600 text-sm">A pair of black leather booties with a kitten heel.</p>
          
          <div class="mt-2 flex items-center justify-between">
            <span class="text-xl font-bold text-blue-600">$39.99</span>
            <span class="text-xs px-2 py-1 rounded-full bg-gray-200">Condition: New</span>
          </div>
          
          <div class="mt-2 flex items-center space-x-2 text-sm">
            <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg font-medium">Size: M</span>
            <span class="px-3 py-1 bg-black text-white rounded-lg font-medium">Color: Black</span>
          </div>

          <button class="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-700 transition duration-200">
            Add to Cart
          </button>
          
        </div>
      </div>

      
    </div>
    </section>
  </div>
  )
}

export default App
