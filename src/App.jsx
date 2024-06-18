import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Container,
  Grid,
  Toolbar,
  Pagination,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import Sidebar from "./components/Sidebar";
import CustomCard from "./components/CustomCard";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([
    "news/Business",
    "news/Arts_and_Entertainment",
    "news/Environment",
    "news/Health",
    "news/Politics",
    "news/Science",
    "news/Sports",
  ]);
  const [searchText, setSearchText] = useState("");
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [displayedCards, setDisplayedCards] = useState([]);

  const cardsPerPage = 6;
  let startIndex = (page - 1) * cardsPerPage;
  let endIndex = startIndex + cardsPerPage;

  useEffect(() => {
    const handleFetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://news-backend-1-mo4m.onrender.com/api/news",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ searchText, selectedCategories }),
          }
        );
        const data = await response.json();
        setArticles(data);
        setDisplayedCards(data.slice(startIndex, endIndex));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };
    handleFetchNews();
  }, [selectedCategories, searchText, startIndex, endIndex]);

  const handlePageChange = (event, value) => {
    setPage(value);
    startIndex = (value - 1) * cardsPerPage;
    endIndex = startIndex + cardsPerPage;
    setDisplayedCards(articles.slice(startIndex, endIndex));
  };

  return (
    <div>
      <CssBaseline />
      <Sidebar
        setSearchText={setSearchText}
        setSelectedCategories={setSelectedCategories}
        selectedCategories={selectedCategories}
      />
      <div className="flex items-center justify-center">
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <CircularProgress size={80} />
          </Box>
        ) : (
          <Container sx={{ mt: 8 }}>
            <Toolbar />
            <Grid container spacing={2}>
              {displayedCards.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                    width: "100%",
                  }}
                >
                  <Typography variant="h6" color="textSecondary">
                    No results found
                  </Typography>
                </Box>
              ) : (
                displayedCards.map((card, index) => (
                  <Grid item key={index} xs={12} sm={12} md={12}>
                    <CustomCard title={card.title} summary={card.summary} />
                  </Grid>
                ))
              )}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Pagination
                count={Math.ceil(articles.length / cardsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Container>
        )}
      </div>
    </div>
  );
};

export default App;
