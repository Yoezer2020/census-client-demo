"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSessionContext } from "@/app/context/SessionContext";
import { toast } from "sonner";
import { BirthRegistrationData } from "@/lib/validations/birth-registration.schema";
import { Input } from "../ui/FormFields";
import { Button } from "@/app/components/ui/button";
import CountryAutocomplete from "../components/autocomplete/CountryAutocomplete";
import CityAutocomplete from "../components/autocomplete/CityAutocomplete";
import DzongkhagAutocomplete from "../components/autocomplete/DzongkhagAutocomplete";
import GewogAutocomplete from "../components/autocomplete/GewogAutocomplete";
import ChiwogAutocomplete from "../components/autocomplete/ChiwogAutocomplete";
import VillageAutocomplete from "../components/autocomplete/VillageAutocomplete";
import GenderAutocomplete from "../components/autocomplete/GenderAutocomplete";
import CountriesService from "@/lib/services/common-service/countries/countries";
import CitiesService from "@/lib/services/common-service/cities/cities";
import DzongkhagsService from "@/lib/services/common-service/dzongkhags/dzongkhags";
import GewogsService from "@/lib/services/common-service/gewogs/gewogs";
import ChiwogsService from "@/lib/services/common-service/chiwogs/chiwogs";
import VillagesService from "@/lib/services/common-service/villages/villages";
import GendersService from "@/lib/services/common-service/genders/genders";

interface StepProps {
  data: Partial<BirthRegistrationData>;
  updateData: (data: Partial<BirthRegistrationData>) => void;
  errors: Record<string, string>;
}

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

interface Gender {
  id: string;
  name: string;
}

const birthDeathServiceBaseUrl =
  process.env.NEXT_PUBLIC_BIRTH_DEATH_SERVICE_URL;

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

