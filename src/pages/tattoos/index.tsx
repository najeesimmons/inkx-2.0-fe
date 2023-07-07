import { LoadingOverlay, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { TattooModal } from "@/components/modals/TattooModal";
import { useDisclosure } from "@mantine/hooks";
import useTattoos from "@/hooks/useTattoos";
import TattooMasonry from "@/components/TattooMasonry";

export default async function Tattoos() {
  const [opened, { open, close }] = useDisclosure(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState(5);

  // TODO: need to make useTattoos call async. I can't make the react function an async fn
  const { isMore, tattoos, tattoosLoading, error, nextPage } = await useTattoos(
    page,
    limit
  );

  if (tattoosLoading) return <LoadingOverlay visible={tattoosLoading} />;
  if (error) return <Text>Error</Text>;

  console.log("tattoos:", tattoos);
  return (
    <>
      <TattooMasonry
        tattoos={tattoos}
        tattoosLoading={tattoosLoading}
        isMore={isMore}
        page={page}
        setPage={setPage}
        open={open}
        error={error}
      />
      {/* <TattooModal
        tattoos={tattoos}
        tattoosLoading={tattoosLoading}
        onClose={close}
        opened={opened}
        page={page}
        setPage={setPage}
      /> */}
    </>
  );
}
