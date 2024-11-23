"use client";

import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import type { NextPage } from "next";
import { SqueezeLogItem } from "~~/components/SqueezeLogItem";
import { SqueezeLog } from "~~/types/frog";

type SqueezeLogs = { squeezeLogs: { items: SqueezeLog[] } };

const fetchSqueezeLogs = async () => {
  const SqueezeLogsQuery = gql`
    query SqueezeLogs {
      squeezeLogs(orderBy: "timestamp", orderDirection: "desc") {
        items {
          id
          frogId
          rarityAmount
          jumpAmount
          speedAmount
          intelligenceAmount
          beautyAmount
          totalAmount
          name
          story
          timestamp
          ownerId
        }
      }
    }
  `;
  const data = await request<SqueezeLogs>(
    process.env.NEXT_PUBLIC_PONDER_URL || "http://localhost:42069",
    SqueezeLogsQuery,
  );
  return data;
};

const Newsfeed: NextPage = () => {
  const { data: squeezeLogsData } = useQuery({
    queryKey: ["squeezeLogs"],
    queryFn: fetchSqueezeLogs,
    refetchInterval: 30000,
  });

  return (
    <main className="min-h-screen bg-gray-200">
      <div className="py-10 px-6">
        <h2 className="text-center text-4xl font-lindenHill tracking-wide">Squeezing Rituals</h2>
        {!squeezeLogsData && (
          <div className="flex items-center flex-col flex-grow pt-12">
            <div className="loading loading-dots loading-md"></div>
          </div>
        )}
        {squeezeLogsData && !squeezeLogsData.squeezeLogs.items.length && (
          <div className="flex items-center flex-col flex-grow pt-4">
            <p className="text-center text-xl tracking-wide">No Rituals Found</p>
          </div>
        )}
        {squeezeLogsData && squeezeLogsData.squeezeLogs.items.length && (
          <div className="space-y-6 divide-y divide-gray-300">
            {squeezeLogsData.squeezeLogs.items.map((log: SqueezeLog) => (
              <SqueezeLogItem key={log.id} {...log} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Newsfeed;
