import SearchBar from "../ui/SearchBar";

const CustomerSearch = ({ searchQuery, setSearchQuery, placeholder = "Search by name, email, phone, or customer ID..." }) => {
  return (
    <SearchBar
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      placeholder={placeholder}
    />
  );
};

export default CustomerSearch;
