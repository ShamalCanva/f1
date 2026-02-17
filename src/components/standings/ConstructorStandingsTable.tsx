"use client";

import { Table, TableHead, TableBody, Th, Tr, Td } from "@/components/ui";
import { Sparkline } from "./Sparkline";
import type { ConstructorStanding } from "@/types";

interface Props {
  standings: ConstructorStanding[];
}

export function ConstructorStandingsTable({ standings }: Props) {
  return (
    <Table>
      <TableHead>
        <tr>
          <Th className="w-12">Pos</Th>
          <Th>Constructor</Th>
          <Th>Drivers</Th>
          <Th align="right">Pts</Th>
          <Th align="right">Wins</Th>
          <Th align="right">Recent Form</Th>
        </tr>
      </TableHead>
      <TableBody>
        {standings.map((s) => (
          <Tr key={s.constructor.name}>
            <Td mono className="text-text-muted">
              {s.position}
            </Td>
            <Td>
              <div className="flex items-center gap-2">
                <div
                  className="h-5 w-1 rounded-full"
                  style={{ backgroundColor: s.constructor.color }}
                />
                <span className="text-sm font-semibold text-text-primary">
                  {s.constructor.name}
                </span>
              </div>
            </Td>
            <Td className="text-text-secondary text-xs">
              {s.drivers.join(", ")}
            </Td>
            <Td align="right" mono>
              <span className="font-semibold text-text-primary">
                {s.points}
              </span>
            </Td>
            <Td align="right" mono>
              {s.wins}
            </Td>
            <Td align="right">
              <div className="flex justify-end">
                <Sparkline
                  data={s.recentResults}
                  color={s.constructor.color}
                />
              </div>
            </Td>
          </Tr>
        ))}
      </TableBody>
    </Table>
  );
}
