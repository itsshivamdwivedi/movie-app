import PropTypes from 'prop-types';
import { Box, Text, Heading,  } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


const CardComponent = ({ item }) => {
  const imageUrl = item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/300x450.png?text=No+Image';
  const { Title, Year, Genre } = item;

  return (
    <Link to={`/details/${item.imdbID}`}>
      <Box
        borderWidth={1}
        borderRadius={'lg'}
        overflow={'hidden'}
        boxShadow={'lg'}
        _hover={{
          transform: 'scale(1.05)',
          transition: '0.3s',
          boxShadow: 'xl',
        }}
        transition="transform 0.3s"
      >
        <Box
          height="300px"
          bgImage={`url(${imageUrl})`}
          bgPosition="center"
          bgSize="cover"
          bgRepeat="no-repeat"
          color={"aqua"}
        ></Box>
        <Box p={4}>
          <Heading as="h3" fontSize={'lg'} mb={2}>
            {Title}
          </Heading>
          <Text fontSize={'sm'} color={'gray.300'} mb={2}>
            {Year} | {Genre}
          </Text>
        
        </Box>
      </Box>
    </Link>
  );
};

CardComponent.propTypes = {
  item: PropTypes.shape({
    Poster: PropTypes.string,
    Title: PropTypes.string,
    Year: PropTypes.string,
    Genre: PropTypes.string,
    imdbID: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardComponent;
