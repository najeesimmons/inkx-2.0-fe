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
  type Tattoo = {};
  const { classes } = useStyles();
  const [tattoos, setTattoos] = useState<{}[]>([]);
  const [tattoosLoading, setTattoosLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isMore, setIsMore] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [limit, setLimit] = useState(5);

  const [opened, { open, close }] = useDisclosure(false);

  const parseTattoos = (data: any) => {
    return data.map((d: any) => {
      return {
        id: d?.data?.id,
        description: d?.data?.description,
        imageUrl: d?.data?.image?.url,
        artist: {
          _id: d?.data?.artist?.id,
          name: d?.data?.artist?.name,
          username: d?.data?.artist?.username,
          artist_image: d?.data?.artist?.image_url,
          artist_id: d?.data?.artist?.artist_id,
        },
        city: d?.data?.shop?.address?.city,
        country: d?.data?.shop?.address?.country,
      };
    });
  };

  const getTattoos = useCallback(async (page: number) => {
    try {
      const response = await fetch(
        `https://backend-api.tattoodo.com/api/v2/feeds/explore?&${limit}=5&page=${page}`
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
  }, []);

  const getMoreTattoos = async (page: number) => {
    console.log("getMoreTattoos");
    const { isMore, data, error, nextPage } = await getTattoos(page);

    if (error) {
      console.error("An error occurred");
      setError(true);
      return;
    }
    setTattoos((prevTattoos) => [...prevTattoos, ...data]);
    setPage(nextPage);
    setIsMore(isMore);
  };

  useEffect(() => {
    async function fetchData() {
      setTattoosLoading(true);
      const { isMore, data, error, nextPage } = await getTattoos(1);

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

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
      <TattooModal
        onClose={close}
        opened={opened}
        tattoos={tattoos}
        setTattoos={setTattoos}
        tattoosLoading={tattoosLoading}
        setTattoosLoading={setTattoosLoading}
        isMore={isMore}
        setIsMore={setIsMore}
        getMoreTattoos={getMoreTattoos}
        page={page}
      />
      <InfiniteScroll
        dataLength={tattoos.length}
        loader={<LoadingOverlay visible={tattoosLoading} />}
        hasMore={isMore}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <Text>There are no more tattoos to view.</Text>
          </p>
        }
        next={async () => await getMoreTattoos(page)}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={classes.myMasonryGrid}
          columnClassName={classes.myMasonryGridColumn}
        >
          {tattooGridItems}
        </Masonry>
      </InfiniteScroll>
    </>
  );
}
