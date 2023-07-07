import { useTattoos } from "@/hooks/useTattoos";
import tattoos from "@/pages/tattoos";
import {
  LoadingOverlay,
  Text,
  UnstyledButton,
  createStyles,
  Image,
} from "@mantine/core";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";

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

export default function TattooMasonry() {
  const { classes } = useStyles();
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

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
    <InfiniteScroll
      dataLength={tattoos.length}
      loader={<LoadingOverlay visible={tattoosLoading} />}
      hasMore={isMore}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <Text>There are no more tattoos to view.</Text>
        </p>
      }
      next={() => setPage((prevPage) => prevPage + 1)}
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.myMasonryGrid}
        columnClassName={classes.myMasonryGridColumn}
      >
        {tattooGridItems}
      </Masonry>
    </InfiniteScroll>
  );
}
