const BASE_URL = 'https://api.dexscreener.com/latest';

export const fetchTokenData = async (contractAddress) => {
  try {
    const response = await fetch(`${BASE_URL}/dex/tokens/${contractAddress}`);
    const data = await response.json();
    
    if (data.pairs && data.pairs.length > 0) {
      // Get the most liquid pair
      const mainPair = data.pairs[0];
      const baseToken = mainPair.baseToken;
      
      return {
        price: mainPair.priceUsd,
        priceChange24h: mainPair.priceChange?.h24,
        volume24h: mainPair.volume?.h24,
        liquidity: mainPair.liquidity?.usd,
        marketCap: mainPair.marketCap,
        fdv: mainPair.fdv,
        imageUrl: baseToken.info?.imageUrl || mainPair.info?.imageUrl,
        dexId: mainPair.dexId,
        pairAddress: mainPair.pairAddress,
        websites: mainPair.info?.websites,
        socials: mainPair.info?.socials,
        color: getColorFromPriceChange(mainPair.priceChange?.h24)
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching token data:', error);
    return null;
  }
};

const getColorFromPriceChange = (priceChange) => {
  if (priceChange > 5) return '#16a085';  // Strong green
  if (priceChange > 0) return '#2ecc71';  // Light green
  if (priceChange < -5) return '#c0392b'; // Strong red
  if (priceChange < 0) return '#e74c3c';  // Light red
  return '#3498db';                       // Neutral blue
}; 