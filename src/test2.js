import { useEffect, useState } from "react";

export default function App() {
  const [convertedAmount, setConvertedAmount] = useState("");
  const [toCur, setToCur] = useState("USD");
  const [fromCur, setFromCur] = useState("EUR");
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    async function fetchConversion() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        setConvertedAmount(data.rates[toCur]);
      } catch (error) {
        console.error("Error fetching conversion:", error);
        setConvertedAmount("Error");
      } finally {
        setIsLoading(false);
      }
    }

    if (fromCur === toCur) {
      setConvertedAmount(amount);
    } else {
      fetchConversion();
    }
  }, [amount, fromCur, toCur]);

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="JPY">JPY</option>
        <option value="GBP">GBP</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="JPY">JPY</option>
        <option value="GBP">GBP</option>
      </select>
      <p>
        {isLoading
          ? "در حال بارگذاری..."
          : `${convertedAmount || "خطا"} ${toCur}`}
      </p>
    </div>
  );
}
