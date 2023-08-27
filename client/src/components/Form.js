import {
  FormControl,
  Input,
  Textarea,
  Button,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addNoteAsync, updateNoteAsync } from "../redux/notes/notesSlice";
import { nanoid } from "@reduxjs/toolkit";

function Form() {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("f94144");
  const selectedNote = useSelector((state) => state.notes.selectedItem);
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    onSubmit: (values) => {
      if (selectedNote.title === "") {
        values = { ...values, color: selectedColor, id: nanoid() };
        dispatch(addNoteAsync(values));
      } else if (selectedNote.title !== "") {
        values = { ...values, color: selectedColor, id: selectedNote.id };
        dispatch(updateNoteAsync(values));
      }

      formik.values.title = "";
      formik.values.body = "";
      setSelectedColor("f94144");
    },
  });

  useEffect(() => {
    formik.values.title = selectedNote.title;
    formik.values.body = selectedNote.body;
    setSelectedColor(selectedNote.color);
  }, [selectedNote]);

  const changeColor = (color) => {
    setSelectedColor(color);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <Input
          placeholder="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          w={"300px"}
        />
        <Textarea
          placeholder="Write your notes here..."
          name="body"
          value={formik.values.body}
          onChange={formik.handleChange}
          mt={2}
        ></Textarea>
        <Flex justifyContent={"space-between"} p={2}>
          <HStack>
            <div
              className="color"
              style={{ backgroundColor: "#f94144" }}
              onClick={() => changeColor("f94144")}
            >
              {selectedColor === "f94144" && <CheckIcon color={"white"} />}
            </div>
            <div
              className="color"
              style={{ backgroundColor: "#f9844a" }}
              onClick={() => changeColor("f9844a")}
            >
              {selectedColor === "f9844a" && <CheckIcon color={"white"} />}
            </div>
            <div
              className="color"
              style={{ backgroundColor: "#f9c74f" }}
              onClick={() => changeColor("f9c74f")}
            >
              {selectedColor === "f9c74f" && <CheckIcon color={"white"} />}
            </div>
            <div
              className="color"
              style={{ backgroundColor: "#43aa8b" }}
              onClick={() => changeColor("43aa8b")}
            >
              {selectedColor === "43aa8b" && <CheckIcon color={"white"} />}
            </div>
            <div
              className="color"
              style={{ backgroundColor: "#4d908e" }}
              onClick={() => changeColor("4d908e")}
            >
              {selectedColor === "4d908e" && <CheckIcon color={"white"} />}
            </div>
          </HStack>
          {selectedNote.title === "" ? (
            <Button type="submit" colorScheme="green">
              Save
            </Button>
          ) : (
            <Button type="submit" colorScheme="green">
              Update
            </Button>
          )}
        </Flex>
      </FormControl>
    </form>
  );
}

export default Form;
