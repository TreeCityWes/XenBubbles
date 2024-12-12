import React, { useState } from 'react';
import Bubble from './Bubble';
import BubbleListSelector from './BubbleListSelector';
import styled from 'styled-components';
import '../styles/bubble-animations.css';

const Container = styled.div`
  padding: 20px;
  background: #1a1a1a;
`;

const BubblesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const BubbleWrapper = styled.div`
  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }
`;

const BubbleText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
`;

const TooltipContent = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 8px;
  padding: 12px;
  font-size: 0.8em;
  color: white;
  z-index: 1000;
  pointer-events: none;
  display: none;
  
  ${BubbleWrapper}:hover & {
    display: block;
  }
`;

const SocialLink = styled.a`
  color: #3498db;
  margin: 0 4px;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const BubbleDemo = () => {
  const [currentList, setCurrentList] = useState([]);

  const handleListChange = (newList) => {
    setCurrentList(newList);
  };

  return (
    <Container>
      <BubbleListSelector onListChange={handleListChange} />
      <BubblesGrid>
        {currentList.map((token, index) => (
          <BubbleWrapper 
            key={token.symbol}
            className={index % 2 === 0 ? "bubble-float" : "bubble-pulse"}
          >
            <Bubble size={80} color={token.color} data={token} />
            <TooltipContent>
              <div><strong>{token.displayName}</strong></div>
              {token.websites?.map((site, i) => (
                <SocialLink key={i} href={site.url} target="_blank">Website</SocialLink>
              ))}
              {token.socials?.map((social, i) => (
                <SocialLink key={i} href={`https://${social.platform}.com/${social.handle}`} target="_blank">
                  {social.platform}
                </SocialLink>
              ))}
            </TooltipContent>
          </BubbleWrapper>
        ))}
      </BubblesGrid>
    </Container>
  );
};

export default BubbleDemo; 