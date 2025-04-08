const SearchBar = ({ className= "" }) => {
    let query = '';
  
    const handleSearch = () => {
      alert(`Searching for: ${query}`);
    };
  
    const handleInputChange = (e) => {
      query = e.target.value;
    };
  
    const handleClear = () => {
      query = '';
    };
  
    return (
      <div className={`search-bar ${className}`}>
        <input
          type="text"
          onInput={handleInputChange}
          placeholder="Type to search..."
          className="p-2 border border-gray-300 rounded-md"
        />
        <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded-md">
          Search
        </button>
      </div>
    );
  };
  
  export default SearchBar;
  