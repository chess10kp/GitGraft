
import React, { useCallback, useMemo, useRef } from "react";

import { scaleOrdinal } from "@visx/scale";
import { useTooltip } from "@visx/tooltip";

import { ArchData } from "./MotionPieArch";
import merge from "lodash/merge"

type ChartMargin = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

const defaultMargin: ChartMargin = Object.freeze({
  top: 8,
  right: 8,
  bottom: 8,
  left: 8
});

export default function usePieChart(
  data: ArchData[],
  size: number,
  thickness: number,
  margin?: ChartMargin
) {


  margin = merge({}, defaultMargin, margin);

  const outerRadius = (size - margin.top - margin.bottom) >> 1;
  if (outerRadius < 0) {
    throw new Error("margins are too large or the size is too small");
  }

  const innerRadius = outerRadius - thickness;
  if (innerRadius < 0) {
    throw new Error("innerRadius is less than 0, maybe thickness is too large");
  }

  const y = (d: ArchData) => d.value;
  const x = (d: ArchData) => d.name;
  const color = (d: ArchData) => d.color;

  const colorScale = useMemo(
    () =>
      scaleOrdinal({
        domain: data.map(x),
        range: data.map(color)
      }),
    [data]
  );

  const {
    hideTooltip,
    showTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop
  } = useTooltip<ArchData>();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleTooltipShow = useCallback(
    (e: React.MouseEvent<SVGPathElement, MouseEvent>, d: ArchData) => {
      const $ctn = containerRef.current;
      if ($ctn) {
        const bounding = $ctn.getBoundingClientRect();
        showTooltip({
          tooltipData: d,
          tooltipLeft: e.clientX - bounding.x,
          tooltipTop: e.clientY - bounding.y
        });
      }
    },
    [showTooltip]
  );
  const handleTooltipHide = useMemo(() => hideTooltip, [hideTooltip]);

  return {
    size,
    containerRef,
    innerRadius,
    outerRadius,
    x,
    y,
    colorScale,
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop,
    handleTooltipShow,
    handleTooltipHide
  };
}
