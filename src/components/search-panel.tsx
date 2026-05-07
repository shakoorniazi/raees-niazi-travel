import { useEffect, useState } from "react";
import {
  Plane,
  Hotel,
  Car,
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Search,
  ArrowLeftRight,
  ShieldCheck,
  Check,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useLanguage } from "@/i18n";
import {
  TravellerPicker,
  type TravellerValue,
  type Cabin,
} from "@/components/traveller-picker";
import {
  HotelGuestsPicker,
  type HotelGuestsValue,
} from "@/components/hotel-guests-picker";
import { AirportAutocomplete } from "@/components/airport-autocomplete";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Tab = "flights" | "hotels" | "cars";
type TripType = "round" | "oneway" | "multi";

const today = new Date();
const isoToday = today.toISOString().slice(0, 10);
const oneWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);
const twoWeeks = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

function extractAirportCode(value: string): string {
  // "Kabul (KBL)" -> "kbl"; "KBL" -> "kbl"; fallback to slugified value
  const match = value.match(/\(([A-Za-z]{3})\)/);
  if (match) return match[1].toLowerCase();
  const trimmed = value.trim();
  if (/^[A-Za-z]{3}$/.test(trimmed)) return trimmed.toLowerCase();
  return trimmed
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ClassDropdown({
  value,
  onChange,
}: {
  value: Cabin;
  onChange: (next: Cabin) => void;
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const label =
    value === "business" ? t("pax.cabin.business") : t("pax.cabin.economy");
  const options: { id: Cabin; label: string }[] = [
    { id: "economy", label: t("pax.cabin.economy") },
    { id: "business", label: t("pax.cabin.business") },
  ];
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted text-sm font-medium text-foreground transition-colors"
        >
          <span className="text-muted-foreground">Class:</span>
          <span>{label}</span>
          <ChevronDown size={14} className="text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-44 p-1">
        <div className="flex flex-col">
          {options.map((opt) => {
            const active = value === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onChange(opt.id);
                  setOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                  active
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {opt.label}
                {active && <Check size={14} />}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function FieldShell({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-foreground/[0.04] dark:bg-white/[0.06] hover:bg-foreground/[0.07] dark:hover:bg-white/10 ring-1 ring-foreground/5 dark:ring-white/10 transition-colors">
      <label className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
        <span className="text-muted-foreground/80">{icon}</span>
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function formatDDMMYY(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y.slice(2)}`;
}

function isoToDate(iso: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return undefined;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function dateToIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);
  return isMobile;
}

function DatePickerField({
  value,
  onChange,
  minIso,
  placeholder = "DD/MM/YY",
}: {
  value: string;
  onChange: (next: string) => void;
  minIso?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const display = value ? formatDDMMYY(value) : placeholder;
  const selected = isoToDate(value);
  const minDate = minIso ? isoToDate(minIso) : undefined;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`w-full text-left text-base font-semibold outline-none ${
            value ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {display}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-auto p-0 rounded-2xl shadow-2xl border border-border max-w-[calc(100vw-2rem)]"
      >
        <Calendar
          mode="single"
          numberOfMonths={isMobile ? 1 : 2}
          selected={selected}
          onSelect={(d) => {
            if (d) {
              onChange(dateToIso(d));
              setOpen(false);
            }
          }}
          disabled={minDate ? { before: minDate } : undefined}
          defaultMonth={selected ?? minDate ?? new Date()}
          initialFocus
          formatters={{
            formatWeekdayName: (date) =>
              date.toLocaleDateString("en-US", { weekday: "short" }),
          }}
          className="p-6 [--cell-size:3.25rem] text-base"
          classNames={{
            months:
              "relative flex flex-col gap-8 md:flex-row md:gap-12",
            month: "flex w-full flex-col gap-5",
            month_caption:
              "flex h-[--cell-size] w-full items-center justify-center px-[--cell-size] text-lg font-bold",
            weekdays: "flex gap-1",
            weekday:
              "text-muted-foreground flex-1 select-none rounded-md text-[0.78rem] font-semibold uppercase tracking-wider pb-1",
            week: "mt-1 flex w-full gap-1",
            day: "group/day relative aspect-square h-full w-full select-none p-0 text-center text-base font-semibold",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export function SearchPanel({ compact = false }: { compact?: boolean } = {}) {
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>("flights");
  const [tripType, setTripType] = useState<TripType>("oneway");

  // Flight state
  const [flightFrom, setFlightFrom] = useState("");
  const [flightTo, setFlightTo] = useState("");
  const [flightDepart, setFlightDepart] = useState(oneWeek);
  const [flightReturn, setFlightReturn] = useState(twoWeeks);
  const [flightPax, setFlightPax] = useState<TravellerValue>({
    adults: 1,
    children: 0,
    infants: 0,
    cabin: "economy",
  });

  // Hotel state
  const [hotelDest, setHotelDest] = useState("");
  const [hotelCheckin, setHotelCheckin] = useState(oneWeek);
  const [hotelCheckout, setHotelCheckout] = useState(twoWeeks);
  const [hotelGuests, setHotelGuests] = useState<HotelGuestsValue>({
    adults: 2,
    children: 0,
    rooms: 1,
  });

  // Car state
  const [carPickup, setCarPickup] = useState("");
  const [carDropoff, setCarDropoff] = useState("");
  const [carPickupDate, setCarPickupDate] = useState(oneWeek);
  const [carDropoffDate, setCarDropoffDate] = useState(twoWeeks);

  const ctaLabel =
    tab === "flights"
      ? t("search.cta.flights")
      : tab === "hotels"
      ? t("search.cta.hotels")
      : t("search.cta.cars");

  const buildSearchUrl = (): string | null => {
    if (tab === "flights") {
      const from = extractAirportCode(flightFrom).toUpperCase();
      const to = extractAirportCode(flightTo).toUpperCase();

      if (!from || !to) {
        window.alert(t("search.alert.missingAirports"));
        return null;
      }

      // Until OTA production pricing is live, redirect flight searches
      // straight to Trip.com (with our affiliate tags) so customers always
      // see realistic prices.
      const isOneWay = tripType === "oneway";
      const cabinMap: Record<string, string> = {
        economy: "y",
        premium: "s",
        business: "c",
        first: "f",
      };
      const totalPax = Math.max(
        1,
        flightPax.adults + flightPax.children + flightPax.infants,
      );
      const params = new URLSearchParams({
        dcity: from.toLowerCase(),
        acity: to.toLowerCase(),
        ddate: flightDepart,
        triptype: isOneWay ? "ow" : "rt",
        class: cabinMap[flightPax.cabin] ?? "y",
        quantity: String(totalPax),
        locale: "en-US",
        curr: "USD",
        Allianceid: "8119252",
        SID: "307403300",
        trip_sub1: "homepage_search_flights",
      });
      if (!isOneWay && flightReturn) params.set("rdate", flightReturn);
      return `https://www.trip.com/flights/showfarefirst?${params.toString()}`;
    }

    // Hotels and Cars still use Trip.com affiliate (until those APIs are wired)
    if (tab === "hotels") {
      const params = new URLSearchParams({
        city: hotelDest,
        checkin: hotelCheckin,
        checkout: hotelCheckout,
        adult: String(hotelGuests.adults),
        children: String(hotelGuests.children),
        crn: String(hotelGuests.rooms),
        Allianceid: "8119252",
        SID: "307403300",
        trip_sub1: "homepage_search_hotels",
      });
      return `https://www.trip.com/hotels/list?${params.toString()}`;
    }

    // cars
    const params = new URLSearchParams({
      pickupLocation: carPickup,
      dropoffLocation: carDropoff,
      pickupDate: carPickupDate,
      dropoffDate: carDropoffDate,
      Allianceid: "8119252",
      SID: "307403300",
      trip_sub1: "homepage_search_cars",
    });
    return `https://www.trip.com/carrentals/?${params.toString()}`;
  };

  const handleSearch = () => {
    const url = buildSearchUrl();
    if (!url) return;
    // All three tabs (flights, hotels, cars) now route to Trip.com affiliate
    // links — open in a new tab so the customer keeps our site too.
    // IMPORTANT: do NOT use "noreferrer" — Trip.com needs the Referer header
    // to attribute the click to our Allianceid/SID. Keep "noopener" only.
    window.open(url, "_blank", "noopener");
  };

  const tabs: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: "flights", icon: <Plane size={22} />, label: t("search.tab.flights") },
    { id: "hotels", icon: <Hotel size={22} />, label: t("search.tab.hotels") },
    { id: "cars", icon: <Car size={22} />, label: t("search.tab.cars") },
  ];

  const swapFlightCities = () => {
    setFlightFrom(flightTo);
    setFlightTo(flightFrom);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Tabs row — icon stacked above label. Active tab gets an orange
          rounded background with a small downward arrow tag, matching the
          B.Trip reference. */}
      <div className="flex items-end gap-1 sm:gap-2 px-1 mb-4">
        {tabs.map((tb) => {
          const active = tab === tb.id;
          return (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              className={`relative flex flex-col items-center gap-1 px-3 sm:px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                active
                  ? "bg-secondary text-secondary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              }`}
              type="button"
            >
              {tb.icon}
              <span>{tb.label}</span>
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-secondary"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* White card — compact layout matching reference. Stays visible in both
          themes via an explicit lighter dark-mode bg + subtle ring. */}
      <div className="bg-white text-foreground dark:bg-[hsl(220,30%,14%)] dark:text-white ring-1 ring-border/50 dark:ring-white/15 rounded-2xl shadow-2xl p-4 md:p-5">
        {/* Top row: Trip type pill (left) + Class & Travelers (right) — flights only */}
        {tab === "flights" && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            {/* One Way / Round Trip pill toggle — orange active state */}
            <div className="inline-flex items-center bg-foreground/[0.06] dark:bg-white/10 rounded-full p-1 self-start">
              {(
                [
                  { id: "oneway", label: t("search.trip.oneway") },
                  { id: "round", label: t("search.trip.round") },
                ] as { id: TripType; label: string }[]
              ).map((tt) => {
                const active = tripType === tt.id;
                return (
                  <button
                    key={tt.id}
                    type="button"
                    onClick={() => setTripType(tt.id)}
                    className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all ${
                      active
                        ? "bg-secondary text-secondary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tt.label}
                  </button>
                );
              })}
            </div>

            {/* Class + Travelers compact triggers */}
            <div className="flex items-center gap-2 flex-wrap">
              <ClassDropdown
                value={flightPax.cabin}
                onChange={(c) => setFlightPax({ ...flightPax, cabin: c })}
              />
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors min-w-[12rem]">
                <TravellerPicker value={flightPax} onChange={setFlightPax} />
              </div>
            </div>
          </div>
        )}

        {/* Middle row: From | swap | To | Depart (+ Return side-by-side when round-trip) */}
        {tab === "flights" && (
          <div
            className={`grid grid-cols-1 gap-2 lg:gap-3 items-stretch ${
              tripType === "oneway"
                ? "lg:grid-cols-[1fr_auto_1fr_1fr]"
                : "lg:grid-cols-[1fr_auto_1fr_1fr_1fr]"
            }`}
          >
            <FieldShell icon={<MapPin size={13} />} label={t("search.label.from")}>
              <AirportAutocomplete
                value={flightFrom}
                onChange={setFlightFrom}
                placeholder={t("search.placeholder.cityAirport")}
                ariaLabel={t("search.label.from")}
              />
            </FieldShell>
            <button
              onClick={swapFlightCities}
              className="hidden lg:flex self-center w-9 h-9 rounded-full bg-background border border-border items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
              aria-label={t("search.swap")}
              type="button"
            >
              <ArrowLeftRight size={14} />
            </button>
            <FieldShell icon={<Plane size={13} />} label={t("search.label.to")}>
              <AirportAutocomplete
                value={flightTo}
                onChange={setFlightTo}
                placeholder={t("search.placeholder.cityAirport")}
                ariaLabel={t("search.label.to")}
              />
            </FieldShell>
            <FieldShell icon={<CalendarIcon size={13} />} label={t("search.label.depart")}>
              <DatePickerField
                value={flightDepart}
                onChange={setFlightDepart}
                minIso={isoToday}
              />
            </FieldShell>
            {tripType !== "oneway" && (
              <FieldShell icon={<CalendarIcon size={13} />} label={t("search.label.return")}>
                <DatePickerField
                  value={flightReturn}
                  onChange={setFlightReturn}
                  minIso={flightDepart || isoToday}
                />
              </FieldShell>
            )}
          </div>
        )}

        {/* Hotels layout */}
        {tab === "hotels" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-3">
            <FieldShell icon={<MapPin size={13} />} label={t("search.label.destination")}>
              <input
                type="text"
                value={hotelDest}
                onChange={(e) => setHotelDest(e.target.value)}
                className="w-full bg-transparent text-base font-semibold text-foreground outline-none"
                placeholder={t("search.placeholder.destination")}
              />
            </FieldShell>
            <FieldShell icon={<CalendarIcon size={13} />} label={t("search.label.checkin")}>
              <DatePickerField
                value={hotelCheckin}
                onChange={setHotelCheckin}
                minIso={isoToday}
              />
            </FieldShell>
            <FieldShell icon={<CalendarIcon size={13} />} label={t("search.label.checkout")}>
              <DatePickerField
                value={hotelCheckout}
                onChange={setHotelCheckout}
                minIso={hotelCheckin || isoToday}
              />
            </FieldShell>
            <FieldShell icon={<Users size={13} />} label={t("search.label.guests")}>
              <HotelGuestsPicker
                value={hotelGuests}
                onChange={setHotelGuests}
              />
            </FieldShell>
          </div>
        )}

        {/* Cars layout */}
        {tab === "cars" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-3">
            <FieldShell icon={<MapPin size={13} />} label={t("search.label.pickup")}>
              <input
                type="text"
                value={carPickup}
                onChange={(e) => setCarPickup(e.target.value)}
                className="w-full bg-transparent text-base font-semibold text-foreground outline-none"
                placeholder={t("search.placeholder.location")}
              />
            </FieldShell>
            <FieldShell icon={<MapPin size={13} />} label={t("search.label.dropoff")}>
              <input
                type="text"
                value={carDropoff}
                onChange={(e) => setCarDropoff(e.target.value)}
                className="w-full bg-transparent text-base font-semibold text-foreground outline-none"
                placeholder={t("search.placeholder.location")}
              />
            </FieldShell>
            <FieldShell icon={<CalendarIcon size={13} />} label={t("search.label.pickupDate")}>
              <DatePickerField
                value={carPickupDate}
                onChange={setCarPickupDate}
                minIso={isoToday}
              />
            </FieldShell>
            <FieldShell icon={<CalendarIcon size={13} />} label={t("search.label.dropoffDate")}>
              <DatePickerField
                value={carDropoffDate}
                onChange={setCarDropoffDate}
                minIso={carPickupDate || isoToday}
              />
            </FieldShell>
          </div>
        )}

        {/* Bottom: full-width yellow Search button matching B.Trip reference */}
        <div className="mt-5">
          <button
            type="button"
            onClick={handleSearch}
            aria-label={ctaLabel}
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all px-6 py-3.5 font-bold text-base"
          >
            <Search size={18} strokeWidth={2.8} />
            <span>{ctaLabel}</span>
          </button>
        </div>
      </div>

      {/* Trust + chips + disclaimer — only shown in non-compact mode (below the
          panel) so the hero search-panel placement stays focused. */}
      {!compact && (
        <>
          <div className="mt-4 flex flex-col items-center gap-1.5 text-center">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck size={14} className="text-primary" />
              <span>{t("search.trustLine")}</span>
            </div>
            <p className="text-xs text-muted-foreground/80 italic">
              {t("search.scarcity")}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {[
              t("search.chip.partners"),
              t("search.chip.secure"),
              t("search.chip.fees"),
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-sm font-medium text-foreground bg-foreground/5 dark:bg-white/10 border border-border/60 dark:border-white/15 rounded-full px-4 py-1.5"
              >
                <Check size={15} className="text-primary" strokeWidth={3} />
                {item}
              </span>
            ))}
          </div>

          <p className="mt-5 text-center text-xs text-muted-foreground max-w-3xl mx-auto leading-relaxed bg-foreground/[0.04] dark:bg-white/5 rounded-lg px-4 py-3 border border-border/40 dark:border-white/10">
            <span className="font-semibold text-foreground">
              {t("disclaimer.label")}
            </span>{" "}
            {t("disclaimer.body")}
          </p>
        </>
      )}
    </div>
  );
}
