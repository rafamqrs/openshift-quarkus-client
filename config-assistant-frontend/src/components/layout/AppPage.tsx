import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  NavList,
  NavItem,
  Page,
  PageHeader,
  PageSection,
  PageSectionVariants,
  PageSidebar,
  SkipToContent
} from '@patternfly/react-core';

interface IAppLayout {
  children: React.ReactNode;
}

const AppPage: React.FunctionComponent<IAppLayout> = ({ children }) => {
  const logoProps = {
    href: '/',
    target: '_blank'
  };
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isMobileView, setIsMobileView] = React.useState(true);
  const [isNavOpenMobile, setIsNavOpenMobile] = React.useState(false);
  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile);
  };
  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
    setIsMobileView(props.mobileView);
  };
  const Header = (
    <PageHeader
      logo="Config Assistant MVP"
      logoProps={logoProps}
      showNavToggle
      isNavOpen={isNavOpen}
      onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
    />
  );

  const Navigation = (
    <Nav id="nav-primary-simple" theme="light">
      <NavList id="nav-list-simple">
            <NavItem >
            </NavItem>
      </NavList>
    </Nav>
  );
  return (
    <Page
      header={Header}
      onPageResize={onPageResize}
    >
    <PageSection variant={PageSectionVariants.light}>
        {children}
    </PageSection>

    </Page>
  );
};

export default  AppPage ;
