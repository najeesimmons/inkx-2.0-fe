import { Card, Group, Modal, Stack, Title, Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

interface TattooModalProps {
  opened: boolean;
  onClose(): void;
  tattoos: {}[];
  tattoosLoading: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export function TattooModal({ opened, onClose, tattoos }: TattooModalProps) {
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

  // const onSlideChange = async (index: number) => {
  //   const indexMarker = (index + 1) % limit;
  //   if (indexMarker === 0) {
  //     console.log("page:", page);
  //     await getMoreTattoos(page + 1);
  //   }
  // };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      styles={{ root: { margin: "0 auto" } }}
      fullScreen
    >
      <Carousel
        align={"center"}
        onSlideChange={() => console.log("SLIDE CHANGE")}
      >
        {carouselItems}
      </Carousel>
    </Modal>
  );
}
