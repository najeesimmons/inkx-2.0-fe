import {
  Image,
  LoadingOverlay,
  Text,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import { TattooModal } from "@/components/modals/TattooModal";
import { useDisclosure } from "@mantine/hooks";
import { Console } from "console";

const useStyles = createStyles((theme) => ({
  myMasonryGrid: {
    display: "flex",
    marginLeft: "-10px",
    width: "auto",
  },
  myMasonryGridColumn: {
    paddingLeft: "10px",
    backgroundClip: "padding-box",
  },
  myMasonryGridItems: {
    borderRadius: "5px",
    display: "block",
    margin: "5px",
  },
}));

export default function Tattoos() {
  const { classes } = useStyles();

  const [page, setPage] = useState<number>(1);

  const [limit, setLimit] = useState(5);
  // TODO: setIsMore, setError, tattoosLoading, and tattoos will become obsolete ater implemetntation of useTattoos hook, only "page" and "limit" will be needed
  // TODO: call useTattoos hook here, pass in the "page", destructure out vars, in useTattoos, also reutrn tattoos array
  // TODO: index and TattooModal need to share a PARENT that manages the state of the tattoos array and "page"
  const [opened, { open, close }] = useDisclosure(false);

  // TODO: Refactor this to use the useTattoos hook, return same variables AND loading state (isLoading)
  const getTattoos = useCallback(
    async (page: number) => {
      try {
        const response = await fetch(
          `https://backend-api.tattoodo.com/api/v2/feeds/explore?&limit=${limit}&page=${page}`
        );
        const data = await response.json();
        const isMore = page !== data?.meta?.pagination?.total_pages;
        const parsedTattoos = parseTattoos(data.data);
        return {
          isMore,
          data: parsedTattoos,
          error: false,
          nextPage: page + 1,
        };
      } catch (error) {
        return {
          isMore: false,
          data: [],
          error: true,
          nextPage: page + 1,
        };
      }
    },
    [limit]
  );

  // TODO: After creating useTattoos hook, remove this useEffect
  useEffect(() => {
    async function fetchData() {
      setTattoosLoading(true);
      const { isMore, data, error, nextPage } = await getTattoos(page);

      if (error) {
        console.error("An error occurred");
        setError(true);
        return;
      }
      setTattoos(data);
      setPage(nextPage);
      setIsMore(isMore);
      setTattoosLoading(false);
    }

    fetchData();
  }, [getTattoos]);

  const tattooGridItems = tattoos.map((tattoo: any) => {
    return (
      <UnstyledButton key={tattoo.id} onClick={open}>
        <Image
          key={tattoo.id}
          src={tattoo.imageUrl}
          alt={tattoo.description}
          classNames={{ image: classes.myMasonryGridItems }}
          width={250}
        />
      </UnstyledButton>
    );
  });

  return (
    <>
      <TattooModal
        onClose={close}
        opened={opened}
        tattoos={tattoos}
        getMoreTattoos={getMoreTattoos}
        page={page}
        setPage={setPage}
        limit={limit}
      />
    </>
  );
}
