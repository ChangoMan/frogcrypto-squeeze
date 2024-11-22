"use client";

import { useState } from "react";
import clsx from "clsx";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { JuiceImage } from "~~/components/JuiceImage";
import { Address } from "~~/components/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { SqueezeLog } from "~~/types/frog";

export function SqueezeLogItem(log: SqueezeLog) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const icon = isExpanded ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />;

  return (
    <article className="pt-6 flex max-w-xl flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={new Date(log.timestamp * 1000).toLocaleString()} className="text-gray-500">
          {new Date(log.timestamp * 1000).toLocaleString()}
        </time>
      </div>
      <div className="group relative">
        <div className="flex flex-col flex-wrap justify-between sm:flex-row sm:items-center">
          <h3 className="mt-3 mb-2 text-xl font-lindenHill tracking-wide text-gray-900">{log.name}</h3>
          <Address address={log.ownerId} size="sm" />
        </div>
        <p
          className={clsx("mt-1 mb-0 text-sm/6 text-gray-600", {
            "line-clamp-2": !isExpanded,
          })}
        >
          {log.story}
        </p>
        <button className="mt-2 mb-4 inline-flex items-center gap-1 text-sm text-gray-600" onClick={toggleExpand}>
          {icon} {isExpanded ? "Read Less" : "Read More"}
        </button>
      </div>
      <p className="m-0 text-sm/6">Rewards:</p>
      <div className="mt-1 flex flex-wrap gap-3 text-gray-600 text-sm/6">
        {scaffoldConfig.tokens.map(token => (
          <span key={token.attribute} className="flex items-center gap-1 text-xs">
            <JuiceImage className="w-5 h-5" name={token.name} symbol={token.symbol} />
            {log[`${token.attribute.toLowerCase()}Amount` as keyof SqueezeLog]}
          </span>
        ))}
      </div>
    </article>
  );
}
