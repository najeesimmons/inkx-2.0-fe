import {
  Card,
  Group,
  Modal,
  Stack,
  Text,
  Title,
  Image,
  rem,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useState } from "react";

interface TattooModalProps {
  opened: boolean;
  onClose(): void;
  tattoos: {}[];
}

export function TattooModal({ opened, onClose, tattoos }: TattooModalProps) {
  const [currentTattoo, setCurrentTattoo] = useState<{}>({});

  const carouselItems = tattoos.map((tattoo: any) => (
    <Carousel.Slide key={tattoo?.id}>
      <Card>
        <Group position="center">
          <Card.Section>
            <Image
              src={tattoo?.imageUrl}
              alt={tattoo?.description}
              fit="contain"
              height={500}
            />
          </Card.Section>
          <Stack>
            <Title order={3}>{tattoo.description}</Title>
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
      <Carousel>{carouselItems}</Carousel>
    </Modal>
  );
}
