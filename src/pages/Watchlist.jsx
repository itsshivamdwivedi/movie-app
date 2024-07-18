import  { useEffect, useState } from "react";
import { Box, Button, Container, Flex, Heading, Image, Spinner, Text, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useFirestore } from "../services/firestore";

const Watchlist = () => {
  const { user } = useAuth();
  const { getWatchlist, removeFromWatchlist } = useFirestore();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (user) {
        const watchlistData = await getWatchlist(user.uid);
        setWatchlist(watchlistData);
        setLoading(false);
      }
    };
    fetchWatchlist();
  }, [user, getWatchlist]);

  const handleRemoveFromWatchlist = async (movieId) => {
    await removeFromWatchlist(user.uid, movieId);
    setWatchlist((prevWatchlist) => prevWatchlist.filter((movie) => movie.id !== movieId));
    toast({
      title: "Movie removed from watchlist",
      status: "info",
      isClosable: true,
    });
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Container maxW="container.xl" p={4}>
      <Heading as="h2" size="xl" mb={4}>
        Your Watchlist
      </Heading>
      <Flex direction="column" gap={4}>
        {watchlist.map((movie) => (
          <Flex key={movie.id} alignItems="center" gap={4} p={4} borderWidth={1} borderRadius="lg">
            <Image src={movie.poster} alt={movie.title} boxSize="100px" objectFit="cover" borderRadius="md" />
            <Box>
              <Heading as="h3" size="md">
                {movie.title}
              </Heading>
              <Text mt={2}>{movie.overview}</Text>
              <Flex mt={4} gap={4}>
                <Button as={Link} to={`/details/${movie.id}`} colorScheme="blue">
                  View Details
                </Button>
                <Button colorScheme="red" onClick={() => handleRemoveFromWatchlist(movie.id)}>
                  Remove
                </Button>
              </Flex>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Container>
  );
};

export default Watchlist;
