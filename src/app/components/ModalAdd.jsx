import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ModalAdd() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch("http://localhost:8088/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setData({
        title: "",
        content: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  return (
    <>
      <Button onClick={onOpen} className="bg-gray-300">
        Create Blog
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent className="text-black">
          <ModalHeader>Create New Blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Your title"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                />
                <FormLabel className="mt-6">Content</FormLabel>
                <Textarea
                  placeholder="Your content"
                  name="content"
                  value={data.content}
                  onChange={handleChange}
                />
              </FormControl>
              <ModalFooter>
                <Button
                  mt={4}
                  colorScheme="teal"
                  type="submit"
                  className="bg-black"
                >
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
