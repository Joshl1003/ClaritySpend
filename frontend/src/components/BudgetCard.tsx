interface Props {
  budget: {
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
      <h3>Budget #{budget.id}</h3>
      <p>Amount: ${budget.amount}</p>
      <p>Period: {budget.period}</p>
    </div>
  );
}



