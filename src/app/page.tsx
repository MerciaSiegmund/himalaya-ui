'use client';

import { Button, FadeInEffect, Footer, FooterBottom, FooterNavigation, Hero, Link, Section, Text, useTheme } from 'components';
import { Code } from 'components/icons';
import { capitalize } from 'components/utils/collections';
import { Facts, Partners, Portfolio, RunningSlogan, Services } from 'lib/components';
import { BrandLogo } from 'lib/components/icons';
import metaData from '../lib/data/metadata.json';

export default function Index() {
  const theme = useTheme();
  return (
    <>
      <Hero scrollToId="services" style={{ background: theme.type == 'dark' ? '#141415' : '#ffffff' }}>
        <Hero.Tag>HIMALAYA UI</Hero.Tag>
        <Hero.Title>
          Scaling Heights of Design Excellence: Your UI Journey <span style={{ textDecoration: 'underline', fontWeight: 300 }}>Begins Here!</span>
        </Hero.Title>
        <Hero.Desc>
          Elevate your Next.js web development with our open-source UI library, offering a comprehensive suite of customizable components for building modern
          and user-friendly interfaces.
        </Hero.Desc>
        <Hero.Actions>
          <Link href={'/guide/introduction'}>
            <Button type="primary" auto icon={<Code></Code>} scale={1.3}>
              Documentation
            </Button>
          </Link>
          <Link href={'/guide/installation'}>
            <Button type="secondary" scale={1.3}>
              Installation
            </Button>
          </Link>
        </Hero.Actions>
      </Hero>

      <div id="services">
        <Section>
          <Services></Services>
        </Section>
      </div>

      <FadeInEffect blur={10} transition={1000}>
        <Partners></Partners>
      </FadeInEffect>

      <Section>
        <Portfolio></Portfolio>
      </Section>

      <Section>
        <Facts></Facts>
      </Section>

      <RunningSlogan></RunningSlogan>

      <Footer>
        <Footer.Block justify="space-between">
          {metaData.slice(0, 3).map((df, index) => (
            <FooterNavigation title={capitalize(df.name)} key={index}>
              {df.children.slice(0, 5).map((child, childIndex) => (
                <FooterNavigation.Item key={childIndex} href={child.children[0].url || df.url}>
                  {capitalize(child.name)}
                </FooterNavigation.Item>
              ))}
            </FooterNavigation>
          ))}
        </Footer.Block>
        <Footer.Block justify="flex-end"></Footer.Block>
      </Footer>

      <Footer.Bottom>
        <Footer.Bottom.Block>
          <div className="logo-footer">
            <BrandLogo size={35}></BrandLogo>
          </div>
        </Footer.Bottom.Block>
        <Footer.Bottom.Block justify="flex-end">
          <Text span font={'12px'} style={{ color: theme.palette.foreground.hex_700 }}>
            With support of{' '}
            <Link color href="https://redninjas.dev" target="_blank">
              RedNinjas LTD
            </Link>
          </Text>
        </Footer.Bottom.Block>
      </Footer.Bottom>

      <style jsx>{`
        .logo-footer {
          color: var(--color-foreground-1000);
        }

        section {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 180px 0px;
        }
      `}</style>
    </>
  );
}
