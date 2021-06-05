import fetch from "cross-fetch";

export interface Expense {
  description: string;
  approvedAmount: number;
}
export interface Program {
  expenses: Record<string, Expense>;
  approvedAmount: number;
}
export interface Department {
  programs: Record<string, Program>;
  approvedAmount: number;
}
export interface Service {
  departments: Record<string, Department>;
  approvedAmount: number;
}
export interface OperationalBudget {
  services: Record<string, Service>;
  approvedAmount: number;
}
export interface Budgets {
  [fiscalYear: string]: OperationalBudget;
}

// Schema mapped to columns in Operating Budget Open Data Set
// See https://data.seattle.gov/dataset/City-of-Seattle-Operating-Budget/8u2j-imqx
interface BudgetRow {
  fiscal_year: string;
  service: string;
  department: string;
  program: string;
  expense_category: string;
  expense_type: string;
  description: string;
  approved_amount: string; // Provided as String
  recommended_amount: string; // Provided as String
  fund: string;
  fund_type: string;
}

function normalize(tree: Budgets, row: BudgetRow): Budgets {
  // Load data from row
  const fiscalYear = row["fiscal_year"];
  const service = row["service"];
  const department = row["department"];
  const program = row["program"];
  const expense = row["expense_category"];
  const expenseDescription = row["description"];
  const expenseAmount = parseFloat(row["approved_amount"]) || 0;

  // Add row to tree
  tree[fiscalYear] ??= { services: {}, approvedAmount: 0 };
  tree[fiscalYear].services[service] ??= { departments: {}, approvedAmount: 0 };
  tree[fiscalYear].services[service].departments[department] ??= {
    programs: {},
    approvedAmount: 0,
  };
  tree[fiscalYear].services[service].departments[department].programs[
    program
  ] ??= { expenses: {}, approvedAmount: 0 };
  tree[fiscalYear].services[service].departments[department].programs[
    program
  ].expenses[expense] ??= {
    description: expenseDescription,
    approvedAmount: expenseAmount,
  };

  // Increment relevant tree nodes for each expense.
  tree[fiscalYear].services[service].departments[department].programs[
    program
  ].approvedAmount += expenseAmount;
  tree[fiscalYear].services[service].departments[department].approvedAmount +=
    expenseAmount;
  tree[fiscalYear].services[service].approvedAmount += expenseAmount;
  tree[fiscalYear].approvedAmount += expenseAmount;

  return tree;
}

export default fetch(
  "https://data.seattle.gov/resource/8u2j-imqx.json?$limit=50000"
)
  .then((response) => response.json())
  .then((data) =>
    data.reduce((tree: Budgets, row: BudgetRow) => {
      return normalize(tree, row);
    }, {})
  );
