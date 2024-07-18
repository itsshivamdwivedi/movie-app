import { Button, HStack } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderButtons = () => {
    const buttons = [];
    const maxButtons = 5; // Maximum number of buttons to display

    // This is the Logic to determine which page numbers to display
    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          colorScheme={i === currentPage ? "teal" : "gray"}
        >
          {i}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <HStack mt={8} justifyContent="center">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        Previous
      </Button>
      {renderButtons()}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      >
        Next
      </Button>
    </HStack>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
