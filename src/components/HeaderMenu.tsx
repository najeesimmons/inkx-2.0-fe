import { createStyles, Header, Menu, Group, Center, Burger, Container, rem, Text} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router'

const useStyles = createStyles((theme) => ({
  inner: {
    height: rem(56),
    display: 'flex',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
    paddingLeft: 25,
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

interface HeaderSearchProps {
  links: { link: string; label: string}[];
}

export function HeaderMenu({ links }: HeaderSearchProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const router = useRouter()
  const { push } = router

  const items = links.map((link) => {
    return (
    <a
    key={link.label}
    href={link.link}
    className={classes.link}
    onClick={(event) => {event.preventDefault()
    push(`${link.link}`)}}
  >
    {link.label}
  </a>
    )})

  return (
    <Header height={56} mb={120} maw={'1100px'} m={'0 auto'}>
        <div className={classes.inner}>
          <Group spacing={5} className={classes.links} align='center' style={{height: '100%'}} pl={10} pr={10}>
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
        </div>  
    </Header>
  );
}
