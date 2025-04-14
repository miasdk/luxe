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
      <div className="ms-5 w-full flex items-center justify-between">
        <input
          type="text"
          onInput={handleInputChange}
          placeholder="Search for products..."
          className="p-3 bg-gray-100 text-black border-2 border-solid rounded-full w-full"
        />
        <button onClick={handleSearch} className="ml-3 p-2 bg-blue-500 w-50 text-white rounded-full text-bold">
          Search
        </button>
      </div>
    );
  };
  
  export default SearchBar;
  