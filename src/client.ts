import { ethers } from "ethers";
import { CeloPixelsConfig, UserStats, GRID_SIZE } from "./types";

const ABI = [
  "function placePixel(uint256 x, uint256 y, uint24 color) external",
  "function getPixel(uint256 x, uint256 y) external view returns (uint24)",
  "function getUserPixelCount(address user) external view returns (uint256)",
  "function totalPixels() external view returns (uint256)",
  "function grid(uint256, uint256) external view returns (uint24)",
  "function userPixelCount(address) external view returns (uint256)",
];

export class CeloPixelsClient {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  public contractAddress: string;

  constructor(config: CeloPixelsConfig) {
    const rpcUrl = config.rpcUrl || "https://forno.celo.org";
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.contractAddress = config.contractAddress;
    this.contract = new ethers.Contract(config.contractAddress, ABI, this.provider);
  }

  async getPixel(x: number, y: number): Promise<number> {
    const color = await this.contract.getPixel(x, y);
    return Number(color);
  }

  async getUserStats(address: string): Promise<UserStats> {
    const count = await this.contract.getUserPixelCount(address);
    return { pixelCount: Number(count) };
  }

  async getTotalPixels(): Promise<number> {
    const total = await this.contract.totalPixels();
    return Number(total);
  }

  getGridSize(): number {
    return GRID_SIZE;
  }
}

export { ABI as CELO_PIXELS_ABI };
