import { Card, Group, Modal, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface TattooModalProps {
  opened: boolean;
  onClose(): void;
}

export function TattooModal({ opened, onClose }: TattooModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      styles={{ root: { margin: "0 auto" } }}
    >
      <Card>
        <Group>
          <Card.Section></Card.Section>
          <Stack>
            <Title>Tattoo Title</Title>
            <Text>Artist Name</Text>
          </Stack>
        </Group>
      </Card>
    </Modal>
  );
}
