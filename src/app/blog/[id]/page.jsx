"use client";

import ModalDelete from "@/app/components/ModalDelete";
import ModalEdit from "@/app/components/ModalEdit";
import { Container, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8088/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <Container maxW={"3xl"} centerContent className="py-10">
          <div className="flex flex-row gap-8">
          <ModalEdit dataTitle={data.title} dataContent={data.content}/>
          <ModalDelete />
          </div>
          <Text className="my-10">{data.title}</Text>
          {data.content}
        </Container>
      )}
    </>
  );
}
