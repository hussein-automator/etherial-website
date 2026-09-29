import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchServices, startBooking } from "@/lib/wix";

export function BookConsultation() {
  const [ready, setReady] = useState(false);
  const [going, setGoing] = useState(false);
  useEffect(() => setReady(true), []);
  const { data: services = [] } = useQuery({
    queryKey: ["wix-services"],
    queryFn: fetchServices,
    enabled: ready,
    retry: false,
  });

  async function book() {
    setGoing(true);
    try {
      await startBooking();
    } catch {
      toast.error("Online booking isn't available right now — please use the form or call us.");
      setGoing(false);
    }
  }

  return (
    <div className="frame-fold rounded-[48px_6px_48px_6px] border border-rule bg-linen-alt p-8">
      <h2 className="font-display text-2xl text-ink">Book a consultation</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Prefer to talk first? Pick a time that suits you and meet our design team.
      </p>
      {services.length > 0 && (
        <ul className="mt-4 space-y-2">
          {services.map((s) => (
            <li key={s.id} className="border-t border-rule pt-2">
              <p className="text-sm font-semibold text-ink">{s.name}</p>
              {s.description && <p className="text-sm text-muted-foreground">{s.description}</p>}
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={book}
        disabled={going}
        className="btn-liquid mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
      >
        {going ? "Opening booking…" : "Choose a time"}
      </button>
    </div>
  );
}
