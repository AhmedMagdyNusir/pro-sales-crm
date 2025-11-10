import { useState, useEffect } from 'react';
import useDebouncedValue from '../../../../../../../hooks/useDebouncedValue';
import axios from 'axios';

export const useSentiment = (summary) => {
  const [sentiment, setSentiment] = useState('idle'); // idle, loading, error, Positive, Negative, Neutral, Irrelevant

  const debouncedSummary = useDebouncedValue(summary, 350);

  useEffect(() => {
    const fetchSentiment = async () => {
      if (debouncedSummary) {
        setSentiment('loading');
        try {
          const response = await axios({
            method: 'POST',
            url: 'https://gp-1-6xxd.onrender.com/predict',
            data: { comments: [debouncedSummary] },
          });
          setSentiment(response.data[0].sentiment);
        } catch (error) {
          setSentiment('error');
        }
      } else {
        setSentiment('idle');
      }
    };

    fetchSentiment();
  }, [debouncedSummary]);

  return sentiment;
};