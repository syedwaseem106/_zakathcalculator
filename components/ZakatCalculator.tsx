import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MosqueIcon from '@mui/icons-material/Mosque';
import { ZakatAssets, Madhab } from '../types/zakat';
import { ZakatCalculator } from '../services/zakatCalculator';

const ZakatCalculatorComponent: React.FC = () => {
  const [madhab, setMadhab] = useState<Madhab>('Hanafi');
  const [assets, setAssets] = useState<ZakatAssets>({
    gold: { weight: 0, price: 0 },
    silver: { weight: 0, price: 0 },
    cash: { amount: 0, currency: 'USD' },
    businessInventory: { value: 0, currency: 'USD' },
    livestock: [],
    agriculturalProduce: { type: 'irrigated', value: 0, currency: 'USD' },
    shares: { value: 0, currency: 'USD' },
    rentalIncome: { amount: 0, currency: 'USD' },
    debts: [],
  });

  const [calculation, setCalculation] = useState<any>(null);

  const handleCalculate = () => {
    const result = ZakatCalculator.calculateZakat(assets, madhab);
    setCalculation(result);
  };

  const handleAssetChange = (field: keyof ZakatAssets, value: any) => {
    setAssets(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("https://images.unsplash.com/photo-1564769625093-20688bf1b682?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        p: 2,
        position: 'relative',
        '&::after': {
          content: '"Syed Waseem"',
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.7)',
          fontFamily: 'cursive',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1000,
        }
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #2E7D32, #1B5E20)',
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <MosqueIcon sx={{ fontSize: 40, color: '#2E7D32', mb: 1 }} />
            <Typography variant="h5" sx={{ color: '#1B5E20', fontWeight: 'bold' }}>
              Islamic Zakat Calculator
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
              Calculate your Zakat according to {madhab} school
            </Typography>
          </Box>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Madhab</InputLabel>
            <Select
              value={madhab}
              label="Madhab"
              onChange={(e) => setMadhab(e.target.value as Madhab)}
              size="small"
            >
              <MenuItem value="Hanafi">Hanafi</MenuItem>
              <MenuItem value="Shafi">Shafi'i</MenuItem>
              <MenuItem value="Maliki">Maliki</MenuItem>
              <MenuItem value="Hanbali">Hanbali</MenuItem>
            </Select>
          </FormControl>

          <Accordion sx={{ mb: 1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 'medium', fontSize: '0.9rem' }}>Gold and Silver</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Gold Weight (grams)"
                    type="number"
                    value={assets.gold.weight}
                    onChange={(e) => handleAssetChange('gold', { ...assets.gold, weight: parseFloat(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Gold Price per Gram"
                    type="number"
                    value={assets.gold.price}
                    onChange={(e) => handleAssetChange('gold', { ...assets.gold, price: parseFloat(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Silver Weight (grams)"
                    type="number"
                    value={assets.silver.weight}
                    onChange={(e) => handleAssetChange('silver', { ...assets.silver, weight: parseFloat(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Silver Price per Gram"
                    type="number"
                    value={assets.silver.price}
                    onChange={(e) => handleAssetChange('silver', { ...assets.silver, price: parseFloat(e.target.value) })}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ mb: 1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 'medium', fontSize: '0.9rem' }}>Cash and Business</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Cash Amount"
                    type="number"
                    value={assets.cash.amount}
                    onChange={(e) => handleAssetChange('cash', { ...assets.cash, amount: parseFloat(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Business Inventory Value"
                    type="number"
                    value={assets.businessInventory.value}
                    onChange={(e) => handleAssetChange('businessInventory', { ...assets.businessInventory, value: parseFloat(e.target.value) })}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 'medium', fontSize: '0.9rem' }}>Investments</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Shares Value"
                    type="number"
                    value={assets.shares.value}
                    onChange={(e) => handleAssetChange('shares', { ...assets.shares, value: parseFloat(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Rental Income"
                    type="number"
                    value={assets.rentalIncome.amount}
                    onChange={(e) => handleAssetChange('rentalIncome', { ...assets.rentalIncome, amount: parseFloat(e.target.value) })}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleCalculate}
            sx={{
              backgroundColor: '#2E7D32',
              '&:hover': {
                backgroundColor: '#1B5E20',
              },
              py: 1,
              mb: 2,
            }}
          >
            Calculate Zakat
          </Button>

          {calculation && (
            <Box sx={{ mt: 2 }}>
              <Card 
                elevation={0}
                sx={{ 
                  backgroundColor: calculation.isZakatDue ? 'rgba(46, 125, 50, 0.1)' : 'rgba(211, 47, 47, 0.1)',
                  border: '1px solid',
                  borderColor: calculation.isZakatDue ? '#2E7D32' : '#D32F2F',
                  borderRadius: 2,
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" align="center" sx={{ color: calculation.isZakatDue ? '#2E7D32' : '#D32F2F', fontWeight: 'bold', mb: 1 }}>
                    {calculation.isZakatDue ? 'Zakat is Due' : 'Zakat is Not Due'}
                  </Typography>
                  
                  <Typography variant="h4" align="center" sx={{ color: '#2E7D32', fontWeight: 'bold', mb: 1 }}>
                    {calculation.zakatAmount.toFixed(2)} {assets.cash.currency}
                  </Typography>
                  <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 2 }}>
                    Your Zakat Amount
                  </Typography>

                  <Divider sx={{ my: 1 }} />
                  
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    Total Assets: {calculation.totalAssets.toFixed(2)} {assets.cash.currency}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    Total Liabilities: {calculation.totalLiabilities.toFixed(2)} {assets.cash.currency}
                  </Typography>
                  <Typography variant="body2">
                    Net Zakatable: {calculation.netZakatableAmount.toFixed(2)} {assets.cash.currency}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ZakatCalculatorComponent; 