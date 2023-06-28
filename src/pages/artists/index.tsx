import { useCallback, useEffect, useState } from "react";
import { Image, LoadingOverlay, SimpleGrid, Title, createStyles, Text } from "@mantine/core";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = createStyles((theme) => ({
  artistImage: {
    
  }
 }))

export default function Artists() {
    const [isMore, setIsMore] = useState<boolean>(true);
    const [artists, setArtists] = useState<{}[]>([]);
    const [artistsLoading, setArtistsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    const parseArtists = (data: any) =>
    data.map((d: any) => {
      return {
        _id: d?.user_id,
        name: d?.name,
        username: d?.username,
        imageUrl: d?.image_url,
        portfolio: d?.portfolio_preview,
        location: {
          shop_name: d?.current_shop?.name,
          zip_code: d?.current_shop?.address?.zip_code,
          city: d?.current_shop?.address?.city,
          state: d?.current_shop?.address?.state,
          country: d?.current_shop?.address?.country,
          latitude: d?.location?.latitude,
          longitude: d?.location?.longitude,
          allow_bookings: d?.allow_bookings,
          availability: d?.availability,
        },
      };
    });

    const getArtists = useCallback(
        async (page: number) => {
          try {
            const city: any = {};
            const { lat, lon } = city;
    
            const fetchURL = new URL(`https://backend-api.tattoodo.com/api/v2/search/artists/bookable`);
            const params = new URLSearchParams({
              page: page,
              limit: 24,
              ...(lat && { lat }),
              ...(lon && { lon }),
            });
    
            const response = await fetch(`${fetchURL.href}?${params.toString()}`);
            const data = await response.json();
            const isMore = page !== data?.meta?.pagination?.total_pages;
            const parsedData = parseArtists(data.data);
    
            return {
              isMore,
              data: parsedData,
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

      const getMoreArtists = async (page: number) => {
        const { isMore, data, error, nextPage } = await getArtists(page);
    
        if (error) {
          console.error("An error occurred");
          setError(true);
          return;
        }
    
        setArtists((prevArtists) => [...prevArtists, ...data]);
        setPage(nextPage);
        setIsMore(isMore);
      };
    
      useEffect(() => {
        async function fetchData() {
          setArtistsLoading(true);
          const { isMore, data, error, nextPage } = await getArtists(1);
    
          if (error) {
            console.error("An error occurred");
            setError(true);
            return;
          }
          setArtists(data);
          setPage(nextPage);
          setIsMore(isMore);
          setArtistsLoading(false);
        }
    
        fetchData();
      }, [getArtists]);
    
      if (!artistsLoading && error) {
        return <div>There was an error.</div>;
      }
    
      if (!artistsLoading && artists.length === 0) {
        return (
          <div style={{ textAlign: "center" }}>Sorry, there are no artists.</div>
        );
      }

        return (
            <>
              <Title order={2}>Find Artists</Title>
              <InfiniteScroll
                dataLength={artists.length}
                next={async () => await getMoreArtists(page)}
                hasMore={isMore}
                loader={<LoadingOverlay visible={artistsLoading}/>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <Text>Yay! You have seen it all</Text>
                  </p>
                }
              >
                <SimpleGrid cols={4} spacing="sm" verticalSpacing="sm"
                 breakpoints={[
                    { minWidth: 'sm', cols: 2 },
                    { minWidth: 'md', cols: 3 },
                    { minWidth: 1200, cols: 4 },
                  ]}>
                {artists.map((artist: any) => {
                  return (
                        <Image
                          key={artist._id}
                          src={artist.imageUrl}
                          alt={artist.username}
                          height={250}
                          width={250}
                        />
                );
                })}
                </SimpleGrid>
              </InfiniteScroll>
             
             </>
          );
        };
