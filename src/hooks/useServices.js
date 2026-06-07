import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true);

    setServices(data || []);
  }

  return services;
}