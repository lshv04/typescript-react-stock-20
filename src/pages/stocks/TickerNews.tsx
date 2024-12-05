import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";
import { useInputContext } from "../../context/InputContext";
import { Spinner } from "react-bootstrap";
import "./StocksShared.css"; // Importa o CSS compartilhado

interface NewsItem {
  id: string;
  title: string;
  published_utc: string;
  article_url: string;
  description?: string;
}

const TickerNews: React.FC = () => {
  const { isDark } = useTheme(); // Obtém o estado do tema
  const { inputValue } = useInputContext(); // Obtém o valor do input do contexto
  const [news, setNews] = useState<NewsItem[]>([]); // Estado para armazenar as notícias
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado de erro

  useEffect(() => {
    const fetchNews = async () => {
      if (!inputValue) return; // Não faz a requisição se o inputValue estiver vazio

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.polygon.io/v2/reference/news?ticker=${inputValue}&limit=20&apiKey=${process.env.REACT_APP_POLYGON_API_KEY}`
        );
        // console.log("News Response:", response.data.results);
        setNews(response.data.results || []); // Define as notícias no estado
      } catch (err) {
        console.error("Error fetching news:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [inputValue]);

  return (
    <div className={`container ${isDark ? "dark" : "light"}`}>
      <h1 className="title">Ticker News</h1>

      {/* Exibe o valor do input */}
      <div className="text-center mb-4">
        <p>
          <strong>Ticker:</strong> {inputValue || "No ticker provided"}
        </p>
      </div>

      {/* Estado de carregamento */}
      {loading && (
        <div className="d-flex justify-content-center m-5 pt-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Mensagem de erro */}
      {error && <p className="text-danger text-center">Error: {error}</p>}

      {/* Lista de notícias */}
      {news.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {news.map((item) => (
            <div className="col" key={item.id}>
              <div className="card h-100 shadow-sm d-flex flex-column">
                <div className="card-body flex-grow-1 d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text flex-grow-1">
                    {item.description || "No description available."}
                  </p>
                  <p className="card-text text-muted">
                    Published:{" "}
                    {new Date(item.published_utc).toLocaleString() || "N/A"}
                  </p>
                </div>
                <div className="card-footer mt-auto">
                  <a
                    href={item.article_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-100"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center">No news available for this ticker.</p>
        )
      )}
    </div>
  );
};

export default TickerNews;
