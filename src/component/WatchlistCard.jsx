// import PropTypes from "prop-types";
// import {
//   Box,
//   Image,
//   Heading,
//   Text,
//   Flex,
//   Button,
//   IconButton,
//   useToast,
// } from "@chakra-ui/react";
// import { CalendarIcon, SmallCloseIcon } from "@chakra-ui/icons";
// import { useNavigate } from "react-router-dom";
// import { useFirestore } from "../services/firestore";
// import { useAuth } from "../context/useAuth";

// const WatchlistCard = ({ movie }) => {
//   const navigate = useNavigate();
//   const toast = useToast();
//   const { removeFromWatchlist } = useFirestore();
//   const { user } = useAuth();

//   if (!movie) {
//     return null; // or some fallback UI
//   }

//   const { imdbID, Title, Poster, Released, imdbRating, Plot } = movie;

//   const handleRemove = async () => {
//     try {
//       await removeFromWatchlist(user.uid, imdbID);
//       toast({
//         title: "Movie removed from watchlist",
//         status: "info",
//         isClosable: true,
//       });
//     } catch (error) {
//       console.error("Error removing from watchlist:", error);
//       toast({
//         title: "Error removing from watchlist",
//         status: "error",
//         isClosable: true,
//       });
//     }
//   };

//   const handleDetails = () => {
//     navigate(`/details/${imdbID}`);
//   };

//   return (
//     <Box
//       maxW="md"
//       borderWidth="1px"
//       borderRadius="lg"
//       overflow="hidden"
//       m="3"
//       p="3"
//       boxShadow="md"
//     >
//       <Flex align="center" justify="space-between" mb="2">
//         <IconButton
//           icon={<SmallCloseIcon />}
//           aria-label="Remove from Watchlist"
//           onClick={handleRemove}
//           variant="ghost"
//           size="sm"
//         />
//       </Flex>
//       <Box onClick={handleDetails} cursor="pointer">
//         <Image src={Poster} alt={`Poster of ${Title}`} borderRadius="md" />
//         <Box p="4">
//           <Heading fontSize="md" mb="2">
//             {Title}{" "}
//             <Text as="span" color="gray.400">
//               ({Released})
//             </Text>
//           </Heading>
//           <Flex align="center" mb="2">
//             <CalendarIcon color="gray.400" mr="1" />
//             <Text fontSize="sm" color="gray.400">
//               {Released}
//             </Text>
//           </Flex>
//           <Text fontSize="sm" color="gray.600" mb="2">
//             {Plot}
//           </Text>
//           <Flex justify="space-between">
//             <Text fontSize="sm" color="gray.500">
//               IMDb Rating: {imdbRating}
//             </Text>
//             <Button size="sm" colorScheme="blue" onClick={handleDetails}>
//               View Details
//             </Button>
//           </Flex>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// WatchlistCard.propTypes = {
//   movie: PropTypes.shape({
//     imdbID: PropTypes.string,
//     Title: PropTypes.string,
//     Poster: PropTypes.string,
//     Released: PropTypes.string,
//     imdbRating: PropTypes.string,
//     Plot: PropTypes.string,
//   }),
// };

// export default WatchlistCard;
