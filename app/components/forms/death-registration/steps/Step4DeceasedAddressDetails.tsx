"use client";

import { useEffect, useMemo, useState } from "react";
import { useSessionContext } from "@/app/context/SessionContext";
import { toast } from "sonner";
import { Input } from "../ui/FormFields";
import { Card, CardContent } from "@/app/components/ui/card";
import { DeathRegistrationData } from "@/lib/validations/death-registration.schema";
import DzongkhagAutocomplete from "@/app/components/forms/birth-registration/components/autocomplete/DzongkhagAutocomplete";
import GewogAutocomplete from "@/app/components/forms/birth-registration/components/autocomplete/GewogAutocomplete";
import ChiwogAutocomplete from "@/app/components/forms/birth-registration/components/autocomplete/ChiwogAutocomplete";
import VillageAutocomplete from "@/app/components/forms/birth-registration/components/autocomplete/VillageAutocomplete";

interface Dzongkhag {
  id: string;
  name: string;
}

interface Gewog {
  id: string;
  name: string;
  dzongkhag_id: string;
}

interface Chiwog {
  id: string;
  name: string;
  dzongkhag_id: string;
  gewog_id: string;
}

interface Village {
  id: string;
  name: string;
  dzongkhag_id: string;
  gewog_id: string;
  chiwog_id: string;
}

const normalizeList = <T extends { id: string; name: string }>(
  payload: unknown,
): T[] => {
  if (Array.isArray(payload)) return payload as T[];

  if (
    payload &&
    typeof payload === "object" &&
    Array.isArray((payload as { data?: unknown }).data)
  ) {
    return (payload as { data: T[] }).data;
  }

  if (
    payload &&
    typeof payload === "object" &&
    Array.isArray((payload as { items?: unknown }).items)
  ) {
    return (payload as { items: T[] }).items;
  }

  return [];
};

interface Step4DeceasedAddressDetailsProps {
  data: Partial<DeathRegistrationData>;
  updateData: (data: Partial<DeathRegistrationData>) => void;
  errors: Record<string, string>;
}

