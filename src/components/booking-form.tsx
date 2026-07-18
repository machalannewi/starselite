"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BookingFormProps {
  figureName: string;
  figureSlug: string;
}

export function BookingForm({ figureName, figureSlug }: BookingFormProps) {
  const [form, setForm] = useState({
    name: "",
    celebrityName: "",
    email: "",
    address: "",
    country: "",
    phone: "",
    eventDate: "",
    eventPlace: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, figureName, figureSlug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      toast.success("Inquiry sent — we'll be in touch.");
      setForm({
        name: "",
        celebrityName: "",
        address: "",
        country: "",
        email: "",
        phone: "",
        eventDate: "",
        eventPlace: "",
        message: "",
      });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <div
        className="border rounded-sm p-8"
        style={{
          borderColor: "var(--line)",
          background: "rgba(255,255,255,0.5)",
        }}
      >
        <p
          className="font-mono-meta text-xs tracking-widest uppercase"
          style={{ color: "var(--sage)" }}
        >
          Booking Inquiry
        </p>
        <h2 className="font-display text-2xl font-semibold mt-2 mb-6">
          Book {figureName}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              placeholder="Your name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />
            <Input
              placeholder="Celebrity name"
              value={form.celebrityName}
              onChange={(e) => update("celebrityName", e.target.value)}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
            />
            <Input
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              placeholder="Address"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              required
            />
            <Input
              placeholder="Country"
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              type="date"
              placeholder="Preferred Date"
              value={form.eventDate}
              onChange={(e) => update("eventDate", e.target.value)}
            />
            <Input
              placeholder="Preferred place"
              value={form.eventPlace}
              onChange={(e) => update("eventPlace", e.target.value)}
            />
          </div>

          <textarea
            placeholder="Tell us about the event — date, location, budget, etc."
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            required
            rows={5}
            className="w-full rounded-sm border px-3 py-2 text-sm bg-transparent"
            style={{ borderColor: "var(--line)" }}
          />

          <Button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto"
          >
            {submitting ? "Sending..." : "Send inquiry"}
          </Button>
        </form>
      </div>
    </section>
  );
}
