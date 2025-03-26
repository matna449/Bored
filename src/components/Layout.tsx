import React from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1rem;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1rem 0;
  margin-top: 2rem;
  color: #666;
  font-size: 0.8rem;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header>
        <Title>Daily Quote & Mood</Title>
        <Subtitle>Inspiring quotes with mood analysis</Subtitle>
      </Header>
      
      <Main>{children}</Main>
      
      <Footer>
        &copy; {new Date().getFullYear()} Quote & Mood Generator | Data from Quotable API
      </Footer>
    </Container>
  );
};

export default Layout;
