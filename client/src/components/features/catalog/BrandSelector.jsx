import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Plus, Check } from 'lucide-react';
import brandService from '../../../services/brandService';
import FormInput from '../../common/forms/FormInput';

const BrandSelector = ({ value, onChange, disabled = false }) => {
  const [brands, setBrands] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
        setIsCreating(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const brandsData = await brandService.fetchAllBrands();
      setBrands(brandsData);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedBrand = brands.find(brand => brand.id === value);

  const handleBrandSelect = (brand) => {
    onChange(brand.id);
    setIsOpen(false);
    setSearchTerm('');
    setIsCreating(false);
  };

  const handleCreateBrand = async () => {
    if (!searchTerm.trim()) return;

    try {
      setIsCreating(true);
      const newBrand = await brandService.findOrCreateBrand(searchTerm.trim());
      
      // Update brands list
      setBrands(prev => {
        const exists = prev.find(b => b.id === newBrand.id);
        if (exists) return prev;
        return [...prev, newBrand].sort((a, b) => a.name.localeCompare(b.name));
      });

      // Select the new brand
      onChange(newBrand.id);
      setIsOpen(false);
      setSearchTerm('');
    } catch (error) {
      console.error('Error creating brand:', error);
      alert('Failed to create brand. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() && filteredBrands.length === 0) {
      e.preventDefault();
      handleCreateBrand();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-4 py-3 text-left border bg-white transition-all duration-200 flex items-center justify-between ${
          disabled 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
            : 'border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
        }`}
      >
        <span className={selectedBrand ? 'text-gray-900' : 'text-gray-500'}>
          {selectedBrand ? selectedBrand.name : 'Select a brand...'}
        </span>
        <ChevronDown 
          size={16} 
          className={`transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          } ${disabled ? 'text-gray-400' : 'text-gray-600'}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-64 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-200">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search or type new brand name..."
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              autoFocus
            />
          </div>

          {/* Options */}
          <div className="max-h-48 overflow-y-auto">
            {loading ? (
              <div className="px-4 py-3 text-sm text-gray-500">Loading brands...</div>
            ) : (
              <>
                {/* Existing Brands */}
                {filteredBrands.length > 0 ? (
                  filteredBrands.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => handleBrandSelect(brand)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between text-sm transition-colors"
                    >
                      <span>{brand.name}</span>
                      {brand.id === value && <Check size={16} className="text-gray-900" />}
                    </button>
                  ))
                ) : searchTerm.trim() ? (
                  /* Create New Brand Option */
                  <button
                    onClick={handleCreateBrand}
                    disabled={isCreating}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-2 text-sm transition-colors border-t border-gray-200"
                  >
                    <Plus size={16} className="text-gray-600" />
                    <span>
                      {isCreating ? 'Creating...' : `Create "${searchTerm.trim()}"`}
                    </span>
                  </button>
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    Start typing to search or create a new brand
                  </div>
                )}

                {/* Clear Selection */}
                {value && (
                  <button
                    onClick={() => handleBrandSelect({ id: '' })}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 text-sm text-gray-600 border-t border-gray-200"
                  >
                    Clear selection
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandSelector; 