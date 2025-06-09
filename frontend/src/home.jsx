import React, { useState, useEffect } from "react";
import {
  Typography, Container, Card, CardContent, CardMedia,
  Grid, Paper, Table, TableBody, TableHead, TableRow, TableCell,
  Button, CircularProgress
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { styled } from "@mui/material/styles";
import axios from "axios";
import "@fontsource/pacifico";
import logo from "./assets/potato-logo.png"; // Make sure this path is correct

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#000",
  backgroundColor: "#fff",
  '&:hover': { backgroundColor: "#ffffff7a" },
  width: "100%", borderRadius: "15px", padding: "15px 22px", fontSize: "18px", fontWeight: 700
}));

const CustomDropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] }, onDrop
  });

  return (
    <Paper sx={{ padding: 4, border: "2px dashed #ccc", textAlign: "center", cursor: "pointer" }} {...getRootProps()}>
      <input {...getInputProps()} />
      <Typography>Drag & drop a potato leaf image or click to upload</Typography>
    </Paper>
  );
};

export const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const onDrop = (files) => {
    if (files && files.length > 0) {
      setSelectedFile(files[0]); // <-- Use the first file, not the array
      setData(null);
      setApiError(null);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handlePredict = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setApiError(null);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) throw new Error("API URL is not set. Check your .env file.");
      const res = await axios.post(apiUrl, formData);
      if (res.status === 200 && res.data) {
        setData(res.data);
      } else {
        setApiError("Invalid API response.");
      }
    } catch (error) {
      setApiError("Prediction failed: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
    setData(null);
    setIsLoading(false);
    setApiError(null);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        minWidth: "100vw",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(2px)",
        padding: "2rem",
        boxSizing: "border-box", // Ensures padding doesn't add to width/height
      }}
    >
      <Container maxWidth="sm" sx={{ zIndex: 2 }}>
        <Typography
          align="center"
          variant="h4"
          sx={{
            fontFamily: "'Pacifico', cursive",
            fontWeight: 600,
            color: "red",
            mb: 3
          }}
        >
          Potato Disease Classifier
        </Typography>

        <Card sx={{
          borderRadius: "15px",
          boxShadow: "0px 6px 24px rgba(0,0,0,0.2)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}>
          <CardContent>
            {!preview && <CustomDropzone onDrop={onDrop} />}
            {preview && (
              <>
                <CardMedia component="img" image={preview} alt="Uploaded Leaf" sx={{ height: 300 }} />
                <Grid container spacing={2} marginTop={2} justifyContent="center">
                  <Grid item xs={6}>
                    <ColorButton variant="outlined" onClick={handleClear}>Clear</ColorButton>
                  </Grid>
                  <Grid item xs={12} mt={2}>
                    <ColorButton variant="contained" onClick={handlePredict} disabled={isLoading}>
                      Predict
                    </ColorButton>
                  </Grid>
                </Grid>
              </>
            )}

            {isLoading && (
              <Grid container justifyContent="center" mt={3}>
                <CircularProgress />
              </Grid>
            )}

            {apiError && (
              <Typography color="error" sx={{ mt: 2 }}>{apiError}</Typography>
            )}

            {data && data.class && (
              <Table size="small" sx={{ marginTop: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: '18px', fontWeight: 'bold', color: '#000' }}>Label</TableCell>
                    <TableCell sx={{ fontSize: '18px', fontWeight: 'bold', color: '#000' }}>Confidence</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{data.class}</TableCell>
                    <TableCell>{(parseFloat(data.confidence) * 100).toFixed(2)}%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};