export default function Step3ChildDetails({
  data,
  updateData,
  errors,
}: StepProps) {
  const { session } = useSessionContext();
  const isAutoFetched = data.is_epis_registered === true;

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
  const [genders, setGenders] = useState<Gender[]>([]);

  useEffect(() => {
    // Simulate API calls with dummy data
    const loadDummyData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Dummy location data
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
      ]);

      setChiwogs([
        { id: "1", name: "Chiwog 1", dzongkhag_id: "1", gewog_id: "1" },
        { id: "2", name: "Chiwog 2", dzongkhag_id: "1", gewog_id: "1" },
        { id: "3", name: "Chiwog 3", dzongkhag_id: "1", gewog_id: "2" },
        { id: "4", name: "Chiwog 4", dzongkhag_id: "1", gewog_id: "2" },
        { id: "5", name: "Chiwog 5", dzongkhag_id: "2", gewog_id: "3" },
        { id: "6", name: "Chiwog 6", dzongkhag_id: "2", gewog_id: "3" },
      ]);

      setVillages([
        {
          id: "1",
          name: "Motithang",
          dzongkhag_id: "1",
          gewog_id: "1",
          chiwog_id: "1",
        },
        {
          id: "2",
          name: "Dechencholing",
          dzongkhag_id: "1",
          gewog_id: "1",
          chiwog_id: "1",
        },
        {
          id: "3",
          name: "Changzamtog",
          dzongkhag_id: "1",
          gewog_id: "1",
          chiwog_id: "2",
        },
        {
          id: "4",
          name: "Zilukha",
          dzongkhag_id: "1",
          gewog_id: "2",
          chiwog_id: "3",
        },
        {
          id: "5",
          name: "Taba",
          dzongkhag_id: "1",
          gewog_id: "2",
          chiwog_id: "4",
        },
        {
          id: "6",
          name: "Satsam",
          dzongkhag_id: "2",
          gewog_id: "3",
          chiwog_id: "5",
        },
        {
          id: "7",
          name: "Shaba",
          dzongkhag_id: "2",
          gewog_id: "3",
          chiwog_id: "6",
        },
      ]);

      setGenders([
        { id: "1", name: "Male" },
        { id: "2", name: "Female" },
        { id: "3", name: "Other" },
      ]);
    };

    loadDummyData();
  }, []);

  const selectedDzongkhag = useMemo(
    () => dzongkhags.find((item) => item.id === data.birth_dzongkhag_id),
    [dzongkhags, data.birth_dzongkhag_id],
  );

  const selectedGewog = useMemo(
    () => gewogs.find((item) => item.id === data.birth_gewog_id),
    [gewogs, data.birth_gewog_id],
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
    if (!selectedDzongkhag || !selectedGewog) return [];
    return villages.filter(
      (item) =>
        item.dzongkhag_id === selectedDzongkhag.id &&
        item.gewog_id === selectedGewog.id,
    );
  }, [villages, selectedDzongkhag, selectedGewog]);

  useEffect(() => {
    // If auto-fetched is enabled and we are entering this step, we could mock fetch data
    if (isAutoFetched && (!data.date_of_birth || !data.first_name)) {
      // Mock fetching logic here for simulation
    }
  }, [isAutoFetched, data.date_of_birth, data.first_name]);

  const handleEpisVerify = () => {
    if (!data.episId) return;

    // DEMO: Simulate EPIS verification with dummy data - return NOT FOUND
    const motherCid = data.episId;

    // Simulate async verification
    setTimeout(() => {
      // For demo: Return NOT registered in ePIS so manual location entry is required
      updateData({
        mother_cid: motherCid,
        is_epis_registered: false,
      });
      toast.info(
        "No ePIS record found. Please enter birth location details manually.",
        {
          duration: 4000,
        },
      );
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-1 sm:space-y-2">
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
          Child Information
        </h3>
        <p className="text-sm sm:text-base text-gray-500">
          Enter all details regarding the child and birth
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70 border-b border-gray-100 pb-2">
            1. Birth Location
          </h4>

          {data.is_born_in_bhutan === false && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <CountryAutocomplete
                value={countryQuery}
                options={countries}
                onSelect={(value, selected) => {
                  setCountryQuery(value);
                  updateData({
                    birth_country_id: selected?.id,
                  });
                }}
                error={errors.birth_country_id}
              />
              <CityAutocomplete
                value={cityQuery}
                options={cities}
                onSelect={(value, selected) => {
                  setCityQuery(value);
                  updateData({
                    birth_city_id: selected?.id,
                  });
                }}
                error={errors.birth_city_id}
              />
            </div>
          )}

          {data.is_epis_registered === true && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
                <div className="flex-1">
                  <Input
                    label="Mother's CID for ePIS Verification"
                    required
                    value={data.episId || ""}
                    onChange={(e) => updateData({ episId: e.target.value })}
                    placeholder="Enter mother's CID number (e.g., 11234567890)"
                    error={errors.episId}
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleEpisVerify}
                  className="h-10 px-6 bg-primary text-white rounded-lg font-bold shadow-sm hover:opacity-90 transition-all text-sm whitespace-nowrap"
                >
                  Verify Record
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Input
                  label="Dzongkhag"
                  value={selectedDzongkhag?.name || ""}
                  readOnly
                  className="bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <Input
                  label="Gewog"
                  value={selectedGewog?.name || ""}
                  readOnly
                  className="bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <Input
                  label="Chiwog"
                  value={
                    chiwogs.find((item) => item.id === data.birth_chiwog_id)
                      ?.name || ""
                  }
                  readOnly
                  className="bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <Input
                  label="Village"
                  value={
                    villages.find((item) => item.id === data.birth_village_id)
                      ?.name || ""
                  }
                  readOnly
                  className="bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          )}

          {data.is_born_in_bhutan === true &&
            data.is_epis_registered === false && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <DzongkhagAutocomplete
                  value={dzongkhagQuery}
                  options={dzongkhags}
                  onSelect={(value, selected) => (
                    setDzongkhagQuery(value),
                    setGewogQuery(""),
                    setChiwogQuery(""),
                    setVillageQuery(""),
                    updateData({
                      birth_dzongkhag_id: selected?.id,
                      birth_gewog_id: undefined,
                      birth_chiwog_id: undefined,
                      birth_village_id: undefined,
                    })
                  )}
                />

                <GewogAutocomplete
                  value={gewogQuery}
                  options={filteredGewogs}
                  onSelect={(value, selected) => (
                    setGewogQuery(value),
                    setChiwogQuery(""),
                    setVillageQuery(""),
                    updateData({
                      birth_gewog_id: selected?.id,
                      birth_chiwog_id: undefined,
                      birth_village_id: undefined,
                    })
                  )}
                />

                <ChiwogAutocomplete
                  value={chiwogQuery}
                  options={filteredChiwogs}
                  onSelect={(value, selected) => (
                    setChiwogQuery(value),
                    updateData({
                      birth_chiwog_id: selected?.id,
                    })
                  )}
                />

                <VillageAutocomplete
                  value={villageQuery}
                  options={filteredVillages}
                  onSelect={(value, selected) => (
                    setVillageQuery(value),
                    updateData({
                      birth_village_id: selected?.id,
                    })
                  )}
                />
              </div>
            )}
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70 border-b border-gray-100 pb-2">
            2. Child Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Input
              label="First Name"
              required
              value={data.first_name || ""}
              onChange={(e) => updateData({ first_name: e.target.value })}
              error={errors.first_name}
            />
            <Input
              label="Middle Name"
              value={data.middle_name || ""}
              onChange={(e) => updateData({ middle_name: e.target.value })}
            />
            <Input
              label="Last Name"
              required
              value={data.last_name || ""}
              onChange={(e) => updateData({ last_name: e.target.value })}
              error={errors.last_name}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70 border-b border-gray-100 pb-2">
            3. Birth Statistics
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Date of Birth"
              required
              type="date"
              value={data.date_of_birth || ""}
              onChange={(e) => updateData({ date_of_birth: e.target.value })}
              error={errors.date_of_birth}
            />
            <Input
              label="Time of Birth"
              required
              type="time"
              value={data.time_of_birth || ""}
              onChange={(e) => updateData({ time_of_birth: e.target.value })}
              error={errors.time_of_birth}
            />
            <Input
              label="Birth Weight (g)"
              required
              type="number"
              step="0.01"
              value={data.weight || ""}
              onChange={(e) => updateData({ weight: e.target.value })}
              error={errors.weight}
            />
            <GenderAutocomplete
              value={genders.find((g) => g.id === data.gender_id)?.name || ""}
              options={genders}
              onSelect={(value, selected) =>
                updateData({
                  gender_id: selected?.id,
                  gender: selected?.name as "Male" | "Female" | "Other",
                })
              }
              error={errors.gender_id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
