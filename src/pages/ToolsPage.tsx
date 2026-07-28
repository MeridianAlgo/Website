import React, { useEffect, useMemo, useState } from 'react';

import {
  DollarSign, PiggyBank, CreditCard, Home, TrendingUp,
  Calculator, Receipt, Shield, Briefcase
} from 'lucide-react';
import CollapsibleTool from '../components/CollapsibleTool';

function formatCurrency(n: number) {
  if (!isFinite(n)) return '-';
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function formatCents(n: number) {
  if (!isFinite(n)) return '-';
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const parseNumericInput = (value: string): number => {
  if (value.trim() === '') return NaN;
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : NaN;
};

const SECTIONS = [
  { id: 'budget-cash-flow', title: 'Budget & Cash Flow', count: 4 },
  { id: 'saving-investing', title: 'Saving & Investing', count: 4 },
  { id: 'debt-loans', title: 'Debt & Loans', count: 4 },
  { id: 'income-benefits', title: 'Income & Benefits', count: 2 },
  { id: 'advanced-planning', title: 'Advanced Planning', count: 3 },
  { id: 'more-calculators', title: 'More Calculators', count: 5 },
  { id: 'everyday-tools', title: 'Everyday Tools', count: 5 },
  { id: 'investment-analysis', title: 'Investment Analysis', count: 6 },
  { id: 'business-salary', title: 'Business & Salary', count: 4 },
];

const ToolsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'MeridianAlgo | Tools';
  }, []);

  // 50/30/20 Budget
  const [income, setIncome] = useState('4000');
  const [needs, setNeeds] = useState('50');
  const [wants, setWants] = useState('30');
  const [savings, setSavings] = useState('20');
  const budgetCalc = useMemo(() => {
    const inc = parseNumericInput(income) || 0;
    const n = parseNumericInput(needs) || 0;
    const w = parseNumericInput(wants) || 0;
    const s = parseNumericInput(savings) || 0;
    const total = n + w + s;
    return {
      needsAmt: (inc * n) / 100,
      wantsAmt: (inc * w) / 100,
      savingsAmt: (inc * s) / 100,
      balanced: Math.round(total) === 100
    };
  }, [income, needs, wants, savings]);

  // Emergency Fund
  const [monthlyExpenses, setMonthlyExpenses] = useState('3200');
  const [coverageMonths, setCoverageMonths] = useState('6');
  const [emergencySavings, setEmergencySavings] = useState('5000');
  const emergencyCalc = useMemo(() => {
    const expenses = parseNumericInput(monthlyExpenses) || 0;
    const months = parseNumericInput(coverageMonths) || 0;
    const current = parseNumericInput(emergencySavings) || 0;
    const target = expenses * months;
    return {
      target,
      gap: Math.max(0, target - current),
      monthsCovered: expenses > 0 ? current / expenses : 0
    };
  }, [monthlyExpenses, coverageMonths, emergencySavings]);

  // Compound Interest
  const [compoundInitial, setCompoundInitial] = useState('5000');
  const [compoundMonthly, setCompoundMonthly] = useState('200');
  const [compoundYears, setCompoundYears] = useState('10');
  const [compoundRate, setCompoundRate] = useState('7');
  const compoundCalc = useMemo(() => {
    const P = parseNumericInput(compoundInitial) || 0;
    const PMT = parseNumericInput(compoundMonthly) || 0;
    const years = parseNumericInput(compoundYears) || 0;
    const rate = parseNumericInput(compoundRate) || 0;
    const n = years * 12;
    const r = rate / 100 / 12;
    let futureValue = P * Math.pow(1 + r, n);
    if (r > 0) {
      futureValue += PMT * ((Math.pow(1 + r, n) - 1) / r);
    } else {
      futureValue += PMT * n;
    }
    const totalContributions = P + PMT * n;
    return { futureValue, totalContributions, earnings: futureValue - totalContributions };
  }, [compoundInitial, compoundMonthly, compoundYears, compoundRate]);

  // Debt Payoff
  const [debtBalance, setDebtBalance] = useState('5000');
  const [debtAPR, setDebtAPR] = useState('19.99');
  const [debtMinPay, setDebtMinPay] = useState('150');
  const [debtExtra, setDebtExtra] = useState('100');
  const debtCalc = useMemo(() => {
    const bal = parseNumericInput(debtBalance) || 0;
    const apr = parseNumericInput(debtAPR) || 0;
    const minPay = parseNumericInput(debtMinPay) || 0;
    const extra = parseNumericInput(debtExtra) || 0;
    const monthlyRate = apr / 100 / 12;
    const payment = minPay + extra;
    let remaining = bal;
    let months = 0;
    let totalInterest = 0;
    while (remaining > 0 && months < 600) {
      const interest = remaining * monthlyRate;
      const principal = Math.min(payment - interest, remaining);
      if (principal <= 0) break;
      remaining -= principal;
      totalInterest += interest;
      months++;
    }
    return { months, totalInterest, totalPaid: bal + totalInterest };
  }, [debtBalance, debtAPR, debtMinPay, debtExtra]);

  // Mortgage Affordability
  const [annualIncome, setAnnualIncome] = useState('85000');
  const [monthlyDebt, setMonthlyDebt] = useState('500');
  const [mortgageRate, setMortgageRate] = useState('6.5');
  const [downPayment, setDownPayment] = useState('40000');
  const mortgageCalc = useMemo(() => {
    const income = parseNumericInput(annualIncome) || 0;
    const debt = parseNumericInput(monthlyDebt) || 0;
    const rate = parseNumericInput(mortgageRate) || 0;
    const down = parseNumericInput(downPayment) || 0;
    const monthlyIncomeValue = income / 12;
    const front = monthlyIncomeValue * 0.28;
    const back = monthlyIncomeValue * 0.36 - debt;
    const maxPayment = Math.min(front, back);
    const r = rate / 100 / 12;
    const n = 30 * 12;
    const principal = r > 0 ? maxPayment * (1 - Math.pow(1 + r, -n)) / r : maxPayment * n;
    return { maxPayment, homePrice: principal + down };
  }, [annualIncome, monthlyDebt, mortgageRate, downPayment]);

  // Rent vs Buy
  const [rentMonthly, setRentMonthly] = useState('2000');
  const [homePrice, setHomePrice] = useState('350000');
  const [rentVsBuyYears, setRentVsBuyYears] = useState('5');
  const rentVsBuyCalc = useMemo(() => {
    const rent = parseNumericInput(rentMonthly) || 0;
    const price = parseNumericInput(homePrice) || 0;
    const years = parseNumericInput(rentVsBuyYears) || 0;
    const totalRent = rent * 12 * years;
    const downPay = price * 0.2;
    const loanAmount = price * 0.8;
    const monthlyMortgage = loanAmount * 0.005; // Simplified
    const totalMortgage = monthlyMortgage * 12 * years;
    const maintenance = price * 0.01 * years;
    const totalBuy = downPay + totalMortgage + maintenance;
    return { totalRent, totalBuy, difference: totalBuy - totalRent };
  }, [rentMonthly, homePrice, rentVsBuyYears]);

  // FIRE Calculator
  const [fireAnnualExpenses, setFireAnnualExpenses] = useState('50000');
  const [fireCurrentSavings, setFireCurrentSavings] = useState('100000');
  const [fireMonthlySavings, setFireMonthlySavings] = useState('3000');
  const [fireReturnRate, setFireReturnRate] = useState('7');
  const fireCalc = useMemo(() => {
    const expenses = parseNumericInput(fireAnnualExpenses) || 0;
    const current = parseNumericInput(fireCurrentSavings) || 0;
    const monthly = parseNumericInput(fireMonthlySavings) || 0;
    const rate = parseNumericInput(fireReturnRate) || 0;
    const fireNumber = expenses * 25; // 4% rule
    const gap = Math.max(0, fireNumber - current);
    const r = rate / 100 / 12;
    let balance = current;
    let months = 0;
    while (balance < fireNumber && months < 600) {
      balance = balance * (1 + r) + monthly;
      months++;
    }
    return { fireNumber, gap, yearsToFire: months / 12 };
  }, [fireAnnualExpenses, fireCurrentSavings, fireMonthlySavings, fireReturnRate]);

  // Roth vs Traditional IRA
  const [iraContribution, setIraContribution] = useState('6500');
  const [iraTaxRate, setIraTaxRate] = useState('24');
  const [iraYears, setIraYears] = useState('30');
  const [iraReturn, setIraReturn] = useState('7');
  const iraCalc = useMemo(() => {
    const contrib = parseNumericInput(iraContribution) || 0;
    const taxRate = parseNumericInput(iraTaxRate) / 100 || 0;
    const years = parseNumericInput(iraYears) || 0;
    const returnRate = parseNumericInput(iraReturn) / 100 || 0;
    const rothAfterTax = contrib * (1 - taxRate);
    const rothFuture = rothAfterTax * Math.pow(1 + returnRate, years);
    const tradFuture = contrib * Math.pow(1 + returnRate, years);
    const tradAfterTax = tradFuture * (1 - taxRate);
    return { rothFuture, tradAfterTax, difference: rothFuture - tradAfterTax };
  }, [iraContribution, iraTaxRate, iraYears, iraReturn]);

  // Student Loan Payoff
  const [studentLoanBalance, setStudentLoanBalance] = useState('35000');
  const [studentLoanRate, setStudentLoanRate] = useState('5.5');
  const [studentLoanPayment, setStudentLoanPayment] = useState('400');
  const studentLoanCalc = useMemo(() => {
    const bal = parseNumericInput(studentLoanBalance) || 0;
    const rate = parseNumericInput(studentLoanRate) / 100 / 12 || 0;
    const pmt = parseNumericInput(studentLoanPayment) || 0;
    let remaining = bal;
    let months = 0;
    let totalInterest = 0;
    while (remaining > 0 && months < 600) {
      const interest = remaining * rate;
      const principal = Math.min(pmt - interest, remaining);
      if (principal <= 0) break;
      remaining -= principal;
      totalInterest += interest;
      months++;
    }
    return { months, years: months / 12, totalInterest };
  }, [studentLoanBalance, studentLoanRate, studentLoanPayment]);

  // 401k Calculator
  const [k401Salary, setK401Salary] = useState('75000');
  const [k401Contribution, setK401Contribution] = useState('10');
  const [k401Match, setK401Match] = useState('50');
  const [k401Years, setK401Years] = useState('25');
  const [k401Return, setK401Return] = useState('7');
  const k401Calc = useMemo(() => {
    const salary = parseNumericInput(k401Salary) || 0;
    const contribPct = parseNumericInput(k401Contribution) / 100 || 0;
    const matchPct = parseNumericInput(k401Match) / 100 || 0;
    const years = parseNumericInput(k401Years) || 0;
    const returnRate = parseNumericInput(k401Return) / 100 || 0;
    const annualContrib = salary * contribPct;
    const annualMatch = annualContrib * matchPct;
    const totalAnnual = annualContrib + annualMatch;
    const futureValue = totalAnnual * ((Math.pow(1 + returnRate, years) - 1) / returnRate);
    return { annualContrib, annualMatch, futureValue };
  }, [k401Salary, k401Contribution, k401Match, k401Years, k401Return]);

  // Car Affordability
  const [carIncome, setCarIncome] = useState('60000');
  const [carDownPayment, setCarDownPayment] = useState('5000');
  const [carLoanRate, setCarLoanRate] = useState('5.5');
  const [carLoanTerm, setCarLoanTerm] = useState('60');
  const carCalc = useMemo(() => {
    const income = parseNumericInput(carIncome) || 0;
    const down = parseNumericInput(carDownPayment) || 0;
    const rate = parseNumericInput(carLoanRate) / 100 / 12 || 0;
    const months = parseNumericInput(carLoanTerm) || 0;
    const maxMonthly = (income / 12) * 0.15; // 15% rule
    const loanAmountValue = rate > 0 ? (maxMonthly * (1 - Math.pow(1 + rate, -months))) / rate : maxMonthly * months;
    return { maxMonthly, maxCarPrice: loanAmountValue + down };
  }, [carIncome, carDownPayment, carLoanRate, carLoanTerm]);

  // Credit Card Payoff
  const [ccBalance, setCcBalance] = useState('8000');
  const [ccAPR, setCcAPR] = useState('21.99');
  const [ccPayment, setCcPayment] = useState('300');
  const ccCalc = useMemo(() => {
    const bal = parseNumericInput(ccBalance) || 0;
    const apr = parseNumericInput(ccAPR) / 100 / 12 || 0;
    const pmt = parseNumericInput(ccPayment) || 0;
    let remaining = bal;
    let months = 0;
    let totalInterest = 0;
    while (remaining > 0 && months < 600) {
      const interest = remaining * apr;
      const principal = Math.min(pmt - interest, remaining);
      if (principal <= 0) break;
      remaining -= principal;
      totalInterest += interest;
      months++;
    }
    return { months, totalInterest, totalPaid: bal + totalInterest };
  }, [ccBalance, ccAPR, ccPayment]);

  // Tax Calculator
  const [taxIncome, setTaxIncome] = useState('85000');
  const [taxDeductions, setTaxDeductions] = useState('13850');
  const taxCalc = useMemo(() => {
    const income = parseNumericInput(taxIncome) || 0;
    const deductions = parseNumericInput(taxDeductions) || 0;
    const taxable = Math.max(0, income - deductions);
    // 2024 single filer brackets
    let tax = 0;
    if (taxable > 578125) tax += (taxable - 578125) * 0.37;
    if (taxable > 231250) tax += Math.min(taxable - 231250, 346875) * 0.35;
    if (taxable > 182100) tax += Math.min(taxable - 182100, 49150) * 0.32;
    if (taxable > 95375) tax += Math.min(taxable - 95375, 86725) * 0.24;
    if (taxable > 44725) tax += Math.min(taxable - 44725, 50650) * 0.22;
    if (taxable > 11000) tax += Math.min(taxable - 11000, 33725) * 0.12;
    tax += Math.min(taxable, 11000) * 0.10;
    return { tax, effectiveRate: taxable > 0 ? (tax / taxable) * 100 : 0, afterTax: income - tax };
  }, [taxIncome, taxDeductions]);

  // Retirement Withdrawal
  const [retirementBalance, setRetirementBalance] = useState('1000000');
  const [retirementWithdrawal, setRetirementWithdrawal] = useState('4');
  const retirementCalc = useMemo(() => {
    const balance = parseNumericInput(retirementBalance) || 0;
    const rate = parseNumericInput(retirementWithdrawal) / 100 || 0;
    const annualIncomeValue = balance * rate;
    return { annualIncome: annualIncomeValue, monthlyIncome: annualIncomeValue / 12 };
  }, [retirementBalance, retirementWithdrawal]);

  // HSA Calculator
  const [hsaContribution, setHsaContribution] = useState('4150');
  const [hsaTaxRate, setHsaTaxRate] = useState('24');
  const [hsaYears, setHsaYears] = useState('20');
  const [hsaReturn, setHsaReturn] = useState('6');
  const hsaCalc = useMemo(() => {
    const contrib = parseNumericInput(hsaContribution) || 0;
    const taxRate = parseNumericInput(hsaTaxRate) / 100 || 0;
    const years = parseNumericInput(hsaYears) || 0;
    const returnRate = parseNumericInput(hsaReturn) / 100 || 0;
    const taxSavingsValue = contrib * taxRate;
    const futureValue = contrib * ((Math.pow(1 + returnRate, years) - 1) / returnRate);
    return { taxSavings: taxSavingsValue, futureValue, totalSavings: taxSavingsValue * years };
  }, [hsaContribution, hsaTaxRate, hsaYears, hsaReturn]);

  // College Savings (529)
  const [collegeCost, setCollegeCost] = useState('120000');
  const [collegeYears, setCollegeYears] = useState('15');
  const [collegeSavings, setCollegeSavings] = useState('10000');
  const [collegeMonthly, setCollegeMonthly] = useState('400');
  const [collegeReturn, setCollegeReturn] = useState('6');
  const collegeCalc = useMemo(() => {
    const cost = parseNumericInput(collegeCost) || 0;
    const years = parseNumericInput(collegeYears) || 0;
    const current = parseNumericInput(collegeSavings) || 0;
    const monthly = parseNumericInput(collegeMonthly) || 0;
    const returnRateValue = parseNumericInput(collegeReturn) / 100 || 0;
    const futureCostValue = cost * Math.pow(1.04, years); // 4% inflation
    const r = returnRateValue / 12;
    const n = years * 12;
    let futureValue = current * Math.pow(1 + r, n);
    if (r > 0) {
      futureValue += (monthly * (Math.pow(1 + r, n) - 1)) / r;
    } else {
      futureValue += monthly * n;
    }
    return { futureCost: futureCostValue, future: futureValue, gap: Math.max(0, futureCostValue - futureValue) };
  }, [collegeCost, collegeYears, collegeSavings, collegeMonthly, collegeReturn]);

  // Paycheck Calculator
  const [paycheckGross, setPaycheckGross] = useState('5000');
  const [paycheckFederal, setPaycheckFederal] = useState('12');
  const [paycheckState, setPaycheckState] = useState('5');
  const [paycheck401k, setPaycheck401k] = useState('6');
  const paycheckCalc = useMemo(() => {
    const gross = parseNumericInput(paycheckGross) || 0;
    const federal = parseNumericInput(paycheckFederal) / 100 || 0;
    const state = parseNumericInput(paycheckState) / 100 || 0;
    const k401 = parseNumericInput(paycheck401k) / 100 || 0;
    const fica = 0.0765; // Social Security + Medicare
    const federalTaxValue = gross * federal;
    const stateTaxValue = gross * state;
    const ficaTaxValue = gross * fica;
    const retirementValue = gross * k401;
    const totalDeductionsValue = federalTaxValue + stateTaxValue + ficaTaxValue + retirementValue;
    const netPayValue = gross - totalDeductionsValue;
    return { federalTax: federalTaxValue, stateTax: stateTaxValue, ficaTax: ficaTaxValue, retirement: retirementValue, totalDeductions: totalDeductionsValue, netPay: netPayValue };
  }, [paycheckGross, paycheckFederal, paycheckState, paycheck401k]);

  // Net Worth
  const [totalAssets, setTotalAssets] = useState('150000');
  const [totalLiabilities, setTotalLiabilities] = useState('80000');
  const netWorthCalc = useMemo(() => {
    const assets = parseNumericInput(totalAssets) || 0;
    const liab = parseNumericInput(totalLiabilities) || 0;
    return { netWorth: assets - liab, ratio: liab > 0 ? (assets / liab).toFixed(2) : '∞' };
  }, [totalAssets, totalLiabilities]);

  // Savings Goal
  const [goalTarget, setGoalTarget] = useState('20000');
  const [goalCurrent, setGoalCurrent] = useState('5000');
  const [goalMonthly, setGoalMonthly] = useState('500');
  const [goalRate, setGoalRate] = useState('4');
  const goalCalc = useMemo(() => {
    const target = parseNumericInput(goalTarget) || 0;
    const current = parseNumericInput(goalCurrent) || 0;
    const monthly = parseNumericInput(goalMonthly) || 0;
    const r = (parseNumericInput(goalRate) || 0) / 100 / 12;
    let balance = current;
    let months = 0;
    while (balance < target && months < 600) {
      balance = balance * (1 + r) + monthly;
      months++;
    }
    return { months, years: (months / 12).toFixed(1) };
  }, [goalTarget, goalCurrent, goalMonthly, goalRate]);

  // Inflation Calculator
  const [inflationAmount, setInflationAmount] = useState('100000');
  const [inflationYears, setInflationYears] = useState('20');
  const [inflationRate, setInflationRate] = useState('3');
  const inflationCalc = useMemo(() => {
    const amount = parseNumericInput(inflationAmount) || 0;
    const years = parseNumericInput(inflationYears) || 0;
    const rate = (parseNumericInput(inflationRate) || 0) / 100;
    return {
      futureNeeded: amount * Math.pow(1 + rate, years),
      todayPower: amount / Math.pow(1 + rate, years),
    };
  }, [inflationAmount, inflationYears, inflationRate]);

  // Dividend Income
  const [divInvested, setDivInvested] = useState('50000');
  const [divYield, setDivYield] = useState('3.5');
  const [divYears, setDivYears] = useState('10');
  const divCalc = useMemo(() => {
    const invested = parseNumericInput(divInvested) || 0;
    const yieldPct = (parseNumericInput(divYield) || 0) / 100;
    const years = parseNumericInput(divYears) || 0;
    const annualDiv = invested * yieldPct;
    let balance = invested;
    for (let i = 0; i < years; i++) balance += balance * yieldPct;
    return { annualDiv, monthlyDiv: annualDiv / 12, dripValue: balance };
  }, [divInvested, divYield, divYears]);

  // Rule of 72
  const [ruleRate, setRuleRate] = useState('7');
  const ruleCalc = useMemo(() => {
    const rate = parseNumericInput(ruleRate) || 0;
    return { years: rate > 0 ? (72 / rate).toFixed(1) : '∞', months: rate > 0 ? Math.round(864 / rate) : Infinity };
  }, [ruleRate]);

  // CAGR
  const [cagrInitial, setCagrInitial] = useState('10000');
  const [cagrFinal, setCagrFinal] = useState('25000');
  const [cagrYears, setCagrYears] = useState('8');
  const cagrCalc = useMemo(() => {
    const initial = parseNumericInput(cagrInitial) || 0;
    const final = parseNumericInput(cagrFinal) || 0;
    const years = parseNumericInput(cagrYears) || 0;
    const cagr = initial > 0 && years > 0 ? (Math.pow(final / initial, 1 / years) - 1) * 100 : 0;
    return { cagr, gain: final - initial };
  }, [cagrInitial, cagrFinal, cagrYears]);

  // Capital Gains Tax
  const [cgBuy, setCgBuy] = useState('10000');
  const [cgSell, setCgSell] = useState('25000');
  const [cgIncome, setCgIncome] = useState('85000');
  const cgCalc = useMemo(() => {
    const gain = Math.max(0, (parseNumericInput(cgSell) || 0) - (parseNumericInput(cgBuy) || 0));
    const income = parseNumericInput(cgIncome) || 0;
    const ltRate = income > 518900 ? 0.20 : income > 47025 ? 0.15 : 0;
    const stRate = income > 578125 ? 0.37 : income > 231250 ? 0.35 : income > 182050 ? 0.32 : income > 95375 ? 0.24 : income > 44725 ? 0.22 : income > 11000 ? 0.12 : 0.10;
    return { gain, ltTax: gain * ltRate, stTax: gain * stRate, ltRate: ltRate * 100, stRate: stRate * 100, savings: gain * (stRate - ltRate) };
  }, [cgBuy, cgSell, cgIncome]);

  // Dollar Cost Averaging
  const [dcaMonthly, setDcaMonthly] = useState('500');
  const [dcaYears, setDcaYears] = useState('10');
  const [dcaReturn, setDcaReturn] = useState('8');
  const [dcaInitial, setDcaInitial] = useState('1000');
  const dcaCalc = useMemo(() => {
    const monthly = parseNumericInput(dcaMonthly) || 0;
    const years = parseNumericInput(dcaYears) || 0;
    const r = (parseNumericInput(dcaReturn) || 0) / 100 / 12;
    const initial = parseNumericInput(dcaInitial) || 0;
    const n = years * 12;
    let fv = initial * Math.pow(1 + r, n);
    fv += r > 0 ? monthly * ((Math.pow(1 + r, n) - 1) / r) : monthly * n;
    const totalContrib = initial + monthly * n;
    return { futureValue: fv, totalContrib, gain: fv - totalContrib };
  }, [dcaMonthly, dcaYears, dcaReturn, dcaInitial]);

  // Salary Converter
  const [salaryAnnual, setSalaryAnnual] = useState('75000');
  const [salaryHours, setSalaryHours] = useState('40');
  const salaryCalc = useMemo(() => {
    const annual = parseNumericInput(salaryAnnual) || 0;
    const hours = parseNumericInput(salaryHours) || 40;
    return {
      monthly: annual / 12,
      biweekly: annual / 26,
      weekly: annual / 52,
      hourly: annual / (hours * 52),
    };
  }, [salaryAnnual, salaryHours]);

  // Break-Even
  const [beFixed, setBeFixed] = useState('50000');
  const [bePrice, setBePrice] = useState('100');
  const [beVariable, setBeVariable] = useState('60');
  const beCalc = useMemo(() => {
    const fixed = parseNumericInput(beFixed) || 0;
    const price = parseNumericInput(bePrice) || 0;
    const variable = parseNumericInput(beVariable) || 0;
    const margin = price - variable;
    const units = margin > 0 ? Math.ceil(fixed / margin) : Infinity;
    return { units, revenue: isFinite(units) ? units * price : Infinity, margin };
  }, [beFixed, bePrice, beVariable]);

  // Tip Calculator
  const [tipBill, setTipBill] = useState('85');
  const [tipPct, setTipPct] = useState('20');
  const [tipPeople, setTipPeople] = useState('4');
  const tipCalc = useMemo(() => {
    const bill = parseNumericInput(tipBill) || 0;
    const pct = (parseNumericInput(tipPct) || 0) / 100;
    const people = Math.max(1, parseNumericInput(tipPeople) || 1);
    const tip = bill * pct;
    const total = bill + tip;
    return { tip, total, perPerson: total / people, tipPerPerson: tip / people };
  }, [tipBill, tipPct, tipPeople]);

  // Loan Comparison
  const [loanAmt, setLoanAmt] = useState('25000');
  const [loanRate1, setLoanRate1] = useState('5.5');
  const [loanTerm1, setLoanTerm1] = useState('60');
  const [loanRate2, setLoanRate2] = useState('7.5');
  const [loanTerm2, setLoanTerm2] = useState('72');
  const loanCompCalc = useMemo(() => {
    const p = parseNumericInput(loanAmt) || 0;
    const calcLoan = (ratePct: string, termMonths: string) => {
      const r = (parseNumericInput(ratePct) || 0) / 100 / 12;
      const n = parseNumericInput(termMonths) || 0;
      const pmt = r > 0 ? (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : p / n;
      return { pmt, total: pmt * n, interest: pmt * n - p };
    };
    return { a: calcLoan(loanRate1, loanTerm1), b: calcLoan(loanRate2, loanTerm2) };
  }, [loanAmt, loanRate1, loanTerm1, loanRate2, loanTerm2]);

  // Rent Affordability
  const [rentIncome, setRentIncome] = useState('3800');
  const [rentDebts, setRentDebts] = useState('300');
  const [rentPct, setRentPct] = useState('30');
  const rentAffordCalc = useMemo(() => {
    const income = parseNumericInput(rentIncome) || 0;
    const debts = parseNumericInput(rentDebts) || 0;
    const pct = (parseNumericInput(rentPct) || 0) / 100;
    const maxRent = income * pct;
    return { maxRent, annual: maxRent * 12, leftOver: income - maxRent - debts };
  }, [rentIncome, rentDebts, rentPct]);

  // Cost of a Habit
  const [habitSpend, setHabitSpend] = useState('6');
  const [habitPerWeek, setHabitPerWeek] = useState('5');
  const [habitYears, setHabitYears] = useState('10');
  const [habitReturn, setHabitReturn] = useState('7');
  const habitCalc = useMemo(() => {
    const spend = parseNumericInput(habitSpend) || 0;
    const perWeek = parseNumericInput(habitPerWeek) || 0;
    const years = parseNumericInput(habitYears) || 0;
    const r = (parseNumericInput(habitReturn) || 0) / 100 / 12;
    const monthly = (spend * perWeek * 52) / 12;
    const n = years * 12;
    const invested = r > 0 ? monthly * ((Math.pow(1 + r, n) - 1) / r) : monthly * n;
    return { yearly: monthly * 12, spent: monthly * n, invested };
  }, [habitSpend, habitPerWeek, habitYears, habitReturn]);

  // Refinance Break-Even
  const [refiOld, setRefiOld] = useState('1850');
  const [refiNew, setRefiNew] = useState('1640');
  const [refiCosts, setRefiCosts] = useState('4500');
  const refiCalc = useMemo(() => {
    const saved = (parseNumericInput(refiOld) || 0) - (parseNumericInput(refiNew) || 0);
    const costs = parseNumericInput(refiCosts) || 0;
    const months = saved > 0 ? Math.ceil(costs / saved) : Infinity;
    return { saved, months, fiveYear: saved * 60 - costs };
  }, [refiOld, refiNew, refiCosts]);

  // Expense Ratio Drag
  const [erAmount, setErAmount] = useState('25000');
  const [erYears, setErYears] = useState('30');
  const [erReturn, setErReturn] = useState('7');
  const [erRatio, setErRatio] = useState('0.75');
  const erCalc = useMemo(() => {
    const amount = parseNumericInput(erAmount) || 0;
    const years = parseNumericInput(erYears) || 0;
    const ret = (parseNumericInput(erReturn) || 0) / 100;
    const ratio = (parseNumericInput(erRatio) || 0) / 100;
    const gross = amount * Math.pow(1 + ret, years);
    const net = amount * Math.pow(1 + Math.max(-0.99, ret - ratio), years);
    return { gross, net, cost: gross - net };
  }, [erAmount, erYears, erReturn, erRatio]);

  // Real Return After Inflation
  const [realAmount, setRealAmount] = useState('10000');
  const [realNominal, setRealNominal] = useState('7');
  const [realInflation, setRealInflation] = useState('3');
  const [realYears, setRealYears] = useState('20');
  const realCalc = useMemo(() => {
    const amount = parseNumericInput(realAmount) || 0;
    const nominal = (parseNumericInput(realNominal) || 0) / 100;
    const inflation = (parseNumericInput(realInflation) || 0) / 100;
    const years = parseNumericInput(realYears) || 0;
    const realRate = (1 + nominal) / (1 + inflation) - 1;
    return {
      realRate: realRate * 100,
      onPaper: amount * Math.pow(1 + nominal, years),
      inTodaysMoney: amount * Math.pow(1 + realRate, years),
    };
  }, [realAmount, realNominal, realInflation, realYears]);

  // Unit Price Compare
  const [unitPriceA, setUnitPriceA] = useState('4.99');
  const [unitSizeA, setUnitSizeA] = useState('12');
  const [unitPriceB, setUnitPriceB] = useState('7.49');
  const [unitSizeB, setUnitSizeB] = useState('20');
  const unitCalc = useMemo(() => {
    const sizeA = parseNumericInput(unitSizeA) || 0;
    const sizeB = parseNumericInput(unitSizeB) || 0;
    const a = sizeA > 0 ? (parseNumericInput(unitPriceA) || 0) / sizeA : Infinity;
    const b = sizeB > 0 ? (parseNumericInput(unitPriceB) || 0) / sizeB : Infinity;
    const cheaper = a === b ? 'Same price' : a < b ? 'Option A' : 'Option B';
    const gap = Math.abs(a - b) / Math.max(a, b);
    return { a, b, cheaper, gap: isFinite(gap) ? gap * 100 : 0 };
  }, [unitPriceA, unitSizeA, unitPriceB, unitSizeB]);

  // Finance It or Save Up
  const [buyPrice, setBuyPrice] = useState('1200');
  const [buyAPR, setBuyAPR] = useState('19.99');
  const [buyTerm, setBuyTerm] = useState('12');
  const [buySave, setBuySave] = useState('150');
  const buyCalc = useMemo(() => {
    const price = parseNumericInput(buyPrice) || 0;
    const r = (parseNumericInput(buyAPR) || 0) / 100 / 12;
    const n = parseNumericInput(buyTerm) || 0;
    const save = parseNumericInput(buySave) || 0;
    const payment = n > 0 ? (r > 0 ? (price * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : price / n) : 0;
    const total = payment * n;
    return {
      payment,
      interest: total - price,
      total,
      monthsToSave: save > 0 ? Math.ceil(price / save) : Infinity,
    };
  }, [buyPrice, buyAPR, buyTerm, buySave]);

  // Freelance Hourly Rate
  const [flTarget, setFlTarget] = useState('60000');
  const [flExpenses, setFlExpenses] = useState('6000');
  const [flTaxRate, setFlTaxRate] = useState('25');
  const [flWeeks, setFlWeeks] = useState('46');
  const [flHours, setFlHours] = useState('25');
  const flCalc = useMemo(() => {
    const target = parseNumericInput(flTarget) || 0;
    const expenses = parseNumericInput(flExpenses) || 0;
    const tax = Math.min(0.9, (parseNumericInput(flTaxRate) || 0) / 100);
    const weeks = parseNumericInput(flWeeks) || 0;
    const hours = parseNumericInput(flHours) || 0;
    const grossNeeded = (target + expenses) / (1 - tax);
    const billable = weeks * hours;
    return { grossNeeded, billable, rate: billable > 0 ? grossNeeded / billable : 0 };
  }, [flTarget, flExpenses, flTaxRate, flWeeks, flHours]);

  return (
    <div>
      <section className="sheet py-14 lg:py-20">
        <p className="lbl"></p>
        <h1 className="display-1 mt-3 max-w-[18ch]">37 Tools.</h1>
        <p className="display-2 mt-3 max-w-[18ch]">Nothing to sign up for.</p>
        <p className="lede mt-6">
          Every calculator runs in this page. Your figures stay in the browser,
          the assumptions are printed next to the answer, and you can read the
          code that does the arithmetic.
        </p>
      </section>

      {/* Index of the sheet */}
      <section id="tools-index" className="sheet scroll-mt-20 pb-8">
        <h2 className="lbl border-t border-ink pt-4 text-ink">Sections</h2>
        <ul className="mt-3 list-none columns-1 gap-x-10 p-0 sm:columns-2 lg:columns-3">
          {SECTIONS.map((section, i) => (
            <li key={section.id} className="break-inside-avoid">
              <a
                href={`#${section.id}`}
                className="flex items-baseline gap-3 border-b border-rule py-2 hover:text-stamp"
              >
                <span className="fig text-[0.6875rem] text-steel">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[0.9375rem]">{section.title}</span>
                <span className="entry-fill" aria-hidden="true" />
                <span className="fig text-[0.8125rem] text-steel">{section.count}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div id="tools-start" className="sheet pb-20">
        <div className="space-y-16">
          {/* Section: Budget & Cash Flow */}
          <section id="budget-cash-flow" className="scroll-mt-20">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-ink pt-4">
              <h2 className="display-2">Budget & Cash Flow</h2>
              <a href="#tools-index" className="lbl hover:text-stamp">Back to index</a>
            </div>

            <div className="grid gap-6 md:grid-cols-2 items-start">
              <CollapsibleTool
                title="50/30/20 Budget Planner"
                icon={<DollarSign className="w-5 h-5" />}
                description="Balance your spending with the popular 50/30/20 rule"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Monthly Income</label>
                    <input type="number" value={income} onChange={e => setIncome(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-3 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">Needs %</label>
                      <input type="number" value={needs} onChange={e => setNeeds(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Wants %</label>
                      <input type="number" value={wants} onChange={e => setWants(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Savings %</label>
                      <input type="number" value={savings} onChange={e => setSavings(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <p className={`lbl text-center ${budgetCalc.balanced ? '' : 'text-stamp'}`}>
                    {budgetCalc.balanced ? '✓ Balanced' : '✗ Must equal 100%'}
                  </p>
                  <div className="mt-4 grid grid-cols-3 items-end gap-3">
                    <div className="border border-rule bg-band p-4 text-center">
                      <p className="lbl mb-1">Needs</p>
                      <p className="fig font-medium">{formatCurrency(budgetCalc.needsAmt)}</p>
                    </div>
                    <div className="border border-rule bg-band p-4 text-center">
                      <p className="lbl mb-1">Wants</p>
                      <p className="fig font-medium">{formatCurrency(budgetCalc.wantsAmt)}</p>
                    </div>
                    <div className="border border-rule bg-band p-4 text-center">
                      <p className="lbl mb-1">Savings</p>
                      <p className="fig font-medium">{formatCurrency(budgetCalc.savingsAmt)}</p>
                    </div>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Emergency Fund Calculator"
                icon={<Shield className="w-5 h-5" />}
                description="Calculate how much you need for financial emergencies"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Monthly Expenses</label>
                    <input type="number" value={monthlyExpenses} onChange={e => setMonthlyExpenses(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div>
                    <label className="lbl mb-1 block">Months of Coverage</label>
                    <input type="number" value={coverageMonths} onChange={e => setCoverageMonths(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div>
                    <label className="lbl mb-1 block">Current Savings</label>
                    <input type="number" value={emergencySavings} onChange={e => setEmergencySavings(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="mt-4 border border-rule bg-band p-6">
                    <p className="lbl mb-2">Target Fund</p>
                    <p className="fig mb-2 text-3xl font-medium">{formatCurrency(emergencyCalc.target)}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-stamp">Gap: {formatCurrency(emergencyCalc.gap)}</span>
                      <span className="text-steel">{emergencyCalc.monthsCovered.toFixed(1)} months ready</span>
                    </div>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Rent Affordability"
                icon={<Home className="w-5 h-5" />}
                description="What landlords expect you to earn"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Gross Monthly Income</label>
                    <input type="number" value={rentIncome} onChange={e => setRentIncome(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">Other Monthly Debts</label>
                      <input type="number" value={rentDebts} onChange={e => setRentDebts(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Rent Share %</label>
                      <input type="number" value={rentPct} onChange={e => setRentPct(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Max Rent</p>
                    <p className="fig text-2xl font-medium">{formatCurrency(rentAffordCalc.maxRent)}</p>
                    <p className="lbl mt-1">{formatCurrency(rentAffordCalc.annual)} a year</p>
                  </div>
                  <div className="border border-rule bg-band p-3 text-center">
                    <p className="lbl mb-1">Left for everything else</p>
                    <p className={`fig text-lg font-medium ${rentAffordCalc.leftOver >= 0 ? '' : 'text-stamp'}`}>
                      {formatCurrency(rentAffordCalc.leftOver)}
                    </p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Cost of a Habit"
                icon={<Receipt className="w-5 h-5" />}
                description="What a small regular spend adds up to"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">Cost Each Time</label>
                      <input type="number" value={habitSpend} onChange={e => setHabitSpend(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Times Per Week</label>
                      <input type="number" value={habitPerWeek} onChange={e => setHabitPerWeek(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">Years</label>
                      <input type="number" value={habitYears} onChange={e => setHabitYears(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">If Invested %</label>
                      <input type="number" value={habitReturn} onChange={e => setHabitReturn(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">Per Year</p>
                      <p className="fig text-lg font-medium">{formatCurrency(habitCalc.yearly)}</p>
                    </div>
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">Total Spent</p>
                      <p className="fig text-lg font-medium text-stamp">{formatCurrency(habitCalc.spent)}</p>
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">If invested instead</p>
                    <p className="fig text-2xl font-medium">{formatCurrency(habitCalc.invested)}</p>
                  </div>
                </div>
              </CollapsibleTool>

            </div>
          </section>

          {/* Section: Saving & Investing */}
          <section id="saving-investing" className="scroll-mt-20">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-ink pt-4">
              <h2 className="display-2">Saving & Investing</h2>
              <a href="#tools-index" className="lbl hover:text-stamp">Back to index</a>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 items-start">
              <CollapsibleTool
                title="Compound Interest"
                icon={<TrendingUp className="w-5 h-5" />}
                description="See the power of compounding"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Initial</label>
                    <input type="number" value={compoundInitial} onChange={e => setCompoundInitial(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">Monthly +</label>
                      <input type="number" value={compoundMonthly} onChange={e => setCompoundMonthly(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Years</label>
                      <input type="number" value={compoundYears} onChange={e => setCompoundYears(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div>
                    <label className="lbl mb-1 block">Rate %</label>
                    <input type="number" value={compoundRate} onChange={e => setCompoundRate(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Future Value</p>
                    <p className="fig text-2xl font-medium">{formatCurrency(compoundCalc.futureValue)}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Roth vs Trad IRA"
                icon={<PiggyBank className="w-5 h-5" />}
                description="Compare retirement accounts"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Annual Contribution</label>
                    <input type="number" value={iraContribution} onChange={e => setIraContribution(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-3 items-end gap-3">
                    <div>
                      <label className="lbl mb-1 block">Tax Rate %</label>
                      <input type="number" value={iraTaxRate} onChange={e => setIraTaxRate(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Years</label>
                      <input type="number" value={iraYears} onChange={e => setIraYears(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Return %</label>
                      <input type="number" value={iraReturn} onChange={e => setIraReturn(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Roth Advantage</p>
                    <p className="fig text-2xl font-medium">{formatCurrency(Math.abs(iraCalc.difference))}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool title="Rule of 72" icon={<Calculator className="w-5 h-5" />} description="How long to double your money">
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Annual Return %</label>
                    <input type="number" value={ruleRate} onChange={e => setRuleRate(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="border border-rule bg-band p-6 text-center">
                    <p className="lbl mb-2">Years to Double</p>
                    <p className="fig text-3xl font-medium">{ruleCalc.years}</p>
                    <p className="lbl mt-2">≈ {ruleCalc.months !== Infinity ? `${ruleCalc.months} months` : '—'}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="401(k) Match"
                icon={<Briefcase className="w-5 h-5" />}
                description="Employer match bonuses"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Annual Salary</label>
                    <input type="number" value={k401Salary} onChange={e => setK401Salary(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">Your Contrib %</label>
                      <input type="number" value={k401Contribution} onChange={e => setK401Contribution(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Match %</label>
                      <input type="number" value={k401Match} onChange={e => setK401Match(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">Years</label>
                      <input type="number" value={k401Years} onChange={e => setK401Years(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Return %</label>
                      <input type="number" value={k401Return} onChange={e => setK401Return(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Pot. Future Value</p>
                    <p className="fig text-2xl font-medium text-steel">{formatCurrency(k401Calc.futureValue)}</p>
                    <p className="lbl mt-1">based on {formatCurrency(k401Calc.annualMatch)}/yr match</p>
                  </div>
                </div>
              </CollapsibleTool>
            </div>
          </section>

          {/* Section: Debt & Loans */}
          <section id="debt-loans" className="scroll-mt-20">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-ink pt-4">
              <h2 className="display-2">Debt & Loans</h2>
              <a href="#tools-index" className="lbl hover:text-stamp">Back to index</a>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
              <CollapsibleTool
                title="Debt Payoff"
                icon={<CreditCard className="w-5 h-5" />}
                description="Plan your debt freedom"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">Balance</label>
                      <input type="number" value={debtBalance} onChange={e => setDebtBalance(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">APR %</label>
                      <input type="number" value={debtAPR} onChange={e => setDebtAPR(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">Min Pay</label>
                      <input type="number" value={debtMinPay} onChange={e => setDebtMinPay(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Extra</label>
                      <input type="number" value={debtExtra} onChange={e => setDebtExtra(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Time to Payoff</p>
                    <p className="fig text-2xl font-medium">{debtCalc.months} months</p>
                    <p className="lbl mt-1">Total Paid: {formatCurrency(debtCalc.totalPaid)}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Mortgage Affordability"
                icon={<Home className="w-5 h-5" />}
                description="How much house can you afford?"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Annual Income</label>
                    <input type="number" value={annualIncome} onChange={e => setAnnualIncome(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">Mth Loan Debt</label>
                      <input type="number" value={monthlyDebt} onChange={e => setMonthlyDebt(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Down Pmt</label>
                      <input type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div>
                    <label className="lbl mb-1 block">Interest Rate %</label>
                    <input type="number" value={mortgageRate} onChange={e => setMortgageRate(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Max Home Price</p>
                    <p className="fig text-2xl font-medium">{formatCurrency(mortgageCalc.homePrice)}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Car Affordability"
                icon={<Calculator className="w-5 h-5" />}
                description="15% income rule"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Income</label>
                    <input type="number" value={carIncome} onChange={e => setCarIncome(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">Down Pmt</label>
                      <input type="number" value={carDownPayment} onChange={e => setCarDownPayment(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Loan Rate %</label>
                      <input type="number" value={carLoanRate} onChange={e => setCarLoanRate(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div>
                    <label className="lbl mb-1 block">Loan Term (Months)</label>
                    <input type="number" value={carLoanTerm} onChange={e => setCarLoanTerm(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Max Car Price</p>
                    <p className="fig text-2xl font-medium">{formatCurrency(carCalc.maxCarPrice)}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Refinance Break-Even"
                icon={<Calculator className="w-5 h-5" />}
                description="How long until the new rate pays for itself"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">Current Payment</label>
                      <input type="number" value={refiOld} onChange={e => setRefiOld(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">New Payment</label>
                      <input type="number" value={refiNew} onChange={e => setRefiNew(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div>
                    <label className="lbl mb-1 block">Closing Costs</label>
                    <input type="number" value={refiCosts} onChange={e => setRefiCosts(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Break-Even</p>
                    <p className="fig text-2xl font-medium">
                      {isFinite(refiCalc.months) ? `${refiCalc.months} months` : 'Never'}
                    </p>
                    <p className="lbl mt-1">{formatCurrency(refiCalc.saved)} saved each month</p>
                  </div>
                  <div className="border border-rule bg-band p-3 text-center">
                    <p className="lbl mb-1">Net after 5 years</p>
                    <p className={`fig text-lg font-medium ${refiCalc.fiveYear >= 0 ? '' : 'text-stamp'}`}>
                      {formatCurrency(refiCalc.fiveYear)}
                    </p>
                  </div>
                </div>
              </CollapsibleTool>

            </div>
          </section>

          {/* Section: Paycheck & HSA */}
          <section id="income-benefits" className="scroll-mt-20">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-ink pt-4">
              <h2 className="display-2">Income & Benefits</h2>
              <a href="#tools-index" className="lbl hover:text-stamp">Back to index</a>
            </div>

            <div className="grid gap-6 md:grid-cols-2 items-start">
              <CollapsibleTool
                title="Paycheck Estimator"
                icon={<DollarSign className="w-5 h-5" />}
                description="See your take-home pay"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Gross Pay (Monthly)</label>
                    <input type="number" value={paycheckGross} onChange={e => setPaycheckGross(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-3 items-end gap-3">
                    <div>
                      <label className="lbl mb-1 block">Fed Tax %</label>
                      <input type="number" value={paycheckFederal} onChange={e => setPaycheckFederal(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">State %</label>
                      <input type="number" value={paycheckState} onChange={e => setPaycheckState(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">401k %</label>
                      <input type="number" value={paycheck401k} onChange={e => setPaycheck401k(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Net Take-Home</p>
                    <p className="fig text-2xl font-medium">{formatCurrency(paycheckCalc.netPay)}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="HSA Savings"
                icon={<Shield className="w-5 h-5" />}
                description="Triple tax advantage"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Annual Contribution</label>
                    <input type="number" value={hsaContribution} onChange={e => setHsaContribution(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-3 items-end gap-3">
                    <div>
                      <label className="lbl mb-1 block">Tax Rate %</label>
                      <input type="number" value={hsaTaxRate} onChange={e => setHsaTaxRate(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Years</label>
                      <input type="number" value={hsaYears} onChange={e => setHsaYears(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Return %</label>
                      <input type="number" value={hsaReturn} onChange={e => setHsaReturn(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Future HSA Value</p>
                    <p className="fig text-2xl font-medium">{formatCurrency(hsaCalc.futureValue)}</p>
                    <p className="lbl mt-1">Tax Savings: {formatCurrency(hsaCalc.taxSavings)}/yr</p>
                  </div>
                </div>
              </CollapsibleTool>
            </div>
          </section>

          {/* More tools section */}


          {/* Section: Advanced Planning */}
          <section id="advanced-planning" className="scroll-mt-20">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-ink pt-4">
              <h2 className="display-2">Advanced Planning</h2>
              <a href="#tools-index" className="lbl hover:text-stamp">Back to index</a>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
              <CollapsibleTool
                title="FIRE Calculator"
                icon={<TrendingUp className="w-5 h-5" />}
                description="Financial Independence Retire Early"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Annual Expenses in Retirement</label>
                    <input type="number" value={fireAnnualExpenses} onChange={e => setFireAnnualExpenses(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div>
                    <label className="lbl mb-1 block">Current Savings</label>
                    <input type="number" value={fireCurrentSavings} onChange={e => setFireCurrentSavings(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">Monthly Save</label>
                      <input type="number" value={fireMonthlySavings} onChange={e => setFireMonthlySavings(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Return %</label>
                      <input type="number" value={fireReturnRate} onChange={e => setFireReturnRate(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">FIRE Number</p>
                    <p className="fig text-2xl font-medium">{formatCurrency(fireCalc.fireNumber)}</p>
                    <p className="mt-1 text-sm">{fireCalc.yearsToFire.toFixed(1)} years to goal</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Rent vs Buy"
                icon={<Home className="w-5 h-5" />}
                description="Compare 5-year outlook"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Monthly Rent</label>
                    <input type="number" value={rentMonthly} onChange={e => setRentMonthly(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div>
                    <label className="lbl mb-1 block">Home Price</label>
                    <input type="number" value={homePrice} onChange={e => setHomePrice(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div>
                    <label className="lbl mb-1 block">Comaprison Years</label>
                    <input type="number" value={rentVsBuyYears} onChange={e => setRentVsBuyYears(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Verdict</p>
                    <p className="fig text-xl font-medium">{rentVsBuyCalc.difference > 0 ? "Rent is Cheaper" : "Buy is Cheaper"}</p>
                    <p className="lbl mt-1">Difference: {formatCurrency(Math.abs(rentVsBuyCalc.difference))}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Student Loan Payoff"
                icon={<Briefcase className="w-5 h-5" />}
                description="Plan your customized payoff strategy"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Loan Balance</label>
                    <input type="number" value={studentLoanBalance} onChange={e => setStudentLoanBalance(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">Rate %</label>
                      <input type="number" value={studentLoanRate} onChange={e => setStudentLoanRate(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Monthly Pay</label>
                      <input type="number" value={studentLoanPayment} onChange={e => setStudentLoanPayment(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Time to Payoff</p>
                    <p className="fig text-2xl font-medium">{studentLoanCalc.years.toFixed(1)} years</p>
                    <p className="lbl mt-1">Total Interest: {formatCurrency(studentLoanCalc.totalInterest)}</p>
                  </div>
                </div>
              </CollapsibleTool>
            </div>
          </section>

          {/* Section: More Calculators */}
          <section id="more-calculators" className="scroll-mt-20">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-ink pt-4">
              <h2 className="display-2">More Calculators</h2>
              <a href="#tools-index" className="lbl hover:text-stamp">Back to index</a>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
              <CollapsibleTool
                title="Credit Card Payoff"
                icon={<CreditCard className="w-5 h-5" />}
                description="Kill high interest debt"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Balance</label>
                    <input type="number" value={ccBalance} onChange={e => setCcBalance(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">APR %</label>
                      <input type="number" value={ccAPR} onChange={e => setCcAPR(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Monthly Pay</label>
                      <input type="number" value={ccPayment} onChange={e => setCcPayment(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Time to Payoff</p>
                    <p className="fig text-2xl font-medium">{ccCalc.months} months</p>
                    <p className="lbl mt-1">Total Interest: {formatCurrency(ccCalc.totalInterest)}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Investment Withdrawal"
                icon={<PiggyBank className="w-5 h-5" />}
                description="Safe withdrawal rates"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Portfolio Balance</label>
                    <input type="number" value={retirementBalance} onChange={e => setRetirementBalance(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div>
                    <label className="lbl mb-1 block">Withdrawal Rate %</label>
                    <input type="number" value={retirementWithdrawal} onChange={e => setRetirementWithdrawal(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Monthly Income</p>
                    <p className="fig text-2xl font-medium">{formatCurrency(retirementCalc.monthlyIncome)}</p>
                    <p className="lbl mt-1">{formatCurrency(retirementCalc.annualIncome)}/year</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Income Tax Estimator"
                icon={<Receipt className="w-5 h-5" />}
                description="Estimate federal taxes"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Taxable Income</label>
                    <input type="number" value={taxIncome} onChange={e => setTaxIncome(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div>
                    <label className="lbl mb-1 block">Standard Deduction</label>
                    <input type="number" value={taxDeductions} onChange={e => setTaxDeductions(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Est. Tax</p>
                    <p className="fig text-2xl font-medium">{formatCurrency(taxCalc.tax)}</p>
                    <p className="lbl mt-1">Effective Rate: {taxCalc.effectiveRate.toFixed(1)}%</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool title="Capital Gains Tax" icon={<Receipt className="w-5 h-5" />} description="Short-term vs long-term tax owed">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div>
                      <label className="lbl mb-1 block">Buy Price</label>
                      <input type="number" value={cgBuy} onChange={e => setCgBuy(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Sell Price</label>
                      <input type="number" value={cgSell} onChange={e => setCgSell(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div>
                    <label className="lbl mb-1 block">Annual Income</label>
                    <input type="number" value={cgIncome} onChange={e => setCgIncome(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="border border-rule bg-band p-3 text-center">
                    <p className="lbl mb-1">Gain</p>
                    <p className="fig text-lg font-medium">{formatCurrency(cgCalc.gain)}</p>
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">Short-term ({cgCalc.stRate.toFixed(0)}%)</p>
                      <p className="fig text-base font-medium text-stamp">{formatCurrency(cgCalc.stTax)}</p>
                    </div>
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">Long-term ({cgCalc.ltRate.toFixed(0)}%)</p>
                      <p className="fig text-base font-medium">{formatCurrency(cgCalc.ltTax)}</p>
                    </div>
                  </div>
                  <p className="lbl text-center">Save {formatCurrency(cgCalc.savings)} by holding &gt;1 year</p>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="College Savings (529)"
                icon={<TrendingUp className="w-5 h-5" />}
                description="Plan for education costs"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">Est. Cost</label>
                      <input type="number" value={collegeCost} onChange={e => setCollegeCost(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Years</label>
                      <input type="number" value={collegeYears} onChange={e => setCollegeYears(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">Current</label>
                      <input type="number" value={collegeSavings} onChange={e => setCollegeSavings(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Monthly +</label>
                      <input type="number" value={collegeMonthly} onChange={e => setCollegeMonthly(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div>
                    <label className="lbl mb-1 block">Return %</label>
                    <input type="number" value={collegeReturn} onChange={e => setCollegeReturn(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Projected Value</p>
                    <p className="fig text-2xl font-medium">{formatCurrency(collegeCalc.future)}</p>
                    <p className="lbl mt-1">Gap: {formatCurrency(collegeCalc.gap)}</p>
                  </div>
                </div>
              </CollapsibleTool>
            </div>
          </section>
          {/* Section: Everyday Tools */}
          <section id="everyday-tools" className="scroll-mt-20">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-ink pt-4">
              <h2 className="display-2">Everyday Tools</h2>
              <a href="#tools-index" className="lbl hover:text-stamp">Back to index</a>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">

              <CollapsibleTool title="Net Worth Calculator" icon={<DollarSign className="w-5 h-5" />} description="Assets minus liabilities">
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Total Assets</label>
                    <input type="number" value={totalAssets} onChange={e => setTotalAssets(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div>
                    <label className="lbl mb-1 block">Total Liabilities</label>
                    <input type="number" value={totalLiabilities} onChange={e => setTotalLiabilities(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Net Worth</p>
                    <p className={`fig text-2xl font-medium ${(parseFloat(totalAssets) || 0) - (parseFloat(totalLiabilities) || 0) >= 0 ? '' : 'text-stamp'}`}>
                      {formatCurrency(netWorthCalc.netWorth)}
                    </p>
                    <p className="lbl mt-1">Asset/Debt Ratio: {netWorthCalc.ratio}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool title="Savings Goal" icon={<PiggyBank className="w-5 h-5" />} description="How long to reach your target">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div>
                      <label className="lbl mb-1 block">Target</label>
                      <input type="number" value={goalTarget} onChange={e => setGoalTarget(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Current</label>
                      <input type="number" value={goalCurrent} onChange={e => setGoalCurrent(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div>
                      <label className="lbl mb-1 block">Monthly +</label>
                      <input type="number" value={goalMonthly} onChange={e => setGoalMonthly(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Rate %</label>
                      <input type="number" value={goalRate} onChange={e => setGoalRate(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Time to Goal</p>
                    <p className="fig text-2xl font-medium">{goalCalc.years} years</p>
                    <p className="lbl mt-1">{goalCalc.months} months total</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool title="Tip & Bill Split" icon={<Receipt className="w-5 h-5" />} description="Split bills between people">
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Bill Total</label>
                    <input type="number" value={tipBill} onChange={e => setTipBill(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div>
                      <label className="lbl mb-1 block">Tip %</label>
                      <input type="number" value={tipPct} onChange={e => setTipPct(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">People</label>
                      <input type="number" value={tipPeople} onChange={e => setTipPeople(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">Per Person</p>
                      <p className="fig text-lg font-medium">{formatCurrency(tipCalc.perPerson)}</p>
                    </div>
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">Tip Total</p>
                      <p className="fig text-lg font-medium">{formatCurrency(tipCalc.tip)}</p>
                    </div>
                  </div>
                </div>
              </CollapsibleTool>


              <CollapsibleTool
                title="Unit Price Compare"
                icon={<Receipt className="w-5 h-5" />}
                description="Which size is actually cheaper"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">A: Price</label>
                      <input type="number" step="0.01" value={unitPriceA} onChange={e => setUnitPriceA(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">A: Units</label>
                      <input type="number" value={unitSizeA} onChange={e => setUnitSizeA(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">B: Price</label>
                      <input type="number" step="0.01" value={unitPriceB} onChange={e => setUnitPriceB(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">B: Units</label>
                      <input type="number" value={unitSizeB} onChange={e => setUnitSizeB(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">A Per Unit</p>
                      <p className="fig text-lg font-medium">{formatCents(unitCalc.a)}</p>
                    </div>
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">B Per Unit</p>
                      <p className="fig text-lg font-medium">{formatCents(unitCalc.b)}</p>
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Better buy</p>
                    <p className="fig text-2xl font-medium">{unitCalc.cheaper}</p>
                    <p className="lbl mt-1">{unitCalc.gap.toFixed(1)}% cheaper per unit</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Finance It or Save Up"
                icon={<CreditCard className="w-5 h-5" />}
                description="What paying over time really costs"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Price</label>
                    <input type="number" value={buyPrice} onChange={e => setBuyPrice(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-3 items-end gap-3">
                    <div>
                      <label className="lbl mb-1 block">APR %</label>
                      <input type="number" value={buyAPR} onChange={e => setBuyAPR(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Months</label>
                      <input type="number" value={buyTerm} onChange={e => setBuyTerm(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Save / Mo</label>
                      <input type="number" value={buySave} onChange={e => setBuySave(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">Payment</p>
                      <p className="fig text-lg font-medium">{formatCurrency(buyCalc.payment)}</p>
                    </div>
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">Interest</p>
                      <p className="fig text-lg font-medium text-stamp">{formatCurrency(buyCalc.interest)}</p>
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Save up instead</p>
                    <p className="fig text-2xl font-medium">
                      {isFinite(buyCalc.monthsToSave) ? `${buyCalc.monthsToSave} months` : '—'}
                    </p>
                    <p className="lbl mt-1">and keep {formatCurrency(buyCalc.interest)}</p>
                  </div>
                </div>
              </CollapsibleTool>

            </div>
          </section>

          {/* Section: Investment Analysis */}
          <section id="investment-analysis" className="scroll-mt-20">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-ink pt-4">
              <h2 className="display-2">Investment Analysis</h2>
              <a href="#tools-index" className="lbl hover:text-stamp">Back to index</a>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">

              <CollapsibleTool title="Dividend Income" icon={<TrendingUp className="w-5 h-5" />} description="Dividend yield & DRIP growth">
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Amount Invested</label>
                    <input type="number" value={divInvested} onChange={e => setDivInvested(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div>
                      <label className="lbl mb-1 block">Div Yield %</label>
                      <input type="number" value={divYield} onChange={e => setDivYield(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">DRIP Years</label>
                      <input type="number" value={divYears} onChange={e => setDivYears(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">Monthly Income</p>
                      <p className="fig text-lg font-medium">{formatCurrency(divCalc.monthlyDiv)}</p>
                    </div>
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">DRIP Value</p>
                      <p className="fig text-lg font-medium text-steel">{formatCurrency(divCalc.dripValue)}</p>
                    </div>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool title="Dollar Cost Averaging" icon={<TrendingUp className="w-5 h-5" />} description="DCA strategy projected returns">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div>
                      <label className="lbl mb-1 block">Initial</label>
                      <input type="number" value={dcaInitial} onChange={e => setDcaInitial(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Monthly</label>
                      <input type="number" value={dcaMonthly} onChange={e => setDcaMonthly(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div>
                      <label className="lbl mb-1 block">Years</label>
                      <input type="number" value={dcaYears} onChange={e => setDcaYears(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Return %</label>
                      <input type="number" value={dcaReturn} onChange={e => setDcaReturn(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Portfolio Value</p>
                    <p className="fig text-2xl font-medium">{formatCurrency(dcaCalc.futureValue)}</p>
                    <p className="lbl mt-1">Gain: {formatCurrency(dcaCalc.gain)} on {formatCurrency(dcaCalc.totalContrib)} invested</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool title="CAGR Calculator" icon={<TrendingUp className="w-5 h-5" />} description="Compound annual growth rate">
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Initial Value</label>
                    <input type="number" value={cagrInitial} onChange={e => setCagrInitial(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div>
                    <label className="lbl mb-1 block">Final Value</label>
                    <input type="number" value={cagrFinal} onChange={e => setCagrFinal(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div>
                    <label className="lbl mb-1 block">Years</label>
                    <input type="number" value={cagrYears} onChange={e => setCagrYears(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">CAGR</p>
                      <p className="fig text-lg font-medium">{cagrCalc.cagr.toFixed(2)}%</p>
                    </div>
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">Total Gain</p>
                      <p className="fig text-lg font-medium">{formatCurrency(cagrCalc.gain)}</p>
                    </div>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool title="Inflation Calculator" icon={<Calculator className="w-5 h-5" />} description="Purchasing power over time">
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Today's Amount</label>
                    <input type="number" value={inflationAmount} onChange={e => setInflationAmount(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div>
                      <label className="lbl mb-1 block">Years</label>
                      <input type="number" value={inflationYears} onChange={e => setInflationYears(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Inflation %</label>
                      <input type="number" value={inflationRate} onChange={e => setInflationRate(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">Future Need</p>
                      <p className="fig text-lg font-medium">{formatCurrency(inflationCalc.futureNeeded)}</p>
                    </div>
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">Today's Power</p>
                      <p className="fig text-lg font-medium text-stamp">{formatCurrency(inflationCalc.todayPower)}</p>
                    </div>
                  </div>
                </div>
              </CollapsibleTool>


              <CollapsibleTool
                title="Expense Ratio Drag"
                icon={<Receipt className="w-5 h-5" />}
                description="What a fund's fee costs you over time"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Amount Invested</label>
                    <input type="number" value={erAmount} onChange={e => setErAmount(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-3 items-end gap-3">
                    <div>
                      <label className="lbl mb-1 block">Years</label>
                      <input type="number" value={erYears} onChange={e => setErYears(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Return %</label>
                      <input type="number" value={erReturn} onChange={e => setErReturn(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Fee %</label>
                      <input type="number" step="0.01" value={erRatio} onChange={e => setErRatio(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">With No Fee</p>
                      <p className="fig text-lg font-medium">{formatCurrency(erCalc.gross)}</p>
                    </div>
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">After Fees</p>
                      <p className="fig text-lg font-medium">{formatCurrency(erCalc.net)}</p>
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Paid to the fund</p>
                    <p className="fig text-2xl font-medium text-stamp">{formatCurrency(erCalc.cost)}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Return After Inflation"
                icon={<TrendingUp className="w-5 h-5" />}
                description="What the gain is worth in today's money"
              >
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Amount Invested</label>
                    <input type="number" value={realAmount} onChange={e => setRealAmount(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-3 items-end gap-3">
                    <div>
                      <label className="lbl mb-1 block">Return %</label>
                      <input type="number" value={realNominal} onChange={e => setRealNominal(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Inflation %</label>
                      <input type="number" value={realInflation} onChange={e => setRealInflation(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Years</label>
                      <input type="number" value={realYears} onChange={e => setRealYears(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">On Paper</p>
                      <p className="fig text-lg font-medium">{formatCurrency(realCalc.onPaper)}</p>
                    </div>
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">Real Rate</p>
                      <p className="fig text-lg font-medium">{realCalc.realRate.toFixed(2)}%</p>
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">In today's money</p>
                    <p className="fig text-2xl font-medium">{formatCurrency(realCalc.inTodaysMoney)}</p>
                  </div>
                </div>
              </CollapsibleTool>

            </div>
          </section>

          {/* Section: Business & Salary */}
          <section id="business-salary" className="scroll-mt-20">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-ink pt-4">
              <h2 className="display-2">Business & Salary</h2>
              <a href="#tools-index" className="lbl hover:text-stamp">Back to index</a>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">

              <CollapsibleTool title="Salary Converter" icon={<DollarSign className="w-5 h-5" />} description="Annual ↔ hourly ↔ monthly">
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Annual Salary</label>
                    <input type="number" value={salaryAnnual} onChange={e => setSalaryAnnual(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div>
                    <label className="lbl mb-1 block">Hours Per Week</label>
                    <input type="number" value={salaryHours} onChange={e => setSalaryHours(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-2 items-end gap-2">
                    {[
                      { label: 'Monthly', val: salaryCalc.monthly },
                      { label: 'Bi-weekly', val: salaryCalc.biweekly },
                      { label: 'Weekly', val: salaryCalc.weekly },
                      { label: 'Hourly', val: salaryCalc.hourly },
                    ].map(({ label, val }) => (
                      <div key={label} className="border border-rule bg-band p-3 text-center">
                        <p className="lbl mb-1">{label}</p>
                        <p className="fig text-sm font-medium">{formatCurrency(val)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool title="Break-Even Analysis" icon={<TrendingUp className="w-5 h-5" />} description="When does your business profit?">
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Fixed Costs</label>
                    <input type="number" value={beFixed} onChange={e => setBeFixed(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div>
                      <label className="lbl mb-1 block">Price/Unit</label>
                      <input type="number" value={bePrice} onChange={e => setBePrice(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Variable/Unit</label>
                      <input type="number" value={beVariable} onChange={e => setBeVariable(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Break-Even Units</p>
                    <p className="fig text-2xl font-medium">{isFinite(beCalc.units) ? beCalc.units.toLocaleString() : '∞'}</p>
                    <p className="lbl mt-1">Revenue needed: {isFinite(beCalc.revenue) ? formatCurrency(beCalc.revenue) : '—'}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool title="Loan Comparison" icon={<CreditCard className="w-5 h-5" />} description="Compare two loan options side by side">
                <div className="space-y-4">
                  <div>
                    <label className="lbl mb-1 block">Loan Amount</label>
                    <input type="number" value={loanAmt} onChange={e => setLoanAmt(e.target.value)}
                      className="field-boxed" />
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div>
                      <p className="lbl mb-2">Option A</p>
                      <input type="number" value={loanRate1} onChange={e => setLoanRate1(e.target.value)} placeholder="Rate %" className="field-boxed" />
                      <input type="number" value={loanTerm1} onChange={e => setLoanTerm1(e.target.value)} placeholder="Months" className="field-boxed" />
                    </div>
                    <div>
                      <p className="lbl mb-2">Option B</p>
                      <input type="number" value={loanRate2} onChange={e => setLoanRate2(e.target.value)} placeholder="Rate %" className="field-boxed" />
                      <input type="number" value={loanTerm2} onChange={e => setLoanTerm2(e.target.value)} placeholder="Months" className="field-boxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-end gap-3">
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">A Monthly</p>
                      <p className="fig text-base font-medium">{formatCurrency(loanCompCalc.a.pmt)}</p>
                      <p className="lbl mt-1">Interest: {formatCurrency(loanCompCalc.a.interest)}</p>
                    </div>
                    <div className="border border-rule bg-band p-3 text-center">
                      <p className="lbl mb-1">B Monthly</p>
                      <p className="fig text-base font-medium">{formatCurrency(loanCompCalc.b.pmt)}</p>
                      <p className="lbl mt-1">Interest: {formatCurrency(loanCompCalc.b.interest)}</p>
                    </div>
                  </div>
                </div>
              </CollapsibleTool>


              <CollapsibleTool
                title="Freelance Hourly Rate"
                icon={<Briefcase className="w-5 h-5" />}
                description="What to charge to take home your target"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 items-end gap-4">
                    <div>
                      <label className="lbl mb-1 block">Take-Home Target</label>
                      <input type="number" value={flTarget} onChange={e => setFlTarget(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Yearly Expenses</label>
                      <input type="number" value={flExpenses} onChange={e => setFlExpenses(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 items-end gap-3">
                    <div>
                      <label className="lbl mb-1 block">Tax %</label>
                      <input type="number" value={flTaxRate} onChange={e => setFlTaxRate(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Weeks</label>
                      <input type="number" value={flWeeks} onChange={e => setFlWeeks(e.target.value)}
                        className="field-boxed" />
                    </div>
                    <div>
                      <label className="lbl mb-1 block">Billable Hrs</label>
                      <input type="number" value={flHours} onChange={e => setFlHours(e.target.value)}
                        className="field-boxed" />
                    </div>
                  </div>
                  <div className="border border-rule bg-band p-4 text-center">
                    <p className="lbl mb-2">Charge Per Hour</p>
                    <p className="fig text-2xl font-medium">{formatCents(flCalc.rate)}</p>
                    <p className="lbl mt-1">{flCalc.billable.toLocaleString()} billable hours a year</p>
                  </div>
                  <div className="border border-rule bg-band p-3 text-center">
                    <p className="lbl mb-1">Must invoice</p>
                    <p className="fig text-lg font-medium">{formatCurrency(flCalc.grossNeeded)}</p>
                  </div>
                </div>
              </CollapsibleTool>

            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
