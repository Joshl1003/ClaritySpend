interface Props {
  budget: {
    name: string
    id: number;
    user_id: number;
    category_id: number;
    amount: number;
    period: string;
  };
}

export default function BudgetCard({ budget }: Props) {
  return (
    <div className="border rounded p-4 shadow">
      <h3>Budget {budget.name}</h3>
      <p>Amount: ${budget.amount}</p>
      <p>Period: {budget.period}</p>
    </div>
  );
}



