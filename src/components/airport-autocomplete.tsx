import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type Airport = {
  city: string;
  name: string;
  iata: string;
  country?: string;
};

let airportsCache: Airport[] | null = null;
let airportsPromise: Promise<Airport[]> | null = null;

function loadAirports(): Promise<Airport[]> {
  if (airportsCache) return Promise.resolve(airportsCache);
  if (airportsPromise) return airportsPromise;
  const url = `${import.meta.env.BASE_URL}airports.json`;
  airportsPromise = fetch(url)
    .then((r) => r.json())
    .then((data: Airport[]) => {
      airportsCache = data;
      return data;
    })
    .catch((err) => {
      airportsPromise = null;
      throw err;
    });
  return airportsPromise;
}

// Major international hubs — get a popularity boost so that, e.g.,
// Paris CDG/ORY outrank obscure cities like Parakou or Parasi for "par".
const MAJOR_IATA = new Set<string>([
  // Mega hubs (extra boost)
  "ATL","PEK","DXB","LAX","HND","ORD","LHR","HKG","PVG","CDG",
  "DFW","CAN","FRA","AMS","IST","SIN","DEN","ICN","BKK","JFK",
  "DEL","SEA","MUC","FCO","MAD","BCN","KUL","NRT","MEX","DOH","SYD",
  // Major worldwide
  "LGA","EWR","ORY","NCE","LYS","MRS","TLS","BRU","ZRH","GVA","BSL",
  "CPH","ARN","OSL","HEL","KEF","DUB","MAN","EDI","LGW","STN","BHX",
  "BER","HAM","DUS","STR","CGN","HAJ","NUE","LIS","OPO","ATH","SKG",
  "MXP","LIN","VCE","NAP","BLQ","CTA","PMO","WAW","KRK","GDN","PRG",
  "BUD","OTP","SOF","BEG","ZAG","SJJ","TIA","SVO","DME","VKO","LED",
  "RIX","VNO","TLL","KIV","SKP","TGD",
  "AUH","SHJ","RUH","JED","MED","KWI","BAH","MCT","AMM","BEY","TLV",
  "CAI","HRG","SSH","JNB","CPT","DUR","NBO","ADD","LOS","ABV","ACC",
  "DKR","CMN","RAK","RBA","FEZ","ALG","TUN","MRU","ZNZ",
  "BOM","MAA","BLR","CCU","HYD","COK","TRV","GOI","PNQ","AMD","JAI",
  "ATQ","LKO","NAG","IXC","BWN","CMB","KTM","DAC","ISB","KHI","LHE",
  "KBL","MLE",
  "PEK","PKX","CTU","XIY","CKG","WUH","NKG","HGH","SHA","SZX","TSN",
  "TAO","DLC","SHE","HRB","CGO","XMN","FOC","CSX","KWE","NNG","HAK",
  "SYX","MFM","TPE","TSA","KHH","RMQ",
  "KIX","NGO","FUK","CTS","OKA","KOJ","HIJ","NGS","KMI","KMQ",
  "GMP","PUS","CJU","TAE","HAN","SGN","DAD","CXR","REP","PNH","RGN",
  "MDL","VTE","LPQ","DPS","SUB","UPG","BPN","MES","PEN","BKI","KCH",
  "JHB","HKT","CNX","HDY","DMK","CEB","DVO","CRK","MNL","SYD","MEL",
  "BNE","PER","ADL","CBR","DRW","CNS","OOL","AKL","CHC","WLG","ZQN",
  "NAN","PPT","HNL","OGG","KOA","LIH","GUM",
  "YYZ","YUL","YVR","YYC","YOW","YEG","YHZ","YWG","YQB",
  "GDL","MTY","CUN","BJX","PVR","SJD","MID","TIJ",
  "GRU","GIG","BSB","CGH","SDU","CWB","REC","FOR","SSA","POA","BEL",
  "MAO","CNF","VCP","FLN","NAT","MCZ","AJU","SLZ","THE",
  "EZE","AEP","SCL","LIM","BOG","MDE","CCS","UIO","GYE","ASU","MVD",
  "PTY","SJO","HAV","SDQ","PUJ","SJU","NAS","KIN","GCM","BGI","CUR",
  "AUA","SXM","ANU","MBJ",
  "DCA","IAD","BOS","MIA","FLL","MCO","TPA","JAX","ATL","CLT","RDU",
  "BNA","MEM","STL","MCI","MSY","IAH","HOU","DAL","AUS","SAT","ABQ",
  "PHX","TUS","LAS","SLC","BOI","DEN","COS","SAN","SNA","ONT","BUR",
  "SMF","OAK","SJC","SFO","RNO","PDX","SEA","ANC","FAI","HNL","OGG",
  "MSP","DTW","CLE","CMH","CVG","IND","PIT","BUF","ROC","SYR","ALB",
  "BWI","PHL","BDL","PVD","MHT","BTV","PWM","BGR",
  "EYW","RSW","PBI","SRQ","DAB","PNS","MOB","BHM","HSV","CHA","GSP",
  "AVL","CHO","CHS","SAV","JAN","MGM","LFT","SHV","LIT",
  "OKC","TUL","ICT","OMA","DSM","CID","MSN","MKE","GRR","FNT","DTW",
  "MDT","ORF","RIC","ROA","TYS","TRI",
  "AYT","SAW","ESB","ADB","BJV","DLM","TZX","ASB","TAS","FRU","ALA",
  "TBS","EVN","GYD","HRK","IEV","KBP","ODS","LWO",
  "OVB","SVX","KZN","UFA","KJA","IKT","VVO","KHV","PKC",
  "DBV","SPU","ZAD","PUY","TIV","PRN","SOF","LCA","PFO","ECN",
  "JTR","JMK","HER","RHO","KGS","CFU","CHQ","KVA","LCA","HKT","KBV",
  "USM","UTH","TFS","TFN","LPA","ACE","FUE","SPC","VLC","SVQ","BIO",
  "OVD","SDR","AGP","ALC","IBZ","PMI","MAH","BCN","MAD","SCQ","XRY",
]);

