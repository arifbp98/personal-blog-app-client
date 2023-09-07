"use client";

import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import ModalAdd from "./components/ModalAdd";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8088/api/blogs")
      .then((res) => res.json())
      .then((data) => setData(data));
    setLoading(false);
  }, []);

  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Personal {""}
            <Text as={"span"} color={"green.400"}>
              Blog
            </Text>
            <hr className="mt-4" />
          </Heading>
          <ModalAdd />
        </Stack>
        {loading ? (
          "Loading..."
        ) : (
          <>
            {data.map((blog) => (
              <UnorderedList key={blog.id} className="py-2">
                <ListItem>
                  <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                </ListItem>
                <p>{blog.updatedAt}</p>
              </UnorderedList>
            ))}
          </>
        )}
      </Container>
    </>
  );
}
