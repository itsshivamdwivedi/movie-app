import { useState } from "react";
import { Container, Flex, Heading, Input, Grid, Skeleton, Text } from "@chakra-ui/react";
import CardComponent from "../../component/CardComponent"; // Adjust the path as necessary
import { searchMovies } from "../../services/Api"; // Adjust the path as necessary
import Pagination from "../../component/Pagination";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false); // New state to track search attempts
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearchAttempted(true); // Set search attempted to true
    const { movies, totalResults } = await searchMovies(searchValue);
    setMovies(movies);
    setTotalResults(totalResults);
    setLoading(false);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const handlePageChange = async (page) => {
    setLoading(true);
    const { movies } = await searchMovies(searchValue, page);
    setMovies(movies);
    setLoading(false);
    setCurrentPage(page);
    
  };

  return (
    <Container maxW="container.xl">
      <Flex alignItems="baseline" gap={4} mb={8}>
        <Heading as="h2" fontSize="2xl" textTransform="uppercase" mb={4}>
          Movies
        </Heading>
      </Flex>
      <form onSubmit={handleSearch}>
        <Input
          placeholder="Search For Movies"
          _placeholder={{ color: "gray.600" }}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          mb={4}
        />
      </form>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={6}
      >
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Skeleton height="400px" key={index} />
            ))
          : movies.length > 0
          ? movies.map((movie) => (
              <CardComponent key={movie.imdbID} item={movie} />
            ))
          : searchAttempted && <Text>No movies found</Text>} {/* Conditionally display the message */}
      </Grid>
      {movies.length > 0 && !loading && (
  <Pagination
    currentPage={currentPage}
    totalPages={Math.ceil(totalResults / 10)} // Adjust as per your API results per page
    onPageChange={handlePageChange}
  />
)}
    </Container>
  );
};

export default Search;