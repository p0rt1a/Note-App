import { useDispatch, useSelector } from "react-redux";
import { getNotesAsync, selectNote } from "../redux/notes/notesSlice";
import { useEffect } from "react";
import { Flex, Box, Heading } from "@chakra-ui/react";

function Notes() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.items);

  useEffect(() => {
    dispatch(getNotesAsync());
  }, [dispatch]);

  return (
    <Flex gap={5} wrap={"wrap"}>
      {notes.map((item, i) => {
        return (
          <Box
            key={i}
            p={2}
            pr={10}
            backgroundColor={`#${item.color}`}
            borderRadius={"2px"}
            onClick={() => dispatch(selectNote(item))}
          >
            <Heading as="h3" fontWeight={2} size={"md"} color={"white"}>
              {item.title}
            </Heading>
          </Box>
        );
      })}
    </Flex>
  );
}

export default Notes;
