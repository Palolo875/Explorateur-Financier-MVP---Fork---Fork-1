import React, { useEffect, useState } from 'react';
import { externalApiService } from '../services/ExternalAPIService';
import { WeatherData, MarketIndexData, CountryEconomicData } from '../types/finance';
export function useWeatherData(city: string, country = 'FR') {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const weatherData = await externalApiService.getWeatherData(city, country);
        setData(weatherData);
        setError(null);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [city, country]);
  return {
    data,
    loading,
    error
  };
}
export function useMarketIndices() {
  const [data, setData] = useState<MarketIndexData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const indices = await externalApiService.getMarketIndices();
        setData(indices);
        setError(null);
      } catch (err) {
        console.error('Error fetching market indices:', err);
        setError('Failed to load market indices');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return {
    data,
    loading,
    error
  };
}
export function useCentralBankRates() {
  const [data, setData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const rates = await externalApiService.getCentralBankRates();
        setData(rates);
        setError(null);
      } catch (err) {
        console.error('Error fetching central bank rates:', err);
        setError('Failed to load central bank rates');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return {
    data,
    loading,
    error
  };
}
export function useCountryEconomicData(country: string) {
  const [data, setData] = useState<CountryEconomicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const economicData = await externalApiService.getCountryEconomicData(country);
        setData(economicData);
        setError(null);
      } catch (err) {
        console.error('Error fetching economic data:', err);
        setError('Failed to load economic data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [country]);
  return {
    data,
    loading,
    error
  };
}