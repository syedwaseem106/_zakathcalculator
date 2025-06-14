import { ZakatAssets, ZakatCalculation, Madhab, NisabValues } from '../types/zakat';

export class ZakatCalculator {
  private static readonly ZAKAT_RATE = 0.025; // 2.5%
  private static readonly AGRICULTURAL_IRRIGATED_RATE = 0.05; // 5%
  private static readonly AGRICULTURAL_RAIN_FED_RATE = 0.1; // 10%

  private static readonly NISAB_VALUES: NisabValues = {
    gold: 87.48, // grams (Hanafi)
    silver: 612.36, // grams (Hanafi)
    lastUpdated: new Date().toISOString()
  };

  private static readonly MADHAB_NISAB_VALUES: Record<Madhab, NisabValues> = {
    Hanafi: {
      gold: 87.48,
      silver: 612.36,
      lastUpdated: new Date().toISOString()
    },
    Shafi: {
      gold: 87.48,
      silver: 612.36,
      lastUpdated: new Date().toISOString()
    },
    Maliki: {
      gold: 87.48,
      silver: 612.36,
      lastUpdated: new Date().toISOString()
    },
    Hanbali: {
      gold: 87.48,
      silver: 612.36,
      lastUpdated: new Date().toISOString()
    }
  };

  public static calculateZakat(assets: ZakatAssets, madhab: Madhab = 'Hanafi'): ZakatCalculation {
    const nisabValues = this.MADHAB_NISAB_VALUES[madhab];
    
    // Calculate total assets
    const totalAssets = this.calculateTotalAssets(assets);
    
    // Calculate total liabilities
    const totalLiabilities = this.calculateTotalLiabilities(assets);
    
    // Calculate net zakatable amount
    const netZakatableAmount = totalAssets - totalLiabilities;
    
    // Check if zakat is due based on nisab
    const isZakatDue = this.isZakatDue(assets, nisabValues);
    
    // Calculate zakat amount
    const zakatAmount = isZakatDue ? netZakatableAmount * this.ZAKAT_RATE : 0;

    return {
      totalAssets,
      totalLiabilities,
      netZakatableAmount,
      zakatAmount,
      isZakatDue,
      madhab,
      calculationDate: new Date().toISOString(),
      nisabValues
    };
  }

  private static calculateTotalAssets(assets: ZakatAssets): number {
    let total = 0;

    // Gold
    total += assets.gold.weight * assets.gold.price;

    // Silver
    total += assets.silver.weight * assets.silver.price;

    // Cash
    total += assets.cash.amount;

    // Business Inventory
    total += assets.businessInventory.value;

    // Livestock
    total += assets.livestock.reduce((sum, item) => sum + item.value, 0);

    // Agricultural Produce
    total += assets.agriculturalProduce.value;

    // Shares
    total += assets.shares.value;

    // Rental Income
    total += assets.rentalIncome.amount;

    // Receivable Debts
    total += assets.debts
      .filter(debt => debt.type === 'receivable')
      .reduce((sum, debt) => sum + debt.amount, 0);

    return total;
  }

  private static calculateTotalLiabilities(assets: ZakatAssets): number {
    return assets.debts
      .filter(debt => debt.type === 'payable')
      .reduce((sum, debt) => sum + debt.amount, 0);
  }

  private static isZakatDue(assets: ZakatAssets, nisabValues: NisabValues): boolean {
    const totalAssets = this.calculateTotalAssets(assets);
    const totalLiabilities = this.calculateTotalLiabilities(assets);
    const netWorth = totalAssets - totalLiabilities;

    // Check against both gold and silver nisab
    const goldNisabValue = nisabValues.gold * assets.gold.price;
    const silverNisabValue = nisabValues.silver * assets.silver.price;

    // Use the lower of the two nisab values (Hanafi ruling)
    const nisabThreshold = Math.min(goldNisabValue, silverNisabValue);

    return netWorth >= nisabThreshold;
  }

  public static getReferences(): string[] {
    return [
      "Quran 9:103 - 'Take, [O, Muhammad], from their wealth a charity by which you purify them and cause them increase...'",
      "Sahih Bukhari 24:486 - 'No Zakat is due on property until one year passes.'",
      "Sahih Muslim 979 - 'There is no Zakat on less than five camels...'",
      "Fiqh al-Islami wa Adillatuhu - Comprehensive rulings on Zakat calculations"
    ];
  }
} 