// True mega-hubs — within "Paris" results, CDG should outrank ORY etc.
const HUB_IATA = new Set<string>([
  "ATL","PEK","DXB","LAX","HND","ORD","LHR","HKG","PVG","CDG",
  "DFW","FRA","AMS","IST","SIN","DEN","ICN","BKK","JFK","DEL",
  "MAD","BCN","FCO","DOH","SYD","MUC","NRT","MEX","SEA","KUL","CAN",
]);

// Top popular airports shown by default when the user clicks the input
// before typing — same UX as Emirates / major OTA sites.
const DEFAULT_SUGGESTIONS: string[] = [
  "DXB", "LHR", "CDG", "JFK", "IST", "DOH", "AMS", "FRA",
];

function getDefaultSuggestions(airports: Airport[], limit = 8): Airport[] {
  if (!airports.length) return [];
  const byIata = new Map<string, Airport>();
  for (const a of airports) byIata.set(a.iata, a);
  const out: Airport[] = [];
  for (const code of DEFAULT_SUGGESTIONS) {
    const a = byIata.get(code);
    if (a) out.push(a);
    if (out.length >= limit) break;
  }
  return out;
}

function rankMatches(
  query: string,
  airports: Airport[],
  limit = 8,
): Airport[] {
  const q = query.trim().toLowerCase();
  // Empty/single-char query → show popular hubs as default suggestions
  if (q.length < 2) return getDefaultSuggestions(airports, limit);

  const results: { a: Airport; score: number }[] = [];

  for (const a of airports) {
    const iata = a.iata.toLowerCase();
    const city = a.city.toLowerCase();
    const name = a.name.toLowerCase();

    let score = 0;
    if (iata === q) score = 1000;
    else if (q.length === 3 && iata.startsWith(q)) score = 700;
    else if (city === q) score = 600;
    else if (city.startsWith(q)) {
      // Prefer shorter city names: "Paris" beats "Parakou"
      score = 400 - Math.min(city.length, 50) * 0.5;
    } else if (name.startsWith(q)) {
      score = 250 - Math.min(name.length, 80) * 0.2;
    } else if (city.includes(q)) {
      score = 150 - Math.min(city.length, 50) * 0.5;
    } else if (name.includes(q)) {
      score = 80;
    } else if (iata.startsWith(q)) {
      score = 50;
    } else continue;

    // Popularity boost so well-known hubs win ties
    if (HUB_IATA.has(a.iata)) score += 80;
    else if (MAJOR_IATA.has(a.iata)) score += 50;

    results.push({ a, score });
  }

  results.sort((x, y) => y.score - x.score);
  return results.slice(0, limit).map((r) => r.a);
}

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
};

