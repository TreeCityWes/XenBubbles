import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';
import { fetchTokenData } from '../services/dexscreener';

const ListSelector = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button`
  background: ${props => props.active ? '#3498db' : '#2c3e50'};
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #3498db;
  }
`;

const lists = ['Xen', 'Xen-Alts', 'DBXen'];

const BubbleListSelector = ({ onListChange }) => {
  const [activeList, setActiveList] = useState('Xen');
  const [listData, setListData] = useState([]);

  useEffect(() => {
    loadListData(activeList);
  }, [activeList]);

  const loadListData = async (listName) => {
    try {
      const response = await fetch(`/lists/${listName}.csv`);
      const text = await response.text();
      
      Papa.parse(text, {
        header: true,
        complete: async (results) => {
          // Fetch market data for each token
          const tokensWithData = await Promise.all(
            results.data.map(async (token) => {
              const marketData = await fetchTokenData(token.contract);
              return {
                ...token,
                ...marketData,
                // Fallback color if no market data
                color: marketData?.color || '#3498db'
              };
            })
          );
          
          setListData(tokensWithData);
          onListChange(tokensWithData);
        }
      });
    } catch (error) {
      console.error('Error loading CSV:', error);
    }
  };

  return (
    <ListSelector>
      {lists.map(list => (
        <Button
          key={list}
          active={activeList === list}
          onClick={() => setActiveList(list)}
        >
          {list}
        </Button>
      ))}
    </ListSelector>
  );
};

export default BubbleListSelector; 