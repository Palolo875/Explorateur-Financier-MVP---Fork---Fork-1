// Type definitions
interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: {
    name: string;
  };
  publishedAt: string;
  urlToImage?: string;
}
interface StockQuote {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
}
interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
  icon: string;
}
interface MarketIndexData {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}
interface CountryEconomicData {
  country: string;
  gdp: number;
  inflation: number;
  unemployment: number;
}
class ExternalAPIService {
  private static instance: ExternalAPIService;
  private cache: Map<string, {
    data: unknown;
    timestamp: number;
  }>;
  private cacheDuration = 30 * 60 * 1000; // 30 minutes par défaut
  private constructor() {
    this.cache = new Map();
    // Réduire la durée du cache pour les données météo et autres données volatiles
    this.setCacheDurationForType('weather', 10 * 60 * 1000); // 10 minutes pour la météo
  }
  // Ajout d'une durée de cache spécifique par type de données
  private cacheDurations: Map<string, number> = new Map();
  private fmpApiKey = 'YOUR_FINANCIAL_MODELING_PREP_API_KEY';
  private openWeatherMapApiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  // Configurer une durée de cache spécifique pour un type de données
  public setCacheDurationForType(type: string, durationInMs: number): void {
    this.cacheDurations.set(type, durationInMs);
  }
  // Obtenir la durée de cache pour un type spécifique
  private getCacheDurationForType(type: string): number {
    return this.cacheDurations.get(type) || this.cacheDuration;
  }
  public static getInstance(): ExternalAPIService {
    if (!ExternalAPIService.instance) {
      ExternalAPIService.instance = new ExternalAPIService();
    }
    return ExternalAPIService.instance;
  }
  // Configurer la durée du cache
  public setCacheDuration(durationInMs: number): void {
    this.cacheDuration = durationInMs;
  }
  // Cache management
  private getCache<T>(key: string): T | null {
    const cachedItem = this.cache.get(key);
    if (cachedItem) {
      // Détecter le type de données pour appliquer la bonne durée de cache
      const dataType = key.split('_')[0]; // ex: weather_Paris_FR => weather
      const cacheDuration = this.getCacheDurationForType(dataType);
      // Check if cache is still valid with the appropriate duration
      if (Date.now() - cachedItem.timestamp < cacheDuration) {
        return cachedItem.data as T;
      }
    }
    return null;
  }
  private setCache(key: string, data: unknown): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
  // Nouvelle méthode pour gérer les appels API avec fallback
  // Méthode générique pour les appels API avec gestion d'erreur
  private async fetchWithErrorHandling<T>(url: string, options?: RequestInit, mockDataFn?: () => T): Promise<T> {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      if (mockDataFn) {
        console.log('Using mock data as fallback');
        return mockDataFn();
      }
      throw error;
    }
  }
  // News API - Get news articles by keywords using Gnews (API gratuite avec limite)
  public async getNewsArticles(keywords: string, count = 5): Promise<NewsArticle[]> {
    const apiKey = 'c01873f1471c862b7b787e3e82f9a561'; // Clé démo - à remplacer par la vôtre
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(keywords)}&max=${count}&lang=fr&apikey=${apiKey}`;
    return this.fetchWithErrorHandling(url, {}, () => []).then(data => {
      if (data && data.articles) {
        return data.articles.map((article: any) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          source: {
            name: article.source?.name || 'Source inconnue'
          },
          publishedAt: article.publishedAt,
          urlToImage: article.image
        }));
      }
      return [];
    });
  }
  // Autres méthodes avec la nouvelle approche
  public async getStockQuote(symbol: string): Promise<StockQuote | null> {
    const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${this.fmpApiKey}`;
    return this.fetchWithErrorHandling(url, {}, () => this.getMockStockQuote(symbol)).then(data => {
      if (data && data.length > 0) {
        const quote = data[0];
        return {
          symbol: quote.symbol,
          price: quote.price.toFixed(2),
          change: quote.change.toFixed(2),
          changePercent: quote.changesPercentage.toFixed(2),
        };
      }
      return null;
    });
  }

  public async getQuote(): Promise<{ content: string; author: string } | null> {
    return this.fetchWithErrorHandling('https://api.quotable.io/random?tags=finance', {}, () => ({
      content: 'An investment in knowledge pays the best interest.',
      author: 'Benjamin Franklin',
    }));
  }

  public async getCryptoData(currency: string, count: number): Promise<any[]> {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${count}&page=1&sparkline=false`;
    return this.fetchWithErrorHandling(url, {}, () => []);
  }

  public async getActivitySuggestion(): Promise<{ activity: string } | null> {
    return this.fetchWithErrorHandling('https://www.boredapi.com/api/activity?type=recreational', {}, () => ({
      activity: 'Read a book',
    }));
  }

  public async getExchangeRates(base: string): Promise<{ rates: Record<string, number> } | null> {
    const url = `https://api.exchangerate.host/latest?base=${base}`;
    return this.fetchWithErrorHandling(url, {}, () => ({ rates: { USD: 1.2, EUR: 1.0 } }));
  }
  public async getWeatherData(city: string, country = 'FR'): Promise<WeatherData> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${this.openWeatherMapApiKey}&units=metric&lang=fr`;
    return this.fetchWithErrorHandling(url, {}, () => ({
      temperature: 20,
      condition: 'Ensoleillé',
      humidity: 60,
      windSpeed: 10,
      location: city,
      icon: 'https://openweathermap.org/img/wn/01d@2x.png'
    })).then(data => {
      if (data && data.main) {
        return {
          temperature: data.main.temp,
          condition: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          location: data.name,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        };
      }
      return {
        temperature: 20,
        condition: 'Ensoleillé',
        humidity: 60,
        windSpeed: 10,
        location: city,
        icon: 'https://openweathermap.org/img/wn/01d@2x.png'
      };
    });
  }
  public async getMarketIndices(): Promise<MarketIndexData[]> {
    const url = `https://financialmodelingprep.com/api/v3/actives?apikey=${this.fmpApiKey}`;
    return this.fetchWithErrorHandling(url, {}, () => []).then(data => {
      if (data && data.length > 0) {
        return data.slice(0, 5).map((index: any) => ({
          name: index.ticker,
          value: index.price,
          change: index.changes,
          changePercent: index.changesPercentage,
        }));
      }
      return [];
    });
  }
  public async getCentralBankRates(): Promise<Record<string, number>> {
    const url = `https://financialmodelingprep.com/api/v4/central-bank-rates?apikey=${this.fmpApiKey}`;
    return this.fetchWithErrorHandling(url, {}, () => ({
      BCE: 4.5,
      FED: 5.25,
      BoE: 5.0,
    })).then(data => {
      if (data && data.length > 0) {
        const rates: Record<string, number> = {};
        data.slice(0, 3).forEach((rate: any) => {
          rates[rate.country] = rate.rate;
        });
        return rates;
      }
      return {
        BCE: 4.5,
        FED: 5.25,
        BoE: 5.0,
      };
    });
  }

  public async getCountryEconomicData(country: string): Promise<CountryEconomicData> {
    const url = `https://financialmodelingprep.com/api/v4/economic-indicator/gdp?name=${country}&apikey=${this.fmpApiKey}`;
    return this.fetchWithErrorHandling(url, {}, () => ({
      country,
      gdp: 1.5,
      inflation: 2.8,
      unemployment: 7.2,
    })).then(data => {
      if (data && data.length > 0) {
        return {
          country,
          gdp: data[0].gdp,
          inflation: data[0].inflation,
          unemployment: data[0].unemployment,
        };
      }
      return {
        country,
        gdp: 1.5,
        inflation: 2.8,
        unemployment: 7.2,
      };
    });
  }
}
// Create singleton instance
export const externalApiService = ExternalAPIService.getInstance();
// Export hooks
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