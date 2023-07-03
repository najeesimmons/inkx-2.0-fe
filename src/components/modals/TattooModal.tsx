import {
  Card,
  Group,
  Modal,
  Stack,
  Text,
  Title,
  Image,
  rem,
  LoadingOverlay,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface TattooModalProps {
  opened: boolean;
  onClose(): void;
  tattoos: {}[];
  setTattoos: Dispatch<SetStateAction<{}[]>>;
  tattoosLoading: boolean;
  setTattoosLoading: Dispatch<SetStateAction<boolean>>;
  isMore: boolean;
  setIsMore: Dispatch<SetStateAction<boolean>>;
  getMoreTattoos(page: number): Promise<void>;
  page: number;
  limit: number;
}

export function TattooModal({
  opened,
  onClose,
  tattoos,
  setTattoos,
  tattoosLoading,
  setTattoosLoading,
  isMore,
  setIsMore,
  getMoreTattoos,
  page,
  limit,
}: TattooModalProps) {
  const [currentTattoo, setCurrentTattoo] = useState<{}>({});

  const carouselItems = tattoos.map((tattoo: any) => (
    <Carousel.Slide key={tattoo?.id}>
      <Card>
        <Group>
          <Card.Section>
            <Image
              src={tattoo?.imageUrl}
              alt={tattoo?.description}
              fit="contain"
              height={500}
            />
          </Card.Section>
          <Stack>
            <Title order={4}>{tattoo.artist.name}</Title>
          </Stack>
        </Group>
      </Card>
    </Carousel.Slide>
  ));

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      styles={{ root: { margin: "0 auto" } }}
      fullScreen
    >
      <Carousel
        align={"center"}
        onSlideChange={async (index: number) => {
          if (index % limit === 0 && index !== 0) {
            console.log("calling getMoreTattoos from TattooModal");
            await getMoreTattoos(page);
          }
        }}
      >
        {carouselItems}
      </Carousel>
    </Modal>
  );
}
