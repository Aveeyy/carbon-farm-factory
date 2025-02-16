interface InferenceRequest {
  address: string;
  feedstock_type: string;
  area: number;
  time_period: number;
  application_rate: number;
  clay_pct: number;
  silt_pct: number;
  sand_pct: number;
}

export default InferenceRequest;
