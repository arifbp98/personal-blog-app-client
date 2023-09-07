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
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModalEdit({dataTitle, dataContent}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState({
    title: "",
    content: "",
  });
  const { id } = useParams();

  useEffect(() => {
    setData({
      title: dataTitle,
      content: dataContent,
    });
  }, [dataTitle, dataContent]);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8088/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      window.location.reload();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  return (
    <>
      <Button onClick={onOpen} className="bg-gray-300 hover:bg-gray-400">
        Edit Blog
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent className="text-black">
          <ModalHeader>Edit Your Blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Your title"
                  name="title"
                  defaultValue={dataTitle}
                  onChange={handleChange}
                />
                <FormLabel className="mt-6">Content</FormLabel>
                <Textarea
                  placeholder="Your content"
                  name="content"
                  defaultValue={dataContent}
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
                  Edit
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
