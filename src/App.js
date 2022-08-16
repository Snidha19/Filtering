import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  Typography,
  Card,
  Container,
  Box,
  TextField,
} from "@mui/material";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const getApiData = async () => {
      try {
        const response = await axios.get(
          `https://api.publicapis.org/categories`
        );
        setCategories(response.data.categories);
      } catch (err) {
        console.log(err);
      }
    };
    getApiData();
  });

  const filteredCategories =
    searchInput === ""
      ? categories
      : categories.filter((item) => item.toLowerCase().search(searchInput.toLowerCase()) > -1);

  return (
    <>
      <Container sx={{ my: 3, mt: 4}}>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Filtering
        </Typography>
        <Box>
          <TextField
            label="Enter text"
            variant="outlined"
            onChange={(event) => setSearchInput(event.target.value)}
            sx={{
              height: 50,
              borderRadius: 3,
              minWidth: 200,
              maxWidth: "auto",
            }}
          />
        </Box>
      </Container>
      {filteredCategories.map((item, index) => {
        return (
          <React.Fragment key={index}>
          <Container sx={{ my: 4 }}>
            <Card sx={{ mb: 3, borderRadius: 2 }} elevation={5}>
              <Box
                sx={{
                  width: "auto",
                  alignItems: "center",
                  margin: { xs: 1, md: 2 },
                }}
              >
                <Typography
                  sx={{
                    mx: { xs: 1, md: 2 },
                    fontSize: { xs: 12, md: 18 },
                    fontWeight: "bold",
                  }}
                >
                  {item}
                </Typography>
              </Box>
            </Card>
          </Container>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default App;
