import { LoadingOverlay, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { TattooModal } from "@/components/modals/TattooModal";
import { useDisclosure } from "@mantine/hooks";
import { useTattoos } from "@/hooks/useTattoos";
import TattooMasonry from "@/components/TattooMasonry";

export default function Tattoos() {
  const [opened, { open, close }] = useDisclosure(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState(5);

  const { tattoos, isMore, error, loading, nextPage, fetchData } = useTattoos();
  console.log({ tattoos, isMore, error, loading, nextPage });

  useEffect(() => {
    fetchData(1, limit);
  }, []);

  // if (loading) return <LoadingOverlay visible={loading} />;
  // if (error) return <Text>Error</Text>;

  return (
    <>
      {/* <TattooMasonry
        tattoos={tattoos}
        tattoosLoading={loading}
        isMore={isMore}
        currentPage={currentPage}
        setPage={setPage}
        open={open}
        error={error}
      /> */}
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
