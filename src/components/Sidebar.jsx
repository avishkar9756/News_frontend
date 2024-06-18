import React, { useState } from "react";
import {
  Drawer,
  Divider,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Sidebar = ({
  setSearchText,
  setSelectedCategories,
  selectedCategories,
}) => {
  const [open, setOpen] = useState(true);
  const [displaySearchtext, setdisplaySearchtext] = useState("");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === "All") {
      if (checked) {
        setSelectedCategories([
          "news/Business",
          "news/Arts_and_Entertainment",
          "news/Environment",
          "news/Health",
          "news/Politics",
          "news/Science",
          "news/Sports",
        ]);
      } else {
        setSelectedCategories([]);
      }
    } else {
      setSelectedCategories((prev) => {
        if (checked) {
          if (!prev.includes(`news/${name}`)) {
            return [...prev, `news/${name}`];
          }
        } else {
          return prev.filter((cat) => cat !== `news/${name}`);
        }
        return prev;
      });
    }
  };

  const handleSearchclick = (value) => {
    setSearchText(value);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#3f51b5",
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            News Feed
          </Typography>
          {/* Centered Search Bar */}
          <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
            <TextField
              placeholder="Search"
              value={displaySearchtext}
              onChange={(e) => setdisplaySearchtext(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleSearchclick(displaySearchtext)}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="small"
              sx={{
                width: "50%",
                backgroundColor: "white",
                borderRadius: 1,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            marginTop: "64px",
            backgroundColor: "#f5f5f5",
            padding: 2,
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box sx={{ width: 240, overflow: "auto" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Categories
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="All"
                  checked={selectedCategories.length === 7}
                  onChange={handleCheckboxChange}
                />
              }
              label="All"
            />
            {[
              "Business",
              "Arts_and_Entertainment",
              "Environment",
              "Health",
              "Politics",
              "Science",
              "Sports",
            ].map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    name={category}
                    checked={selectedCategories.includes(`news/${category}`)}
                    onChange={handleCheckboxChange}
                  />
                }
                label={category.replace(/_/g, " ")}
              />
            ))}
          </FormGroup>
        </Box>
        <Divider />
      </Drawer>
    </>
  );
};

export default Sidebar;
