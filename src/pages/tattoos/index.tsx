import { LoadingOverlay, Text } from "@mantine/core";
import { useState } from "react";
import { TattooModal } from "@/components/modals/TattooModal";
import { useDisclosure } from "@mantine/hooks";
import { useTattoos } from "@/hooks/useTattoos";
import TattooMasonry from "@/components/TattooMasonry";

export default async function Tattoos() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState(5);

  const { isMore, tattoos, tattoosLoading, error, nextPage } = await useTattoos(
    page,
    limit
  );

  // TODO: index and TattooModal need to share a PARENT that manages the state of the tattoos array and "page"
  const [opened, { open, close }] = useDisclosure(false);

  if (tattoosLoading) return <LoadingOverlay visible={tattoosLoading} />;
  if (error) return <Text>Error</Text>;

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
