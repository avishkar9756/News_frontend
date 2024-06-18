import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const CustomCard = ({ title, summary }) => {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        margin: 2,
        boxShadow: 3,
        borderRadius: 2,
        padding: 2,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardContent>
        <Box sx={{ mb: 1.5 }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              mb: 1,
            }}
          >
            {title}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.6 }}
        >
          {summary}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
