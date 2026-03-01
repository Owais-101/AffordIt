import { cn } from "@/lib/utils";
import { Scale } from "lucide-react";
import { useState } from "react";

const rules = [
  {
    id: "50-30-20",
    name: "50 / 30 / 20",
    description: "Balanced approach",
    detail: "50% Needs, 30% Wants, 20% Savings",
    wants: 0.30,
    popular: true,
  },
  {
    id: "60-20-20",
    name: "60 / 20 / 20",
    description: "Conservative spender",
    detail: "60% Needs, 20% Wants, 20% Savings",
    wants: 0.20,
    popular: false,
  },
  {
    id: "70-20-10",
    name: "70 / 20 / 10",
    description: "Tight budget",
    detail: "70% Needs, 20% Wants, 10% Savings",
    wants: 0.20,
    popular: false,
  },
  {
    id: "custom",
    name: "Custom",
    description: "Set your own rate",
    detail: "Use the saving rate slider",
    wants: null,
    popular: false,
  },
]

export function BudgetRulePresets() {
  const [selected, setSelected] = useState('50-30-20') // ← apna state

  const handleSelect = (rule) => {
    console.log({
      id: rule.id,
      name: rule.name,
      description: rule.description,
      detail: rule.detail,
      wantsPercentage: rule.wants,
    })
    setSelected(rule.id) // ← apna setter
  }

  return (
    <div className="w-full bg-card rounded-2xl p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] border border-brand md:mt-0">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ff832320]">
          <Scale className="w-4.5 h-4.5 text-brand" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-card-foreground">Budget Rules</h3>
          <p className="text-sm text-muted-foreground">Choose a budgeting strategy</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {rules.map((rule) => (
          <button
            key={rule.id}
            onClick={() => handleSelect(rule)}
            className={cn(
              "relative flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer",
              selected === rule.id
                ? "border-brand bg-[#ff832320] ring-1 ring-brand"
                : "border-border hover:border-brand hover:bg-[#ff832320] hover:ring-1 hover:ring-brand"
            )}
          >
            <div className={cn(
              "mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors",
              selected === rule.id ? "border-brand" : "border-muted-foreground/30"
            )}>
              {selected === rule.id && (
                <div className="w-2 h-2 rounded-full bg-brand" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-card-foreground">{rule.name}</span>
                {rule.popular && (
                  <span className="text-[10px] font-semibold text-brand bg-[#ff832320] px-1.5 py-0.5 rounded-md">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{rule.detail}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}