import tattoos from "@/pages/tattoos";
import { LoadingOverlay, Text } from "@mantine/core";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";

export default function TattooMasonry() {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  <InfiniteScroll
    dataLength={tattoos.length}
    loader={<LoadingOverlay visible={tattoosLoading} />}
    hasMore={isMore}
    endMessage={
      <p style={{ textAlign: "center" }}>
        <Text>There are no more tattoos to view.</Text>
      </p>
    }
    // next={async () => await getMoreTattoos(page)}
    next={() => setPage((prevPage) => prevPage + 1)}
  >
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={classes.myMasonryGrid}
      columnClassName={classes.myMasonryGridColumn}
    >
      {tattooGridItems}
    </Masonry>
  </InfiniteScroll>;
}
