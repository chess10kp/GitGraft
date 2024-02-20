//
//import { useEffect, useRef } from "react";
//
//import { Flex, Stack, Text } from "@chakra-ui/layout";
//import { Box } from "@chakra-ui/react";

import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import {GradientTealBlue} from '@visx/gradient';

import {localPoint} from "@visx/event"
import {useTooltipInPortal, useTooltip, TooltipWithBounds} from '@visx/tooltip';

type Props = {
  transactions: { amount: string, category: string, description: string }[]
}

export default function PieChart(props: Props) {

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen, 
    showTooltip, 
    hideTooltip
  } = useTooltip();

  const {containerRef, TooltipInPortal} = useTooltipInPortal({ 
    detectBounds: true,
    scroll: true
  })

  const handleMouseOver = (e, datum:string) => {
    console.log(datum)
    const coords = localPoint(e.target.ownerSVGElement, e);
    console.log(coords)
    showTooltip({
      tooltipLeft: coords.x, 
      tooltipTop: coords.y, 
      tooltipData: datum 
    })
  }


  const sample = props.transactions.map((transaction: any) => {
    transaction.color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
    return transaction
  })

  const categories = () => {
    const categories : { [key:string] : number } = {} 
    let index = 0;
    sample.forEach(obj => { 
      if(obj.hasOwnProperty('category')) { 
        const category   = obj.category ; 
        if (categories.hasOwnProperty(category)) { 
          categories[category]++ ; 
        }
        else {
          categories[category] = 1;
          categories[index] = category
          index ++ ;
        }
      }
    })
    return categories
  }
  const categoryObj = categories()
  console.log(sample)
  

  const width = 300;
  const height = 300;
  const radius = Math.min(width, height) / 2;

  const colors = [
      '#6050dc',
      '#d52db7',
      '#ff2e7e',
      '#ff6b45',
      '#ffab05',
    ]


  return (  
    <>
  <svg ref={containerRef} width={width} height={height}>
      <GradientTealBlue id="teal" /> 
      <Group top={height / 2} left={width / 2}>
        <Pie 
        data={sample}
        pieValue={(d) => categoryObj[d.category]}
        outerRadius={radius * 0.8}
        innerRadius={radius * 0.5}
        cornerRadius={3}
        padAngle={0.04}
        > 
          {(pie) =>  
            pie.arcs.map((arc, index) => ( 
              <g key={`arc-${index}`}>
              <path d={pie.path(arc) || undefined} 
                    fill={`${colors[index % colors.length]}`}        
                    onMouseOver={(e) => handleMouseOver(e, arc.data.category)} 
                    onMouseOut={hideTooltip} /> 
              </g>
            ))}
        </Pie>
      </Group>

    </svg>
      {tooltipOpen && (
        <TooltipInPortal
          // set this to random so it correctly updates with parent bounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
          <strong>{tooltipData || "hi"}</strong>
        </TooltipInPortal>
      )}
    </>


  )
}
