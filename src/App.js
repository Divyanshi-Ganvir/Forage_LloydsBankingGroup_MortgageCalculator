import './App.css';
import { useState } from "react";

function App() {
  const resultsDividerLine = <hr />
  const [rate, changeRate] = useState(0.0);
  const [mortgageType, setMortgageType] = useState("Fixed Rate");
  const [loanAmount, setLoanAmount] = useState(0)
  const [monthlyMortgage, setMonthlyMortgage] = useState(0)
  const [totalRepayment, setTotalRepayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [ltvRatio, setLtvRatio] = useState(0)

  function calculateLoanAmount () {
    const propertyValue = parseFloat(document.getElementById("propertyValue").value);
    const depositAmount = parseFloat(document.getElementById("depositAmount").value);
    const interestRate = parseFloat(rate);
    const mortgageDuration = parseFloat(document.getElementById("mortgageDuration").value);

    const loanAmountResult = propertyValue - depositAmount

    const monthlyRate = (interestRate/100)/12
    const totalMortgageMonths = mortgageDuration * 12

    let numerator = (monthlyRate * Math.pow(1+monthlyRate, totalMortgageMonths))
    let denominator = (Math.pow(1+monthlyRate, totalMortgageMonths) - 1)
    let mortgagePaymentFormula = numerator/denominator

    let monthlyMortgagePayment = 0
    let totalRepaymentAmount = 0
    let totalInterestPaid = 0

    if (mortgageType === "Fixed Rate") {
      monthlyMortgagePayment = loanAmountResult * mortgagePaymentFormula;
      totalRepaymentAmount = monthlyMortgagePayment * totalMortgageMonths;
      totalInterestPaid = totalRepaymentAmount - loanAmountResult;
    }

    if (mortgageType === "Interest Only") {
      const interestOnlyPeriodValue = parseFloat(document.getElementById("interestOnlyPeriod").value);
      monthlyMortgagePayment = (loanAmountResult * interestRate)/(12*100)
      totalRepaymentAmount = monthlyMortgagePayment * interestOnlyPeriodValue * 12
      totalInterestPaid = totalRepaymentAmount
    }

    setLoanAmount(loanAmountResult)
    
    setMonthlyMortgage(monthlyMortgagePayment)

    setTotalRepayment (totalRepaymentAmount)

    setTotalInterest (totalInterestPaid)

    setLtvRatio ((loanAmountResult/propertyValue) * 100)
  }
  
  return (
    <>
    <div className = " header"></div>
    <h1>MORTGAGE CALCULATOR</h1>
    <h2 className = "appExplanation">This application is a tool that will help you calculate estimated 
      financial figures such as total loan amount, monthly mortgage payment, total repayment, total 
      interest paid, and LTV ratio. This calculator supports two different mortgage types, fixed rate 
      and interest only and automatically adjusts to the required inputs depending on the mortgage type 
      selected. </h2>

    <div className = "allContent">
      <div className = "inputsArea">
        <h3>Mortgage Details</h3> 
        <div className = "inputs">
          <label htmlFor="mortgageType">Mortgage Type</label>
          <select
          id = "mortgageType"
          value={mortgageType}
          onChange={(e) => setMortgageType(e.target.value)}
          >
            <option>Fixed Rate</option>
            <option>Interest Only</option>
          </select>
          {mortgageType === "Fixed Rate" && (
          <p>In fixed rate mortgage: The interest rate is the same for the entire mortgage duration and 
            the monthly payments will not change.</p>
          )}

          {mortgageType === "Interest Only" && (
          <p>In interest only mortgage: only the interest amount is paid each month and not the loan 
            balance.</p>
          )}
        </div>

        <div className = "inputs">
          <label htmlFor="mortgageDuration">Mortgage Duration (years)</label>
          <input type="number" id="mortgageDuration" placeholder="e.g. 10" min="1"/>
          <p>This is the total number of years you repay the loan for. This value affects your monthly 
            payments. For example, a longer mortgage duration reduces monthly payment but increases 
            total interest paid. </p>
        </div>

        <div className = "inputs">
          <div className = "InterestRateSlider">
            <h4>Interest Rate in %</h4>
            <input 
            type="range" 
            min="1" 
            max="20" 
            step="0.01"
            value={rate}
            className = "slider"
            onChange={(e) => changeRate(parseFloat(e.target.value))}
            />

            <input 
            type = "number"
            min="1" 
            max="20"
            step="0.01"
            value={rate}
            onChange={(e) => changeRate(parseFloat(e.target.value))}
            />
            
          </div>
          <p>Annual interest rate is the total percentage (%) of loan charged for a year. For example, 
            a higher annual interest rate will increase the monthly and total payment, whereas a 
            lower rate will decrease the overall amount of loan repayment.</p>
        </div>

        {mortgageType === "Interest Only" && (
          <div className = "inputs">
            <label htmlFor="interestOnlyPeriod">Interest-Only Period in years</label>
            <input type="number" id="interestOnlyPeriod" placeholder="e.g. 3" min="1"/>
            <p>This is the duration in which you only pay the interest amount each month.</p>
          </div>
        )}

          <h3>Property details</h3>
        
          <div className = "inputs">
            <label htmlFor="propertyValue">Property Value</label>
            <input type="number" id="propertyValue" placeholder="e.g. 123,456" min="1"/>
            <p>This is the market price of the property you are calculating mortgage for. </p>
          </div>

          <div className = "inputs">
            <label htmlFor="depositAmount">Deposit Amount</label>
            <input type="number" id="depositAmount" placeholder="e.g. 50,000" min="1"/>
            <p>This is how much you pay initially. This helps determine the total loan amount to be 
              paid.</p>
          </div>
        
        <div className = "decisionButtons">
          <button onClick={() => {calculateLoanAmount()}}
          className = "calculateButton">Calculate</button>
        </div>

      </div>

      <div className = "resultsArea">

        <div className = "resultValues">
          <h2>Results</h2>
          <div className="result">
            <h3>Loan amount</h3>
            <h3>{loanAmount.toFixed(2)}</h3>

          </div>
          {resultsDividerLine}

          <div className="result">
            <h3>Monthly mortgage payment</h3>
            <h3>{monthlyMortgage.toFixed(2)}</h3>
          </div>
          {resultsDividerLine}

          <div className="result">
            <h3>Total repayment</h3>
            <h3>{totalRepayment.toFixed(2)}</h3>
          </div>
          {resultsDividerLine}

          <div className="result">
            <h3>Total interest paid</h3>
            <h3>{totalInterest.toFixed(2)}</h3>
          </div>
          {resultsDividerLine}

          <div className="result">
            <h3>Loan to value (LTV) ratio</h3>
            <h3>{ltvRatio.toFixed(2)}%</h3>
          </div>
          <p>LTV ratio is the % from the property value that that is being borrowed.</p>
          
        </div>
        
      </div>

    </div>

    </>
  );
}

export default App;

