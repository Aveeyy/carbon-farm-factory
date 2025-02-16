interface InferenceResponse {
  concentration_ts: number[];
  total_concentration: number;
  ph_ts: number[];
  financial_analysis: {
    annual_cash_flows: number[];
    cumulative_cash_flows: number[];
    yearly_costs: number[];
  }
}

export default InferenceResponse;
