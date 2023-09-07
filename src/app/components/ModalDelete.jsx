import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";

export default function ModalDelete() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const router = useRouter()

  async function handleDelete(e) {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8088/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push('/')
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  return (
    <>
      <Button onClick={onOpen} className="bg-red-400 hover:bg-red-500">
        Delete Blog
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent className="text-black">
          <ModalHeader>Delete Blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleDelete}>
              <Text>
                Are you sure want to delete this blog?
              </Text>
              <ModalFooter>
                <Button
                  mt={4}
                  colorScheme="red"
                  type="submit"
                  className="bg-red-500"
                >
                  Delete
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
