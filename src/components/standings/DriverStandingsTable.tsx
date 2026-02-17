"use client";

import { Table, TableHead, TableBody, Th, Tr, Td } from "@/components/ui";
import { Sparkline } from "./Sparkline";
import type { DriverStanding } from "@/types";

interface Props {
  standings: DriverStanding[];
}

export function DriverStandingsTable({ standings }: Props) {
  return (
    <Table>
      <TableHead>
        <tr>
          <Th className="w-12">Pos</Th>
          <Th>Driver</Th>
          <Th>Team</Th>
          <Th align="right">Pts</Th>
          <Th align="right">Wins</Th>
          <Th align="right">Podiums</Th>
          <Th align="right">Recent Form</Th>
        </tr>
      </TableHead>
      <TableBody>
        {standings.map((s) => (
          <Tr key={s.driver.code}>
            <Td mono className="text-text-muted">
              {s.position}
            </Td>
            <Td>
              <div className="flex items-center gap-2">
                <div
                  className="h-5 w-1 rounded-full"
                  style={{ backgroundColor: s.driver.teamColor }}
                />
                <div>
                  <div className="text-sm font-semibold text-text-primary">
                    {s.driver.firstName}{" "}
                    <span className="uppercase">{s.driver.lastName}</span>
                  </div>
                  <div className="text-[11px] text-text-muted tabular-nums">
                    #{s.driver.number}
                  </div>
                </div>
              </div>
            </Td>
            <Td className="text-text-secondary text-xs">{s.driver.teamName}</Td>
            <Td align="right" mono>
              <span className="font-semibold text-text-primary">
                {s.points}
              </span>
            </Td>
            <Td align="right" mono>
              {s.wins}
            </Td>
            <Td align="right" mono>
              {s.podiums}
            </Td>
            <Td align="right">
              <div className="flex justify-end">
                <Sparkline
                  data={s.recentResults}
                  color={s.driver.teamColor}
                />
              </div>
            </Td>
          </Tr>
        ))}
      </TableBody>
    </Table>
  );
}
