import {
  Avatar,
  Box,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  DrawerBody,
  IconButton,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,


} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { HamburgerIcon,SearchIcon } from "@chakra-ui/icons";


const Navbar = () => {
  // Access components from the useAuth hook
  const { user, signInWithGoogle, logout } = useAuth();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("success");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Box py="4" mb="2">
      <Container maxW="container.xl">
        <Flex justifyContent={"space-between"}>
          <Link to="/">
            <Box
              fontSize={"3xl"}
              fontWeight={"bold"}
              color={"red"}
              fontFamily={"mono"}
            >
              Authenticate
            </Box>
          </Link>
          {/* This is for desktop version as of now */}
          <Flex
            gap="4"
            alignItems={"center"}
            display={{ base: "none", md: "flex" }}
          >
            <Link to="/">Home</Link>
            <Link to="/search">
              <SearchIcon
                fontSize={"xl"}
                color={"blue"}
                _hover={{
                  color: "green.400",
                  transform: "scale(2.05)",
                  transition: "0.3s",
                  boxShadow: "xl",
                }}
                transition="transform 0.3s"
              />
            </Link>
            {user ? (
              // Menu button imported from Chakra UI
              <Menu>
                <MenuButton>
                  {/* Avatar is a component from Chakra UI */}
                  <Avatar
                    bg={"red"}
                    color={"white"}
                    size={"sm"}
                    name={user?.email}
                    _hover={{
                      color: "green.400",
                      transform: "scale(2.05)",
                      transition: "0.3s",
                      boxShadow: "xl",
                    }}
                    transition="transform 0.3s"
                  />
                </MenuButton>
                <MenuList>
                  <Link to="/watchlist">
                    <MenuItem>Watchlist</MenuItem>
                  </Link>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Avatar
                size={"sm"}
                bg={"blue.500"}
                as={"button"}
                _hover={{
                  color: "green.400",
                  transform: "scale(2.05)",
                  transition: "0.3s",
                  boxShadow: "xl",
                }}
                transition="transform 0.3s"
                onClick={handleGoogleLogin}
              />
            )}
          </Flex>
          <Flex
            display={{ base: "flex", md: "none" }}
            alignItems={"center"}
            gap="4"
          >
            <Link to="/search">
              <SearchIcon fontSize={"xl"} />
            </Link>
            <IconButton onClick={onOpen} icon={<HamburgerIcon />} />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bg={"black"}>
                <DrawerCloseButton />
                <DrawerHeader>
                  {user ? (
                    <Flex alignItems="center" gap="2">
                      <Avatar bg="red.500" size={"sm"} name={user?.email} />
                      <Box fontSize={"sm"}>
                        {user?.displayName || user?.email}
                      </Box>
                    </Flex>
                  ) : (
                    <Avatar
                      size={"sm"}
                      bg="gray.800"
                      as="button"
                      onClick={handleGoogleLogin}
                    />
                  )}
                </DrawerHeader>

                <DrawerBody>
                  <Flex flexDirection={"column"} gap={"4"} onClick={onClose}>
                    <Link to="/" style={{ color: "blue" }}>Home</Link>
                    {user && (
                      <>
                        <Link to="/watchlist" style={{ color: "blue" }}>Watchlist</Link>
                        <Button
                          variant={"outline"}
                          colorScheme="red"
                          onClick={logout}
                        >
                          Logout
                        </Button>
                      </>
                    )}
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
