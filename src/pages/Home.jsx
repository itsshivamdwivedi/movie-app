import { useState, useEffect } from "react";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Text,
 
} from "@chakra-ui/react";
import CardComponent from "../component/CardComponent"; 
import { fetchMovies } from "../services/Api"; 
import Pagination from "../component/Pagination"; 

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState("kabhi");   // Displaying the movies related to Keyword Kabhi

  useEffect(() => {
    const fetchMoviesData = async () => {
      setLoading(true);
      const result = await fetchMovies(query, currentPage);
      setMovies(result.movies);
      setTotalResults(result.totalResults);
      setLoading(false);
    };

    fetchMoviesData();
  }, [query, currentPage]);

  return (
    <Container maxW={"container.xl"} py={8}>
      <Flex alignItems={"baseline"} gap={4} mb={8}>
        <Heading as="h2" fontSize={"2xl"} textTransform={"uppercase"} mb={4}>
           Movies
        </Heading>
      </Flex>
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
          : !loading && <Text>No movies found</Text>}
      </Grid>
      <Pagination
        currentPage={currentPage}
        totalResults={totalResults}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Container>
  );
};

export default Home;
