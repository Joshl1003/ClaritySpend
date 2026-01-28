import { useEffect, useMemo, useState } from "react";
import { getBudgets, type Budget } from "@/services/BudgetService";
import type { Transaction } from "@/services/TransactionService";