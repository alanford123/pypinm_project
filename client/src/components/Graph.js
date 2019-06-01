import React from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";

const GraphWrapper = styled.div`
  background-color: whitesmoke;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  min-height:200px;
`;

export default function(props) {
  return (
    <GraphWrapper>
      <Line
        data={{
          labels: props.x,
          datasets: [
            {
              label: "# of Votes",
              data: props.y,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
            }
          ]
        }}
        width={100}
        height={50}
        options={{ maintainAspectRatio: false }}
      />
    </GraphWrapper>
  );
}
