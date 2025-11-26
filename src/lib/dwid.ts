//@ts-ignore
import Dwid from 'Dwid';
//@ts-ignore
import type { SDKConfig } from 'Dwid';

export class DwidService {
  private static instance: DwidService;
  private isReady: boolean = false;
  private initPromise: Promise<void> | null = null;
  private dwidInstance: Dwid | null = null;

  private constructor() {}

  public static getInstance(): DwidService {
    if (!DwidService.instance) {
      DwidService.instance = new DwidService();
    }
    return DwidService.instance;
  }

  public async init(config?: SDKConfig): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this.initializeDwid(config);
    return this.initPromise;
  }

  private async initializeDwid(config?: SDKConfig): Promise<void> {
    try {
      // ایجاد instance از Dwid برای اجرای SDK
      this.dwidInstance = new Dwid(config);
      this.isReady = true;
    } catch (error) {
      console.error('Error initializing DWID SDK:', error);
      this.isReady = false;
    }
  }

  public isDwidReady(): boolean {
    return this.isReady;
  }

  public async waitForDwid(): Promise<void> {
    if (this.isReady) {
      return;
    }

    return this.init();
  }
}
