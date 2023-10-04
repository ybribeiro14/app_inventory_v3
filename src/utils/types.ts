export interface User {
  id: number;
  name: string;
  login: string;
  job: string;
  id_feature: number | null;
  feature: Feature | null;
}

export interface Feature {
  id: string;
  client: string;
  stat: string;
  model: number;
  validate_ean: boolean;
  same_ean: boolean;
  collect_serial: boolean;
  collect_date: boolean;
  collect_lot: boolean;
  empty_locator: boolean;
}
