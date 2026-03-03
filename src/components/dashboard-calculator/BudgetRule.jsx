import { cn } from "@/lib/utils";
import { Scale } from "lucide-react";
import { useFormContext } from "react-hook-form";

const rules = [
  {
    id: "50-30-20",
    name: "50 / 30 / 20",
    detail: "50% Needs, 30% Wants, 20% Savings",
    popular: true,
  },
  {
    id: "60-20-20",
    name: "60 / 20 / 20",
    detail: "60% Needs, 20% Wants, 20% Savings",
  },
  {
    id: "70-20-10",
    name: "70 / 20 / 10",
    detail: "70% Needs, 20% Wants, 10% Savings",
  },
]

export function BudgetRule() {

  const { setValue, watch } = useFormContext();

  const selected = watch("budgetRule");
  
  const handleSelect = (rule) => {
    if (selected === rule.id) {
      setValue("budgetRule", undefined)
    } else {
      setValue("budgetRule", rule.id)
    }
  }

  return (
    <div className="w-full bg-card rounded-xl p-6 border border-brand">

      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ff832320]">
          <Scale className="w-4.5 h-4.5 text-brand" />
        </div>
        <div>
          <h3 className="text-base font-semibold">Budget Rules</h3>
          <p className="text-sm text-muted-foreground">
            Choose a budgeting strategy
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {rules.map((rule) => (
          <button
            type="button"
            key={rule.id}
            onClick={() => handleSelect(rule)}
            className={cn(
              "relative flex items-start gap-3 p-3 rounded-xl border text-left transition-all",
              selected === rule.id
                ? "border-brand bg-[#ff832320] ring-1 ring-brand"
                : "border-border hover:border-brand hover:bg-[#ff832320]"
            )}
          >
            <div
              className={cn(
                "mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center",
                selected === rule.id
                  ? "border-brand"
                  : "border-muted-foreground/30"
              )}
            >
              {selected === rule.id && (
                <div className="w-2 h-2 rounded-full bg-brand" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">
                  {rule.name}
                </span>
                {rule.popular && (
                  <span className="text-[10px] font-semibold text-brand bg-[#ff832320] px-1.5 py-0.5 rounded-md">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {rule.detail}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}