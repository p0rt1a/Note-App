import { useSelector } from "react-redux";
import Form from "./components/Form";
import Notes from "./components/Notes";
import { Container, Flex, Divider, Heading, Input } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { getNotesAsync } from "./redux/notes/notesSlice";

function App() {
  const color = useSelector((state) => state.notes.selectedItem.color);
  const dispatch = useDispatch();

  const search = (text) => {
    dispatch(getNotesAsync(text));
  };

  return (
    <Flex alignItems={"center"} justifyContent={"center"} h={"100vh"}>
      <Container maxW={"container.sm"}>
        <Heading
          as="h1"
          size={"lg"}
          backgroundColor={`#${color}`}
          py={5}
          textAlign={"center"}
          style={{ transition: "1s" }}
          mb={10}
          borderRadius={"8px"}
          color={"white"}
        >
          NotesApp
        </Heading>

        <Flex alignItems={"center"} justifyContent={"center"} mb={5} gap={2}>
          <Input
            w={"250px"}
            placeholder="Search..."
            onChange={(e) => search(e.target.value)}
          />
          <Search2Icon color={"blue.600"} />
        </Flex>

        <Form />
        <Divider my={5} />
        <Notes />
      </Container>
    </Flex>
  );
}

export default App;
