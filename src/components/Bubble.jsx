import React from 'react';
import styled from 'styled-components';

const BubbleContainer = styled.div`
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

const BubbleSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const BubbleInfo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  width: 90%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TokenImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-bottom: 4px;
`;

const Symbol = styled.div`
  font-weight: bold;
  font-size: 1.2em;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
`;

const Price = styled.div`
  font-size: 0.9em;
  opacity: 0.9;
  margin: 2px 0;
`;

const PriceChange = styled.div`
  font-size: 0.8em;
  color: ${props => props.value > 0 ? '#2ecc71' : '#e74c3c'};
  font-weight: bold;
`;

const MetricsContainer = styled.div`
  font-size: 0.7em;
  opacity: 0.8;
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const formatNumber = (num) => {
  if (!num) return '0';
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
};

const Bubble = ({ size = 100, color = '#3498db', data }) => {
  return (
    <BubbleContainer size={size}>
      <BubbleSVG viewBox="0 0 100 100">
        {/* Define gradients for glossy effect */}
        <defs>
          {/* Main radial gradient */}
          <radialGradient id="bubbleGradient" cx="30%" cy="30%">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0.9" />
          </radialGradient>
          
          {/* Highlight gradient */}
          <radialGradient id="highlightGradient" cx="30%" cy="20%">
            <stop offset="0%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          
          {/* Glass effect filter */}
          <filter id="glassEffect">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            <feComposite in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>
        </defs>

        {/* Base bubble */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="url(#bubbleGradient)"
          filter="url(#glassEffect)"
        />
        
        {/* Highlight overlay */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="url(#highlightGradient)"
        />
      </BubbleSVG>
      <BubbleInfo>
        {data.imageUrl && (
          <TokenImage src={data.imageUrl} alt={data.symbol} />
        )}
        <Symbol>{data.symbol}</Symbol>
        {data.price && (
          <>
            <Price>${parseFloat(data.price).toFixed(4)}</Price>
            <PriceChange value={data.priceChange24h}>
              {data.priceChange24h > 0 ? '+' : ''}{data.priceChange24h?.toFixed(2)}%
            </PriceChange>
            <MetricsContainer>
              <div>MCap: {formatNumber(data.marketCap)}</div>
              <div>Vol: {formatNumber(data.volume24h)}</div>
              <div>Liq: {formatNumber(data.liquidity)}</div>
              <div>{data.dexId?.toUpperCase()}</div>
            </MetricsContainer>
          </>
        )}
      </BubbleInfo>
    </BubbleContainer>
  );
};

export default Bubble; 