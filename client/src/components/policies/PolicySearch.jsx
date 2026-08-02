import SearchBar from "../ui/SearchBar";

const PolicySearch = ({ searchQuery, setSearchQuery, placeholder = "Search policy number, customer, policy type..." }) => {
  return (
    <SearchBar
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      placeholder={placeholder}
    />
  );
};

export default PolicySearch;
