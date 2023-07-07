import { useState } from "react";

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

// TODO: setPage to nextPage as returned from useTattoos wherever hook is implemented
//   setPage(nextPage);

// TODO: originally wrapped getTattos in useCallback before componetization, would it have any benefit here?
const useTattoos = async (page: number, limit: number) => {
  const [isMore, setIsMore] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [tattoos, setTattoos] = useState<{}[]>([]);
  const [tattoosLoading, setTattoosLoading] = useState<boolean>(true);
  try {
    setTattoosLoading(true);
    const response = await fetch(
      `https://backend-api.tattoodo.com/api/v2/feeds/explore?&limit=${limit}&page=${page}`
    );
    const data = await response.json();
    const isMore = page !== data?.meta?.pagination?.total_pages;
    const parsedTattoos = parseTattoos(data.data);
    setTattoos((prevTattoos) => [...prevTattoos, ...parsedTattoos]);
    // TODO: curious about need to use useState to setIsMore, rather than just return isMore var
    setIsMore(isMore);
    setTattoosLoading(false);
    return {
      isMore: isMore,
      tattoos: tattoos,
      tattoosLoading: tattoosLoading,
      error: false,
      nextPage: page + 1,
    };
  } catch (error) {
    setError(true);
    console.log("error:", error);
    setTattoosLoading(false);
    return {
      isMore: false,
      tattoos: tattoos,
      tattoosLoading: tattoosLoading,
      error: true,
      nextPage: page + 1,
    };
  }
};

export { useTattoos };
