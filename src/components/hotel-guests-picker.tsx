import { useState } from "react";
import { ChevronDown, Minus, Plus, BedDouble } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n";

export type HotelGuestsValue = {
  adults: number;
  children: number;
  rooms: number;
};

type Props = {
  value: HotelGuestsValue;
  onChange: (next: HotelGuestsValue) => void;
};

const ADULTS_MIN = 1;
const ADULTS_MAX = 9;
const CHILDREN_MAX = 6;
const ROOMS_MIN = 1;
const ROOMS_MAX = 5;

export function HotelGuestsPicker({ value, onChange }: Props) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const totalGuests = value.adults + value.children;
  const guestWord =
    totalGuests === 1 ? t("hotel.guest") : t("hotel.guests");
  const roomWord =
    value.rooms === 1 ? t("hotel.room") : t("hotel.roomsWord");
  const summary = `${totalGuests} ${guestWord}, ${value.rooms} ${roomWord}`;

  const setAdults = (n: number) => {
    const adults = clamp(n, ADULTS_MIN, ADULTS_MAX);
    // each room needs at least one adult, so cap rooms by adults
    const rooms = Math.min(value.rooms, adults);
    onChange({ ...value, adults, rooms });
  };

  const setChildren = (n: number) =>
    onChange({ ...value, children: clamp(n, 0, CHILDREN_MAX) });

  const setRooms = (n: number) =>
    onChange({
      ...value,
      rooms: clamp(n, ROOMS_MIN, Math.min(ROOMS_MAX, value.adults)),
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
              <BedDouble size={16} />
            </span>
            <h4 className="text-sm font-display font-bold uppercase tracking-wider text-foreground">
              {t("search.label.guests")}
            </h4>
          </div>

          {/* Counters */}
          <div className="space-y-3">
            <CounterRow
              title={t("hotel.adult")}
              subtitle={t("hotel.adult.age")}
              value={value.adults}
              onDec={() => setAdults(value.adults - 1)}
              onInc={() => setAdults(value.adults + 1)}
              decDisabled={value.adults <= ADULTS_MIN}
              incDisabled={value.adults >= ADULTS_MAX}
              decLabel={t("pax.decrease")}
              incLabel={t("pax.increase")}
            />
            <CounterRow
              title={t("hotel.child")}
              subtitle={t("hotel.child.age")}
              value={value.children}
              onDec={() => setChildren(value.children - 1)}
              onInc={() => setChildren(value.children + 1)}
              decDisabled={value.children <= 0}
              incDisabled={value.children >= CHILDREN_MAX}
              decLabel={t("pax.decrease")}
              incLabel={t("pax.increase")}
            />
            <CounterRow
              title={t("hotel.rooms")}
              subtitle={t("hotel.rooms.sub")}
              value={value.rooms}
              onDec={() => setRooms(value.rooms - 1)}
              onInc={() => setRooms(value.rooms + 1)}
              decDisabled={value.rooms <= ROOMS_MIN}
              incDisabled={
                value.rooms >= ROOMS_MAX || value.rooms >= value.adults
              }
              decLabel={t("pax.decrease")}
              incLabel={t("pax.increase")}
            />
          </div>

          <p className="mt-3 text-xs text-muted-foreground italic leading-snug">
            {t("hotel.rooms.rule")}
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
