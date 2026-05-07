import { useState } from "react";
import { ChevronDown, Minus, Plus, Users } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n";

export type Cabin = "economy" | "business";

export type TravellerValue = {
  adults: number;
  children: number;
  infants: number;
  cabin: Cabin;
};

type Props = {
  value: TravellerValue;
  onChange: (next: TravellerValue) => void;
};

const ADULTS_MIN = 1;
const ADULTS_MAX = 9;
const CHILDREN_MAX = 5;
const INFANTS_MAX = 2;

export function TravellerPicker({ value, onChange }: Props) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const totalPax = value.adults + value.children + value.infants;
  const cabinLabel =
    value.cabin === "business"
      ? t("pax.cabin.business")
      : t("pax.cabin.economy");
  const paxWord = totalPax === 1 ? t("pax.traveller") : t("pax.travellers");
  const summary = `${totalPax} ${paxWord}, ${cabinLabel}`;

  const setCabin = (cabin: Cabin) => onChange({ ...value, cabin });

  const setAdults = (n: number) => {
    const adults = clamp(n, ADULTS_MIN, ADULTS_MAX);
    // keep infants <= adults
    const infants = Math.min(value.infants, adults);
    onChange({ ...value, adults, infants });
  };

  const setChildren = (n: number) =>
    onChange({ ...value, children: clamp(n, 0, CHILDREN_MAX) });

  const setInfants = (n: number) =>
    onChange({
      ...value,
      infants: clamp(n, 0, Math.min(INFANTS_MAX, value.adults)),
    });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="w-full text-left flex items-center justify-between gap-2 bg-transparent text-base font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-md"
        >
          <span className="truncate">{summary}</span>
          <ChevronDown
            size={16}
            className={`shrink-0 text-muted-foreground transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={12}
        className="w-[min(92vw,360px)] p-0 rounded-2xl border border-border shadow-2xl bg-card"
      >
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Users size={16} />
            </span>
            <h4 className="text-sm font-display font-bold uppercase tracking-wider text-foreground">
              {t("search.label.travellers")}
            </h4>
          </div>

          {/* Cabin selection */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            {(
              [
                { id: "economy" as const, label: t("pax.cabin.economy") },
                { id: "business" as const, label: t("pax.cabin.business") },
              ]
            ).map((c) => {
              const active = value.cabin === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCabin(c.id)}
                  className={`px-3 py-2.5 text-xs font-semibold rounded-xl border transition-all ${
                    active
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background text-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Counters */}
          <div className="space-y-3">
            <CounterRow
              title={t("pax.adult")}
              subtitle={t("pax.adult.age")}
              value={value.adults}
              onDec={() => setAdults(value.adults - 1)}
              onInc={() => setAdults(value.adults + 1)}
              decDisabled={value.adults <= ADULTS_MIN}
              incDisabled={value.adults >= ADULTS_MAX}
              decLabel={t("pax.decrease")}
              incLabel={t("pax.increase")}
            />
            <CounterRow
              title={t("pax.child")}
              subtitle={t("pax.child.age")}
              value={value.children}
              onDec={() => setChildren(value.children - 1)}
              onInc={() => setChildren(value.children + 1)}
              decDisabled={value.children <= 0}
              incDisabled={value.children >= CHILDREN_MAX}
              decLabel={t("pax.decrease")}
              incLabel={t("pax.increase")}
            />
            <CounterRow
              title={t("pax.infant")}
              subtitle={t("pax.infant.age")}
              value={value.infants}
              onDec={() => setInfants(value.infants - 1)}
              onInc={() => setInfants(value.infants + 1)}
              decDisabled={value.infants <= 0}
              incDisabled={
                value.infants >= INFANTS_MAX ||
                value.infants >= value.adults
              }
              decLabel={t("pax.decrease")}
              incLabel={t("pax.increase")}
            />
          </div>

          <p className="mt-3 text-xs text-muted-foreground italic leading-snug">
            {t("pax.infant.rule")}
          </p>

          <Button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full mt-5 h-11 rounded-xl text-sm font-bold"
          >
            {t("pax.done")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function CounterRow({
  title,
  subtitle,
  value,
  onDec,
  onInc,
  decDisabled,
  incDisabled,
  decLabel,
  incLabel,
}: {
  title: string;
  subtitle: string;
  value: number;
  onDec: () => void;
  onInc: () => void;
  decDisabled: boolean;
  incDisabled: boolean;
  decLabel: string;
  incLabel: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground leading-tight">
          {title}
        </p>
        <p className="text-xs text-muted-foreground leading-tight mt-0.5">
          {subtitle}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <CounterButton
          onClick={onDec}
          disabled={decDisabled}
          ariaLabel={`${decLabel} ${title}`}
        >
          <Minus size={14} strokeWidth={3} />
        </CounterButton>
        <span className="w-7 text-center text-base font-display font-bold text-foreground tabular-nums">
          {value}
        </span>
        <CounterButton
          onClick={onInc}
          disabled={incDisabled}
          ariaLabel={`${incLabel} ${title}`}
        >
          <Plus size={14} strokeWidth={3} />
        </CounterButton>
      </div>
    </div>
  );
}

function CounterButton({
  onClick,
  disabled,
  ariaLabel,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="w-8 h-8 rounded-full border border-border bg-background text-primary flex items-center justify-center transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-background disabled:hover:text-primary disabled:hover:border-border"
    >
      {children}
    </button>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function summarizeTravellers(
  v: TravellerValue,
  t: (k: string) => string,
): string {
  const total = v.adults + v.children + v.infants;
  const word = total === 1 ? t("pax.traveller") : t("pax.travellers");
  const cabin =
    v.cabin === "business" ? t("pax.cabin.business") : t("pax.cabin.economy");
  return `${total} ${word}, ${cabin}`;
}
