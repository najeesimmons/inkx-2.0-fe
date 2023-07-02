import { Card, Group, Modal, Stack, Text, Title, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";

interface TattooModalProps {
  opened: boolean;
  onClose(): void;
  tattoos: {}[];
}

export function TattooModal({ opened, onClose, tattoos }: TattooModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      styles={{ root: { margin: "0 auto" } }}
    >
      <Card>
        <Group>
          <Card.Section>{/* carousel of tattoos here */}</Card.Section>
          <Stack>
            <Title>Tattoo Title</Title>
            <Text>Artist Name</Text>
          </Stack>
        </Group>
        x
      </Card>
    </Modal>
  );
}
