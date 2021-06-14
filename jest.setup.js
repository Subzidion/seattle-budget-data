require("jest-fetch-mock").enableMocks();

fetch.mockResponse(
  JSON.stringify([
    {
      fiscal_year: "2020",
      service: "Neighborhoods & Development",
      department: "Seattle Department of Construction and Inspections",
      program: "Permit Services",
      expense_category: "Permit Services CBA",
      fund: "NA",
      fund_type: "NA",
      expense_type: "Expense",
      description: "Permit Services CBA",
      recommended_amount: "0",
      approved_amount: "1500",
    },
    {
      fiscal_year: "2020",
      service: "Neighborhoods & Development",
      department: "Seattle Department of Construction and Inspections",
      program: "Process Improvements & Technology",
      expense_category: "Process Improvements and Tech",
      fund: "NA",
      fund_type: "NA",
      expense_type: "Expense",
      description: "Process Improvements and Tech",
      recommended_amount: "0",
      approved_amount: "2250.50",
    },
    {
      fiscal_year: "2020",
      service: "Public Safety",
      department: "Seattle Fire Department",
      program: "Operations",
      expense_category: "Battalion 6",
      fund: "NA",
      fund_type: "NA",
      expense_type: "Expense",
      description: "Battalion 6",
      recommended_amount: "0",
      approved_amount: "500",
    },
    {
      fiscal_year: "2020",
      service: "Public Safety",
      department: "Seattle Fire Department",
      program: "Operations",
      expense_category: "Battalion 7",
      fund: "NA",
      fund_type: "NA",
      expense_type: "Expense",
      description: "Battalion 7",
      recommended_amount: "0",
      approved_amount: "250",
    },
    {
      fiscal_year: "2020",
      service: "Public Safety",
      department: "Seattle Fire Department",
      program: "Operations",
      expense_category: "Communications",
      fund: "NA",
      fund_type: "NA",
      expense_type: "Expense",
      description: "Communications",
      recommended_amount: "0",
      approved_amount: "500",
    },
    {
      fiscal_year: "2020",
      service: "Public Safety",
      department: "Seattle Police Department",
      program: "Special Operations",
      expense_category: "Special Operations",
      fund: "NA",
      fund_type: "NA",
      expense_type: "Expense",
      description: "Special Operations",
      recommended_amount: "0",
      approved_amount: "5000",
    },
    {
      fiscal_year: "2020",
      service: "Utilities & Transportation",
      department: "Seattle City Light",
      program: "Customer Focused - CIP",
      expense_category: "CUSTOMER AND BILLING",
      fund: "NA",
      fund_type: "NA",
      expense_type: "Expense",
      description: "CUSTOMER AND BILLING",
      recommended_amount: "0",
      approved_amount: "300",
    },
    {
      fiscal_year: "2020",
      service: "Utilities & Transportation",
      department: "Seattle City Light",
      program: "Customer Focused - CIP",
      expense_category: "TRANSPORTATION RELOCATIONS",
      fund: "NA",
      fund_type: "NA",
      expense_type: "Expense",
      description: "TRANSPORTATION RELOCATIONS",
      recommended_amount: "0",
      approved_amount: "50",
    },
  ])
);