export default function Step4DeceasedAddressDetails({
  data,
  updateData,
  errors,
}: Step4DeceasedAddressDetailsProps) {
  const { session } = useSessionContext();
  const [dzongkhagQuery, setDzongkhagQuery] = useState("");
  const [gewogQuery, setGewogQuery] = useState("");
  const [chiwogQuery, setChiwogQuery] = useState("");
  const [villageQuery, setVillageQuery] = useState("");
  const [dzongkhags, setDzongkhags] = useState<Dzongkhag[]>([]);
  const [gewogs, setGewogs] = useState<Gewog[]>([]);
  const [chiwogs, setChiwogs] = useState<Chiwog[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);

  useEffect(() => {
    // Load dummy location data
    const loadDummyData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      setDzongkhags([
        { id: "1", name: "Thimphu" },
        { id: "2", name: "Paro" },
        { id: "3", name: "Punakha" },
        { id: "4", name: "Bumthang" },
      ]);

      setGewogs([
        { id: "1", name: "Chang Gewog", dzongkhag_id: "1" },
        { id: "2", name: "Motithang Gewog", dzongkhag_id: "1" },
        { id: "3", name: "Doteng Gewog", dzongkhag_id: "2" },
        { id: "4", name: "Lobesa Gewog", dzongkhag_id: "3" },
      ]);

      setChiwogs([
        { id: "1", name: "Chiwog 1", gewog_id: "1", dzongkhag_id: "1" },
        { id: "2", name: "Chiwog 2", gewog_id: "1", dzongkhag_id: "1" },
      ]);

      setVillages([
        {
          id: "1",
          name: "Motithang",
          gewog_id: "1",
          dzongkhag_id: "1",
          chiwog_id: "1",
        },
        {
          id: "2",
          name: "Dechencholing",
          gewog_id: "2",
          dzongkhag_id: "1",
          chiwog_id: "2",
        },
        {
          id: "3",
          name: "Satsam",
          gewog_id: "3",
          dzongkhag_id: "2",
          chiwog_id: "1",
        },
        {
          id: "4",
          name: "Bondey",
          gewog_id: "3",
          dzongkhag_id: "2",
          chiwog_id: "1",
        },
      ]);
    };

    loadDummyData();
  }, []);

  const selectedDzongkhag = useMemo(
    () => dzongkhags.find((item) => item.id === data.dzongkhag_id),
    [dzongkhags, data.dzongkhag_id],
  );

  const selectedGewog = useMemo(
    () => gewogs.find((item) => item.id === data.gewog_id),
    [gewogs, data.gewog_id],
  );

  const filteredGewogs = useMemo(() => {
    if (!selectedDzongkhag) return [];
    return gewogs.filter((item) => item.dzongkhag_id === selectedDzongkhag.id);
  }, [gewogs, selectedDzongkhag]);

  const filteredChiwogs = useMemo(() => {
    if (!selectedDzongkhag || !selectedGewog) return [];
    return chiwogs.filter(
      (item) =>
        item.dzongkhag_id === selectedDzongkhag.id &&
        item.gewog_id === selectedGewog.id,
    );
  }, [chiwogs, selectedDzongkhag, selectedGewog]);

  const filteredVillages = useMemo(() => {
    if (!selectedDzongkhag || !selectedGewog || !data.chiwog_id) return [];
    return villages.filter(
      (item) =>
        item.dzongkhag_id === selectedDzongkhag.id &&
        item.gewog_id === selectedGewog.id &&
        item.chiwog_id === data.chiwog_id,
    );
  }, [villages, selectedDzongkhag, selectedGewog, data.chiwog_id]);

  // Initialize autocomplete queries with names from IDs - consolidated to handle dependencies
  useEffect(() => {
    // Wait for all data to be loaded
    if (
      dzongkhags.length === 0 ||
      gewogs.length === 0 ||
      chiwogs.length === 0 ||
      villages.length === 0
    ) {
      return;
    }

    // Initialize dzongkhag
    if (data.dzongkhag_id && !dzongkhagQuery) {
      const dzongkhag = dzongkhags.find((d) => d.id === data.dzongkhag_id);
      if (dzongkhag) setDzongkhagQuery(dzongkhag.name);
    }

    // Initialize gewog (only if dzongkhag is set)
    if (data.gewog_id && data.dzongkhag_id && !gewogQuery) {
      const gewog = gewogs.find((g) => g.id === data.gewog_id);
      if (gewog) setGewogQuery(gewog.name);
    }

    // Initialize chiwog (only if gewog and dzongkhag are set)
    if (data.chiwog_id && data.gewog_id && data.dzongkhag_id && !chiwogQuery) {
      const chiwog = chiwogs.find((c) => c.id === data.chiwog_id);
      if (chiwog) setChiwogQuery(chiwog.name);
    }

    // Initialize village (only if chiwog, gewog, and dzongkhag are set)
    if (
      data.village_id &&
      data.chiwog_id &&
      data.gewog_id &&
      data.dzongkhag_id &&
      !villageQuery
    ) {
      const village = villages.find((v) => v.id === data.village_id);
      if (village) setVillageQuery(village.name);
    }
  }, [
    data.dzongkhag_id,
    data.gewog_id,
    data.chiwog_id,
    data.village_id,
    dzongkhags,
    gewogs,
    chiwogs,
    villages,
    dzongkhagQuery,
    gewogQuery,
    chiwogQuery,
    villageQuery,
  ]);

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-2">
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
          Permanent Address
        </h3>
        <p className="text-sm sm:text-base text-gray-500">
          Provide the permanent address of the deceased
        </p>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6 space-y-6">
          <DzongkhagAutocomplete
            value={dzongkhagQuery}
            options={dzongkhags}
            onSelect={(value, selected) => {
              setDzongkhagQuery(value);
              setGewogQuery("");
              setChiwogQuery("");
              setVillageQuery("");
              updateData({
                dzongkhag_id: selected?.id,
                gewog_id: undefined,
                chiwog_id: undefined,
                village_id: undefined,
              });
            }}
            error={errors.dzongkhag_id}
          />

          <GewogAutocomplete
            value={gewogQuery}
            options={filteredGewogs}
            onSelect={(value, selected) => {
              setGewogQuery(value);
              setChiwogQuery("");
              setVillageQuery("");
              updateData({
                gewog_id: selected?.id,
                chiwog_id: undefined,
                village_id: undefined,
              });
            }}
            error={errors.gewog_id}
          />

          <ChiwogAutocomplete
            value={chiwogQuery}
            options={filteredChiwogs}
            onSelect={(value, selected) => {
              setChiwogQuery(value);
              setVillageQuery("");
              updateData({
                chiwog_id: selected?.id,
                village_id: undefined,
              });
            }}
            error={errors.chiwog_id}
          />

          <VillageAutocomplete
            value={villageQuery}
            options={filteredVillages.map((v) => ({ id: v.id, name: v.name }))}
            onSelect={(value, selected) => {
              setVillageQuery(value);
              updateData({ village_id: selected?.id });
            }}
            error={errors.village_id}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Household Number"
              required
              id="house_hold_no"
              type="text"
              placeholder="Enter Household Number"
              value={data.house_hold_no || ""}
              onChange={(e) => updateData({ house_hold_no: e.target.value })}
              error={errors.house_hold_no}
            />

            <Input
              label="House Number"
              required
              id="house_no"
              type="text"
              placeholder="Enter House Number"
              value={data.house_no || ""}
              onChange={(e) => updateData({ house_no: e.target.value })}
              error={errors.house_no}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
