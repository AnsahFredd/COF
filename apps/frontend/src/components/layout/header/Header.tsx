import { useEffect, useState } from 'react';
import { Container, Group, Burger, Stack, Collapse, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { NAVITEMS } from './constants/navItems';
import logo from 'src/assets/images/brand/logo.jpg';
import { useMediaQuery } from 'src/hooks/useMediaQuery';
import classes from './header.module.css';

export const Header = () => {
  const isMobile = useMediaQuery('mobile');
  const [opened, setOpened] = useState(false);

  const toggle = () => setOpened((o) => !o);
  const closeMenu = () => setOpened(false);

  const centerNavItems = NAVITEMS.slice(0, -1);
  const rightNavItem = NAVITEMS[NAVITEMS.length - 1];

  useEffect(() => {
    if (!isMobile && opened) {
      setOpened(false);
    }
  }, [isMobile, opened]);

  return (
    <>
      <Container className={classes.container}>
        {/* Logo */}
        <Link to="/" className={classes.logo}>
          <img src={logo} alt="" style={{ height: 40, objectFit: 'contain' }} />
        </Link>

        {!isMobile && (
          <>
            <Group gap="xl" className={classes.navLinks}>
              {centerNavItems.map((link, i) => (
                <Link key={i} to={link.href} style={{ textTransform: 'uppercase', fontSize: 14 }}>
                  {link.label}
                </Link>
              ))}
            </Group>

            <Button
              component={Link}
              to={rightNavItem.href}
              className={classes.button}
              style={{ textTransform: 'uppercase' }}
              variant="outline"
            >
              {rightNavItem.label}
            </Button>
          </>
        )}

        {isMobile && <Burger opened={opened} color="gold" onClick={toggle} />}
      </Container>

      <Collapse in={opened}>
        <Stack
          gap="lg"
          align="center"
          style={{
            background: 'white',
            padding: '1.5rem 0',
            borderBottom: '1px solid #ddd',
            zIndex: 50,
          }}
        >
          {NAVITEMS.map((link, i) => (
            <Link key={i} to={link.href} onClick={closeMenu} className={classes.mobileNavLink}>
              {link.label}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </>
  );
};
