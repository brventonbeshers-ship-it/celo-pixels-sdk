export interface PixelData {
  x: number;
  y: number;
  color: number;
}

export interface UserStats {
  pixelCount: number;
}

export interface CeloPixelsConfig {
  contractAddress: string;
  rpcUrl?: string;
}

export const GRID_SIZE = 50;
