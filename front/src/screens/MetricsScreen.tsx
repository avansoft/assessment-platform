import React from "react";
import { Outlet } from "react-router-dom";
import { MetricsContainer } from "../containers/metrics/MetricsContainer";
import { MetricProvider } from "../providers/MetricProvider";

const MetricsScreen = () => {
  return (
    <MetricProvider>
      <MetricsContainer>
        <Outlet />
      </MetricsContainer>
    </MetricProvider>
  );
};

export default MetricsScreen;
