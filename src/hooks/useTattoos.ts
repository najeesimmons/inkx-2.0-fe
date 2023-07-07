import { useCallback, useEffect, useState } from "react";

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

export function useTattoos() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{
    isMore: boolean;
    error: boolean;
    tattoos: any[];
    nextPage: number;
  }>({
    isMore: true,
    tattoos: [],
    error: false,
    nextPage: 2,
  });

  const fetchData = useCallback(async (page: number, limit: number) => {
    try {
      console.log("fetchData called... page:", page);
      setLoading(true);
      const apiResponse = await fetch(
        `https://backend-api.tattoodo.com/api/v2/feeds/explore?&limit=${limit}&page=${page}`
      );
      const data = await apiResponse.json();
      const isMore = page !== data?.meta?.pagination?.total_pages;
      const parsedTattoos = parseTattoos(data.data);

      setResponse((prevResponse) => ({
        isMore,
        tattoos: [...prevResponse.tattoos, ...parsedTattoos],
        error: false,
        nextPage: page + 1,
      }));
    } catch (error) {
      console.log("error:", error);

      setResponse((prevResponse) => ({
        ...prevResponse,
        error: true,
      }));
    } finally {
      setLoading(false);
    }
  }, []);

  return { ...response, loading, fetchData };
}
