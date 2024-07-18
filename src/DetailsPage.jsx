import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CalendarIcon, CheckCircleIcon, SmallAddIcon } from "@chakra-ui/icons";
import { useAuth } from "./context/useAuth";
import { useFirestore } from "./services/firestore";
import { fetchMovieDetails } from "./services/Api";

const DetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToWatchlist, checkIfInWatchlist, removeFromWatchlist } = useFirestore();
  const toast = useToast();

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailsData = await fetchMovieDetails(id);
        setDetails(detailsData);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSaveToWatchlist = async () => {
    if (!user) {
      toast({
        title: "Login to add to watchlist",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const isSetToWatchlist = await checkIfInWatchlist(user.uid, details.imdbID);
    if (isSetToWatchlist) {
      toast({
        title: "Item already in watchlist",
        status: "info",
        isClosable: true,
      });
      return;
    }

    const data = {
      id: details.imdbID,
      title: details.Title,
      poster: details.Poster,
      overview: details.Plot,
    };

    await addToWatchlist(user.uid, details.imdbID, data);
    setIsInWatchlist(true);
    toast({
      title: "Movie added to watchlist",
      duration:"5000",
      status: "success",
      isClosable: true,
    });
  };

  useEffect(() => {
    if (!user) {
      setIsInWatchlist(false);
      return;
    }

    checkIfInWatchlist(user.uid, id).then((data) => {
      setIsInWatchlist(data);
    });
  }, [id, user, checkIfInWatchlist]);

  const handleRemoveFromWatchlist = async () => {
    await removeFromWatchlist(user.uid, id);
    const isSetToWatchlist = await checkIfInWatchlist(user.uid, id);
    setIsInWatchlist(isSetToWatchlist);

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

  if (!details) {
    return (
      <Box p={4}>
        <Text>No details found.</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Box>
        <Container maxW="container.xl" p={4}>
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: 6, md: 10 }}
            alignItems={{ base: "center", md: "flex-start" }}
          >
            <Image
              src={details.Poster}
              alt={details.Title}
              maxW={{ base: "80%", md: "50%" }}
              borderRadius="lg"
              boxShadow="lg"
            />
            <Box flex="1">
              <Heading as="h2" size="xl" mb={4}>
                {details.Title}
              </Heading>
              <Flex gap={2} alignItems="center" mb={3}>
                <CalendarIcon />
                <Text>{details.Released}</Text>
              </Flex>
              <Flex gap={2} alignItems="center" mb={3}>
                <CircularProgress
                  value={parseFloat(details.imdbRating) * 10}
                  color="green.400"
                  size="40px"
                >
                  <CircularProgressLabel>
                    {details.imdbRating}
                  </CircularProgressLabel>
                </CircularProgress>
                <Text>IMDB Rating</Text>
              </Flex>
              <Flex>
                {isInWatchlist ? (
                  <Button
                    leftIcon={<CheckCircleIcon />}
                    colorScheme="green"
                    variant={"solid"}
                    onClick={handleRemoveFromWatchlist}
                  >
                    Added
                  </Button>
                ) : (
                  <Button
                    leftIcon={<SmallAddIcon />}
                    colorScheme="blue"
                    variant={"solid"}
                    onClick={handleSaveToWatchlist}
                  >
                    Add to Watchlist
                  </Button>
                )}
              </Flex>
              <Text color="gray.400" mt={5} fontSize={{ base: "sm", md: "md" }}>
                {details.Plot}
              </Text>
              <Flex mt={3} gap={3}>
                {details.Genre.split(", ").map((genre) => (
                  <Badge key={genre} colorScheme="blue">
                    {genre}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default DetailsPage;