export function AirportAutocomplete({
  value,
  onChange,
  placeholder,
  ariaLabel,
}: Props) {
  const [query, setQuery] = useState(value);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [airports, setAirports] = useState<Airport[]>(
    () => airportsCache ?? [],
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const reactId = useId();
  const listboxId = `airport-listbox-${reactId}`;
  const optionId = (iata: string) => `airport-opt-${reactId}-${iata}`;

  // Sync external value into local query when it changes upstream (e.g., swap)
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Debounce the search query (300ms)
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(id);
  }, [query]);

  // Lazy-load dataset on first focus, with mount guard
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const ensureLoaded = useCallback(() => {
    if (airportsCache) {
      if (airports.length === 0) setAirports(airportsCache);
      return;
    }
    loadAirports()
      .then((data) => {
        if (mountedRef.current) setAirports(data);
      })
      .catch(() => {
        /* ignore — autocomplete simply won't show */
      });
  }, [airports.length]);

  const results = useMemo(() => {
    if (!open) return [];
    if (!airports.length) return [];
    // Show defaults immediately on focus (before debounce settles) by passing
    // the live query when it's empty, otherwise the debounced query.
    const q = query.trim().length < 2 ? "" : debouncedQuery;
    return rankMatches(q, airports, 8);
  }, [debouncedQuery, open, airports, query]);

  const showingDefaults = query.trim().length < 2;

  // Reset highlighted on results change
  useEffect(() => {
    setHighlighted(0);
  }, [results]);

  // Position dropdown using fixed coordinates (escape parent overflow-hidden)
  const updatePosition = useCallback(() => {
    if (!inputRef.current) return;
    const r = inputRef.current.getBoundingClientRect();
    setPosition({ top: r.bottom + 6, left: r.left, width: r.width });
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (inputRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const select = (a: Airport) => {
    const formatted = `${a.city} (${a.iata})`;
    setQuery(formatted);
    onChange(formatted);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      if (!results.length) return;
      e.preventDefault();
      setHighlighted((h) => (h + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      if (!results.length) return;
      e.preventDefault();
      setHighlighted(
        (h) => (h - 1 + results.length) % results.length,
      );
    } else if (e.key === "Enter") {
      // Avoid stale selection: if user pressed Enter before debounce
      // settled, recompute results synchronously against current query.
      const live =
        query === debouncedQuery
          ? results
          : rankMatches(query, airports, 8);
      const a = live[highlighted] ?? live[0];
      if (a) {
        e.preventDefault();
        select(a);
      }
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          const v = e.target.value;
          setQuery(v);
          onChange(v);
          setOpen(true);
        }}
        onFocus={() => {
          ensureLoaded();
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        role="combobox"
        aria-label={ariaLabel}
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={open && results.length > 0}
        aria-activedescendant={
          open && results[highlighted]
            ? optionId(results[highlighted].iata)
            : undefined
        }
        autoComplete="off"
        spellCheck={false}
        className="w-full bg-transparent text-base font-semibold text-foreground outline-none placeholder:text-muted-foreground"
      />
      {open && results.length > 0 &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              width: Math.max(position.width, 280),
              zIndex: 60,
            }}
            className="bg-card rounded-xl shadow-2xl border border-border overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150"
            data-testid="airport-autocomplete-dropdown"
          >
            {showingDefaults && (
              <div className="px-4 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Popular destinations
              </div>
            )}
            <ul
              id={listboxId}
              role="listbox"
              className="max-h-80 overflow-y-auto py-1"
            >
              {results.map((a, i) => (
                <li
                  key={a.iata}
                  id={optionId(a.iata)}
                  role="option"
                  aria-selected={i === highlighted}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    select(a);
                  }}
                  onMouseEnter={() => setHighlighted(i)}
                  className={`px-4 py-2.5 cursor-pointer transition-colors ${
                    i === highlighted
                      ? "bg-primary/10"
                      : "hover:bg-muted/40"
                  }`}
                  data-testid={`airport-option-${a.iata}`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold text-foreground truncate">
                      {a.city}
                    </span>
                    <span className="text-[11px] font-bold text-primary tracking-wider shrink-0 px-1.5 py-0.5 bg-primary/10 rounded">
                      {a.iata}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate mt-0.5">
                    {a.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>,
          document.body,
        )}
    </>
  );
}
