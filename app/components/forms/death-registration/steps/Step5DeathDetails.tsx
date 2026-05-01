"use client";

import { useEffect, useMemo, useState } from "react";
import { useSessionContext } from "@/app/context/SessionContext";
import { toast } from "sonner";
import { Input } from "../ui/FormFields";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent } from "@/app/components/ui/card";
import { Textarea } from "@/app/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { DeathRegistrationData } from "@/lib/validations/death-registration.schema";
import BaseAutocompleteField from "@/app/components/forms/birth-registration/components/autocomplete/BaseAutocompleteField";
import DzongkhagAutocomplete from "@/app/components/forms/birth-registration/components/autocomplete/DzongkhagAutocomplete";
import GewogAutocomplete from "@/app/components/forms/birth-registration/components/autocomplete/GewogAutocomplete";
import ChiwogAutocomplete from "@/app/components/forms/birth-registration/components/autocomplete/ChiwogAutocomplete";
import VillageAutocomplete from "@/app/components/forms/birth-registration/components/autocomplete/VillageAutocomplete";

interface Country {
  id: string;
  name: string;
}

interface City {
  id: string;
  name: string;
  country_id?: string;
}

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

interface Step5DeathDetailsProps {
  data: Partial<DeathRegistrationData>;
  updateData: (data: Partial<DeathRegistrationData>) => void;
  errors: Record<string, string>;
}

