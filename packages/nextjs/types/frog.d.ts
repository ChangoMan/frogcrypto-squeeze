export type TTokenInfo = {
  attribute: string;
  name: string;
  symbol: string;
};

export type SqueezeReward = {
  beauty: string;
  intelligence: string;
  jump: string;
  speed: string;
  rarity: string;
};

export type SqueezeRewardKey = keyof SqueezeReward;

export type SqueezeLog = {
  id: string;
  frogId: bigint;
  rarityAmount: bigint;
  jumpAmount: bigint;
  speedAmount: bigint;
  intelligenceAmount: bigint;
  beautyAmount: bigint;
  totalAmount: bigint;
  name: string;
  story: string;
  timestamp: number;
  ownerId: string;
};
