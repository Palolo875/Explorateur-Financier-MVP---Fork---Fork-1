import React from 'react';
import { WeatherData, MarketIndexData, StockMarketData, CryptoData, CountryEconomicData, NewsArticle, InspirationalQuote } from '../types/finance';
class ExternalAPIService {
  private static instance: ExternalAPIService;
  private constructor() {
    // Private constructor to enforce singleton pattern
  }
  public static getInstance(): ExternalAPIService {
    if (!ExternalAPIService.instance) {
      ExternalAPIService.instance = new ExternalAPIService();
    }
    return ExternalAPIService.instance;
  }
  // Weather API
  async getWeatherData(city: string, country = 'FR'): Promise<WeatherData> {
    // Mock implementation for demo purposes
    console.log(`Fetching weather data for ${city}, ${country}`);
    return {
      location: city,
      temperature: Math.floor(Math.random() * 15) + 10,
      condition: ['Ensoleillé', 'Nuageux', 'Pluvieux', 'Partiellement nuageux'][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 30) + 50,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      icon: `https://cdn.weatherapi.com/weather/64x64/day/${Math.floor(Math.random() * 3) + 1}.png`
    };
  }
  // Market indices API
  async getMarketIndices(): Promise<MarketIndexData[]> {
    // Mock implementation for demo purposes
    return [{
      name: 'CAC 40',
      value: 7200 + Math.random() * 200,
      changePercent: (Math.random() * 2 - 1) * 2 // Between -2% and +2%
    }, {
      name: 'S&P 500',
      value: 4200 + Math.random() * 200,
      changePercent: (Math.random() * 2 - 1) * 2
    }, {
      name: 'Nasdaq',
      value: 13200 + Math.random() * 400,
      changePercent: (Math.random() * 2 - 1) * 2
    }, {
      name: 'Dow Jones',
      value: 33000 + Math.random() * 1000,
      changePercent: (Math.random() * 2 - 1) * 2
    }];
  }
  // Central bank rates API
  async getCentralBankRates(): Promise<Record<string, number>> {
    // Mock implementation for demo purposes
    return {
      BCE: 3.75,
      FED: 5.25,
      "Banque d'Angleterre": 5.0,
      'Banque du Japon': 0.1
    };
  }
  // Country economic data API
  async getCountryEconomicData(country: string): Promise<CountryEconomicData> {
    // Mock implementation for demo purposes
    const gdpRanges: Record<string, [number, number]> = {
      France: [-0.5, 1.5],
      Germany: [-0.3, 1.7],
      USA: [0.2, 2.2],
      UK: [-0.4, 1.6]
    };
    const range = gdpRanges[country] || [-1, 2];
    return {
      country,
      gdp: +(range[0] + Math.random() * (range[1] - range[0])).toFixed(1),
      inflation: +(2 + Math.random() * 4).toFixed(1),
      unemployment: +(5 + Math.random() * 5).toFixed(1),
      debt: Math.floor(60 + Math.random() * 40)
    };
  }
  // News API
  async getNewsArticles(query: string, count = 3): Promise<NewsArticle[]> {
    // Mock implementation for demo purposes
    const titles = ["La BCE maintient ses taux d'intérêt", 'Inflation: légère baisse en France', 'Les marchés financiers en hausse', 'Nouvelles mesures fiscales annoncées', 'Le CAC 40 atteint un nouveau record'];
    return Array.from({
      length: count
    }).map((_, i) => ({
      title: titles[Math.floor(Math.random() * titles.length)],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis eget urna ultricies fermentum.',
      url: 'https://example.com/news',
      source: {
        id: `source-${i}`,
        name: 'Finance Actu'
      },
      publishedAt: new Date().toISOString()
    }));
  }
  // Inspirational quote API
  async getQuote(): Promise<InspirationalQuote> {
    // Mock implementation for demo purposes
    const quotes = [{
      content: "L'argent est un bon serviteur, mais un mauvais maître.",
      author: 'Francis Bacon'
    }, {
      content: 'Investir dans la connaissance rapporte toujours les meilleurs intérêts.',
      author: 'Benjamin Franklin'
    }, {
      content: "Ne dépensez pas ce que vous n'avez pas gagné pour acheter ce dont vous n'avez pas besoin.",
      author: 'Warren Buffett'
    }, {
      content: "La richesse n'est pas dans le fait d'avoir beaucoup de biens, mais dans le fait d'avoir peu de besoins.",
      author: 'Épictète'
    }];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  // Stock market API
  async getStockQuote(symbol: string): Promise<StockMarketData> {
    // Mock implementation for demo purposes
    return {
      symbol,
      price: (Math.random() * 200 + 100).toFixed(2),
      changePercent: (Math.random() * 4 - 2).toFixed(2),
      volume: Math.floor(Math.random() * 10000000),
      marketCap: Math.floor(Math.random() * 1000000000000)
    };
  }
  // Crypto API
  async getCryptoData(currency = 'eur', count = 3): Promise<CryptoData[]> {
    // Mock implementation for demo purposes
    const cryptos = [{
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png'
    }, {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
    }, {
      id: 'tether',
      symbol: 'usdt',
      name: 'Tether',
      image: 'https://assets.coingecko.com/coins/images/325/small/Tether.png'
    }, {
      id: 'binancecoin',
      symbol: 'bnb',
      name: 'Binance Coin',
      image: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png'
    }, {
      id: 'ripple',
      symbol: 'xrp',
      name: 'XRP',
      image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png'
    }];
    return cryptos.slice(0, count).map(crypto => ({
      ...crypto,
      current_price: Math.floor(crypto.id === 'bitcoin' ? 30000 + Math.random() * 5000 : crypto.id === 'ethereum' ? 2000 + Math.random() * 500 : crypto.id === 'tether' ? 0.95 + Math.random() * 0.1 : 100 + Math.random() * 50),
      price_change_percentage_24h: Math.random() * 10 - 5,
      market_cap: Math.floor(Math.random() * 1000000000000),
      total_volume: Math.floor(Math.random() * 10000000000)
    }));
  }
  // Activity suggestion API
  async getActivitySuggestion(): Promise<{
    activity: string;
  } | null> {
    // Mock implementation for demo purposes
    const activities = ['Comparer les offres de banques en ligne pour réduire vos frais', 'Mettre en place un virement automatique vers un compte épargne', 'Revoir votre budget alimentation pour réduire les dépenses', "Vérifier si vous pouvez renégocier vos contrats d'assurance", "Analyser vos abonnements pour éliminer ceux que vous n'utilisez pas"];
    return {
      activity: activities[Math.floor(Math.random() * activities.length)]
    };
  }

  // Advice API
  async getAdvice(mood: number): Promise<{ advice: string } | null> {
    // Mock implementation for demo purposes
    const advices = [
      'Prenez le temps de réfléchir avant tout achat important',
      'Établissez un budget mensuel et respectez-le',
      'Épargnez au moins 10% de vos revenus',
      'Diversifiez vos investissements',
      'Évitez les dettes à taux élevé'
    ];
    return {
      advice: advices[Math.floor(Math.random() * advices.length)]
    };
  }
}
// Create singleton instance
export const externalApiService = ExternalAPIService.getInstance();