export default function Step5DeathDetails({
  data,
  updateData,
  errors,
}: Step5DeathDetailsProps) {
  const { session } = useSessionContext();
  const [locationMode, setLocationMode] = useState<"bhutan" | "abroad">(
    data.country_of_death_id || data.city_id ? "abroad" : "bhutan",
  );

  const [countryQuery, setCountryQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [dzongkhagQuery, setDzongkhagQuery] = useState("");
  const [gewogQuery, setGewogQuery] = useState("");
  const [chiwogQuery, setChiwogQuery] = useState("");
  const [villageQuery, setVillageQuery] = useState("");

  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [dzongkhags, setDzongkhags] = useState<Dzongkhag[]>([]);
  const [gewogs, setGewogs] = useState<Gewog[]>([]);
  const [chiwogs, setChiwogs] = useState<Chiwog[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);

  useEffect(() => {
    // Load dummy location data
    const loadDummyData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      setCountries([
        { id: "1", name: "Bhutan" },
        { id: "2", name: "India" },
        { id: "3", name: "Nepal" },
      ]);

      setCities([
        { id: "1", name: "Thimphu City" },
        { id: "2", name: "Phuentsholing" },
        { id: "3", name: "Paro" },
      ]);

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

  const selectedCountry = useMemo(
    () => countries.find((item) => item.id === data.country_of_death_id),
    [countries, data.country_of_death_id],
  );

  const selectedDzongkhag = useMemo(
    () => dzongkhags.find((item) => item.id === data.dzongkhag_of_death_id),
    [dzongkhags, data.dzongkhag_of_death_id],
  );

  const selectedGewog = useMemo(
    () => gewogs.find((item) => item.id === data.gewog_of_death_id),
    [gewogs, data.gewog_of_death_id],
  );

  const filteredCities = useMemo(() => {
    if (!selectedCountry) return [];
    return cities.filter((item) => item.country_id === selectedCountry.id);
  }, [cities, selectedCountry]);

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
    if (!selectedDzongkhag || !selectedGewog || !data.chiwog_of_death_id) {
      return [];
    }
    return villages.filter(
      (item) =>
        item.dzongkhag_id === selectedDzongkhag.id &&
        item.gewog_id === selectedGewog.id &&
        item.chiwog_id === data.chiwog_of_death_id,
    );
  }, [villages, selectedDzongkhag, selectedGewog, data.chiwog_of_death_id]);

  useEffect(() => {
    const countryName =
      countries.find((item) => item.id === data.country_of_death_id)?.name ||
      "";
    const cityName =
      cities.find((item) => item.id === data.city_id)?.name || "";
    const dzongkhagName =
      dzongkhags.find((item) => item.id === data.dzongkhag_of_death_id)?.name ||
      "";
    const gewogName =
      gewogs.find((item) => item.id === data.gewog_of_death_id)?.name || "";
    const chiwogName =
      chiwogs.find((item) => item.id === data.chiwog_of_death_id)?.name || "";
    const villageName =
      villages.find((item) => item.id === data.village_of_death_id)?.name || "";

    setCountryQuery(countryName);
    setCityQuery(cityName);
    setDzongkhagQuery(dzongkhagName);
    setGewogQuery(gewogName);
    setChiwogQuery(chiwogName);
    setVillageQuery(villageName);
  }, [
    data.country_of_death_id,
    data.city_id,
    data.dzongkhag_of_death_id,
    data.gewog_of_death_id,
    data.chiwog_of_death_id,
    data.village_of_death_id,
    countries,
    cities,
    dzongkhags,
    gewogs,
    chiwogs,
    villages,
  ]);

  const handleLocationModeChange = (value: "bhutan" | "abroad") => {
    setLocationMode(value);

    if (value === "abroad") {
      setDzongkhagQuery("");
      setGewogQuery("");
      setChiwogQuery("");
      setVillageQuery("");
      updateData({
        dzongkhag_of_death_id: undefined,
        gewog_of_death_id: undefined,
        chiwog_of_death_id: undefined,
        village_of_death_id: undefined,
      });
      return;
    }

    setCountryQuery("");
    setCityQuery("");
    updateData({
      country_of_death_id: undefined,
      city_id: undefined,
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-2">
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
          Death Information
        </h3>
        <p className="text-sm sm:text-base text-gray-500">
          Provide details about when, how, and where the death occurred
        </p>
      </div>

      {/* Death Details Card */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Date of Death"
              required
              id="date_of_death"
              type="date"
              value={data.date_of_death || ""}
              onChange={(e) => updateData({ date_of_death: e.target.value })}
              error={errors.date_of_death}
            />

            <Input
              label="Time of Death"
              required
              id="time_of_death"
              type="time"
              value={data.time_of_death || ""}
              onChange={(e) => updateData({ time_of_death: e.target.value })}
              error={errors.time_of_death}
            />
          </div>

          <Input
            label="Place of Death"
            required
            id="place_of_death"
            type="text"
            placeholder="e.g., Hospital name, Home, etc."
            value={data.place_of_death || ""}
            onChange={(e) => updateData({ place_of_death: e.target.value })}
            error={errors.place_of_death}
          />

          <div className="space-y-1">
            <Label
              htmlFor="cause_of_death"
              className="pl-0.5 text-xs font-bold uppercase tracking-wider text-gray-400"
            >
              Cause of Death <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="cause_of_death"
              placeholder="Please describe the cause of death..."
              value={data.cause_of_death || ""}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                updateData({ cause_of_death: e.target.value })
              }
              className="min-h-[100px] rounded-lg resize-y"
            />
            {errors.cause_of_death && (
              <p className="text-destructive text-[11px] font-semibold pl-0.5">
                {errors.cause_of_death}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Death Location Card */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-6">
          <div className="mb-4">
            <h4 className="text-base font-bold text-gray-900 mb-1">
              Death Location Details
            </h4>
            <p className="text-xs text-gray-500">
              {data.is_health_registered === true
                ? "Location information retrieved from ePIS system"
                : "Please provide the location where death occurred (required)"}
            </p>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-bold uppercase tracking-wider text-gray-400 pl-0.5">
              Did the person pass away in another country?
              <span className="text-destructive"> *</span>
            </Label>
            <RadioGroup
              value={locationMode}
              onValueChange={(value) =>
                handleLocationModeChange(value as "bhutan" | "abroad")
              }
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <Label
                htmlFor="death-location-bhutan"
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all cursor-pointer hover:bg-gray-50",
                  locationMode === "bhutan"
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-gray-100",
                )}
              >
                <RadioGroupItem value="bhutan" id="death-location-bhutan" />
                <span className="text-sm font-semibold text-gray-900 flex-1">
                  No, passed away in Bhutan
                </span>
              </Label>

              <Label
                htmlFor="death-location-abroad"
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all cursor-pointer hover:bg-gray-50",
                  locationMode === "abroad"
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-gray-100",
                )}
              >
                <RadioGroupItem value="abroad" id="death-location-abroad" />
                <span className="text-sm font-semibold text-gray-900 flex-1">
                  Yes, passed away in another country
                </span>
              </Label>
            </RadioGroup>
          </div>

          {locationMode === "abroad" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <BaseAutocompleteField
                label="Country of Death"
                required
                value={countryQuery}
                options={countries}
                placeholder="Start typing country"
                error={errors.country_of_death_id}
                listId="death-country-options"
                onSelect={(value, selected) => {
                  setCountryQuery(value);
                  setCityQuery("");
                  updateData({
                    country_of_death_id: selected?.id,
                    city_id: undefined,
                  });
                }}
              />

              <BaseAutocompleteField
                label="City of Death"
                required
                value={cityQuery}
                options={filteredCities}
                placeholder="Start typing city"
                error={errors.city_id}
                listId="death-city-options"
                onSelect={(value, selected) => {
                  setCityQuery(value);
                  updateData({ city_id: selected?.id });
                }}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <DzongkhagAutocomplete
                value={dzongkhagQuery}
                options={dzongkhags}
                onSelect={(value, selected) => {
                  setDzongkhagQuery(value);
                  setGewogQuery("");
                  setChiwogQuery("");
                  setVillageQuery("");
                  updateData({
                    dzongkhag_of_death_id: selected?.id,
                    gewog_of_death_id: undefined,
                    chiwog_of_death_id: undefined,
                    village_of_death_id: undefined,
                  });
                }}
                error={errors.dzongkhag_of_death_id}
              />

              <GewogAutocomplete
                value={gewogQuery}
                options={filteredGewogs}
                onSelect={(value, selected) => {
                  setGewogQuery(value);
                  setChiwogQuery("");
                  setVillageQuery("");
                  updateData({
                    gewog_of_death_id: selected?.id,
                    chiwog_of_death_id: undefined,
                    village_of_death_id: undefined,
                  });
                }}
                error={errors.gewog_of_death_id}
              />

              <ChiwogAutocomplete
                value={chiwogQuery}
                options={filteredChiwogs}
                onSelect={(value, selected) => {
                  setChiwogQuery(value);
                  setVillageQuery("");
                  updateData({
                    chiwog_of_death_id: selected?.id,
                    village_of_death_id: undefined,
                  });
                }}
                error={errors.chiwog_of_death_id}
              />

              <VillageAutocomplete
                value={villageQuery}
                options={filteredVillages}
                onSelect={(value, selected) => {
                  setVillageQuery(value);
                  updateData({ village_of_death_id: selected?.id });
                }}
                error={errors.village_of_death_id}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
