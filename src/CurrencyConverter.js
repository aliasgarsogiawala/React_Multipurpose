import React, { useState } from 'react';
import axios from 'axios';
import './Currency.css';

function CurrencyConverter() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const currencies = [
    { abbreviation: "USD", name: "US Dollar" },
    { abbreviation: "EUR", name: "Euro" },
    { abbreviation: "GBP", name: "British Pound" }, 
    { abbreviation: "JPY", name: "Japanese Yen" },
    { abbreviation: "RUB", name: "Russian Ruble" },
    { abbreviation: "INR", name: "Indian Rupee" },
    { abbreviation: "AED", name: "United Arab Emirates Dirham" },
  ];

  const convertCurrency = async (toCurrency) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      const conversionRate = response.data.rates[toCurrency];
      const convertedValue = parseFloat(baseCurrencyAmount) * conversionRate;
      setConvertedAmount(convertedValue.toFixed(2));
    } catch (error) {
      setError('Failed to convert currency. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
    setConvertedAmount('');
  };

  return (
    <div className="currency-converter-container">
      <h1 className="currency-converter-header">Currency Converter</h1><br></br><br></br>
      <div className="currency-inputs">
        <label htmlFor="baseCurrency">From:</label>
        <select id="baseCurrency" value={baseCurrency} onChange={handleCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency.abbreviation} value={currency.abbreviation}>
              {currency.abbreviation} - {currency.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={baseCurrencyAmount}
          onChange={(e) => setBaseCurrencyAmount(e.target.value)}
          placeholder="Enter amount"
          className="currency-input"
          disabled={isLoading}
        />
      </div>
      <div className="currency-buttons">
        {currencies.map(currency => (
          <button
            key={currency.abbreviation}
            onClick={() => convertCurrency(currency.abbreviation)}
            disabled={isLoading}
          >
            {currency.abbreviation}
          </button>
        ))}
      </div>
      <div className="conversion-results-container">
        <h2 className="conversion-rate">Converted Amount:</h2>
        <div className="converted-amount">{convertedAmount}</div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default CurrencyConverter;
