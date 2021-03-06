import "cross-fetch/polyfill";

enum ItemType {
  OperationalBudget = "operational_budget",
  Service = "service",
  Department = "department",
  Program = "program",
  Expense = "expense",
}

enum ChildItemType {
  Services = "services",
  Departments = "departments",
  Programs = "programs",
  Expenses = "expenses",
}

interface Item {
  name: string;
  approvedAmount: number;
  type: ItemType;
  childType?: ChildItemType;
}

export interface Expense extends Item {
  description: string;
}
export interface Program extends Item {
  expenses: Record<string, Expense>;
}
export interface Department extends Item {
  programs: Record<string, Program>;
}
export interface Service extends Item {
  departments: Record<string, Department>;
}
export interface OperationalBudget extends Item {
  services: Record<string, Service>;
}

export interface OperationalBudgets {
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

function normalize(
  tree: OperationalBudgets,
  row: BudgetRow
): OperationalBudgets {
  // Load data from row
  const fiscalYear = row["fiscal_year"];
  const service = row["service"];
  const department = row["department"];
  const program = row["program"];
  const expense = row["expense_category"];
  const expenseDescription = row["description"];
  const expenseAmount = parseFloat(row["approved_amount"]) || 0;

  // Add row to tree
  tree[fiscalYear] ??= {
    name: fiscalYear,
    services: {},
    approvedAmount: 0,
    type: ItemType.OperationalBudget,
    childType: ChildItemType.Services,
  };
  tree[fiscalYear].services[service] ??= {
    name: service,
    departments: {},
    approvedAmount: 0,
    type: ItemType.Service,
    childType: ChildItemType.Departments,
  };
  tree[fiscalYear].services[service].departments[department] ??= {
    name: department,
    programs: {},
    approvedAmount: 0,
    type: ItemType.Department,
    childType: ChildItemType.Programs,
  };
  tree[fiscalYear].services[service].departments[department].programs[
    program
  ] ??= {
    name: program,
    expenses: {},
    approvedAmount: 0,
    type: ItemType.Program,
    childType: ChildItemType.Expenses,
  };
  tree[fiscalYear].services[service].departments[department].programs[
    program
  ].expenses[expense] ??= {
    name: expense,
    description: expenseDescription,
    approvedAmount: expenseAmount,
    type: ItemType.Expense,
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
    data.reduce((tree: OperationalBudgets, row: BudgetRow) => {
      return normalize(tree, row);
    }, {})
  );
