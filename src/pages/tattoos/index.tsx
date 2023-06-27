import { Image, LoadingOverlay, Text, createStyles} from "@mantine/core"
import { useCallback, useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = createStyles((theme) => ({
    myMasonryGrid: {
      display: 'flex',
      marginLeft: '-10x',
      width: 'auto',
    },
    myMasonryGridColumn: {
      paddingLeft: '10px',
      backgroundClip: 'padding-box',
    },
    myMasonryGridItems: {
      borderRadius: '20px',
      display: 'block',
      marginBottom: '5px',
    },
  }));

export default function Tattoos() {

    const { classes } = useStyles();
    const [tattoos, setTattoos] = useState([]);
    const [tattoosLoading, setTattoosLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [isMore, setIsMore] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    
    const getTattoos = useCallback (
      async (page: number) => {
      try {
        const response = await fetch(`https://backend-api.tattoodo.com/api/v2/feeds/explore?&limit=50&page=${page}`)
        const data = await response.json()
        const isMore = page !== data?.meta?.pagination?.total_pages;
        return {
          isMore,
          data: data.data,
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
    []
  );

  const getMoreTattoos = async (page: number) => {
    const { isMore, data, error, nextPage } = await getTattoos(page);

    if (error) {
      console.error("An error occurred");
      setError(true);
      return;
    }

    setTattoos((prev) => [...prev, ...data]);
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
   
    const fetchedTattoos = tattoos.map((tattoo: any) => {
        return (
            <Image key={tattoo.data.id} src={tattoo.data.image.url} alt={tattoo.data.description} className={classes.myMasonryGridItems}/>)
        })

        const breakpointColumnsObj = {
            default: 4,
            1100: 3,
            700: 2,
            500: 1
          };

        if (tattoosLoading) return <LoadingOverlay visible={tattoosLoading}/>
        
    return (
            <>
              <InfiniteScroll
              dataLength={tattoos.length}
              loader={<LoadingOverlay visible={tattoosLoading}/>}
              hasMore={isMore}
              endMessage={
                  <p style={{ textAlign: 'center' }}>
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
                    {fetchedTattoos}
               </Masonry>
            </InfiniteScroll>
            </>
    )}